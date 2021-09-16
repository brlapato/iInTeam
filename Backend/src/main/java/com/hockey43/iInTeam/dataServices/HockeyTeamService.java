package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.*;
import com.hockey43.iInTeam.dataObjects.Record;
import com.hockey43.iInTeam.dataObjects.hockey.*;
import com.hockey43.iInTeam.persistance.HibernateUtil;
import org.hibernate.Session;
import org.springframework.stereotype.Service;

import javax.persistence.Query;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class HockeyTeamService {

    public List<HockeyTeam> getHockeyTeams(long playerId, boolean activeOnly) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<HockeyTeam> teams = session.createQuery("from HockeyTeam WHERE PlayerId = :pid AND (:activeOnly = false OR isActive = true)")
                .setParameter("pid", playerId)
                .setParameter("activeOnly", activeOnly)
                .list();

        session.getTransaction().commit();
        session.close();

        return teams;
    }

    public List<HockeyTeamSummary> getHockeyTeamSummaries(long playerId, boolean activeOnly)  {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<Long> teams = session.createQuery("SELECT T.teamId FROM Team T WHERE PlayerId = :pid AND (:activeOnly = false OR isActive = true)")
                .setParameter("pid", playerId)
                .setParameter("activeOnly", activeOnly)
                .list();

        session.getTransaction().commit();
        session.close();

        List<HockeyTeamSummary> teamSummaries = new ArrayList<HockeyTeamSummary>();
        teams.forEach( (teamId)-> {
            teamSummaries.add(this.getHockeyTeamSummary(teamId));
        });

        return teamSummaries;
    }

    public HockeyTeam getHockeyTeam(long teamId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<HockeyTeam> teams = session.createQuery("from HockeyTeam ht WHERE ht.teamId = :tid")
                .setParameter("tid", teamId)
                .list();

        session.getTransaction().commit();
        session.close();
        if (teams.size() > 0)
            return teams.get(0);
        else
            return null;
    }

    public HockeyTeamSummary getHockeyTeamSummary(long teamId) {
        HockeyTeam team = this.getHockeyTeam(teamId);

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<HockeyGame> games = session.createQuery("from HockeyGame WHERE TeamId = :tid")
                .setParameter("tid", teamId)
                .list();

        session.getTransaction().commit();
        session.close();

        List<TeamEvent> schedule = new ArrayList<>(games);
        HockeyTeamSummary teamSummary = new HockeyTeamSummary(team);


        int goals = 0; int assists = 0; int shots = 0; int penaltyMin = 0;
        Record teamRecord = new Record();
        HockeyGame nextGame = null;
        LocalDateTime currentDateTime = LocalDateTime.now();

        for (int gameIdx = 0; gameIdx < games.size(); gameIdx++) {
            HockeyGame cGame = games.get(gameIdx);
            goals += cGame.getGoals();
            assists += cGame.getAssists();
            shots += cGame.getShots();
            penaltyMin += cGame.getPenaltyMin();

            updateGameRecord(cGame, teamRecord);

            LocalDateTime startTime = cGame.getStartDateTime();
            if (startTime.isAfter(currentDateTime)) {
                if (nextGame == null || cGame.getStartDateTime().isBefore(nextGame.getStartDateTime())) {
                    nextGame = cGame;
                }
            }
        }

        teamSummary.setGoals(goals);
        teamSummary.setAssists(assists);
        teamSummary.setShots(shots);
        teamSummary.setPoints(goals+assists);
        teamSummary.setPenaltyMin(penaltyMin);
        teamSummary.setRecord(teamRecord);
        if (nextGame != null) {
            teamSummary.setNextGame(new HockeyGameSheet(nextGame));
        }


        return teamSummary;
    }

    public List<RecordEntry> getTeamRecord(long teamId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<HockeyGame> games = session.createQuery("from HockeyGame WHERE TeamId = :tid")
                .setParameter("tid", teamId)
                .list();

        session.getTransaction().commit();
        session.close();

        Map<String, Record> records = new LinkedHashMap<String, Record>();
        Map<String, Record> leagueRecords = new LinkedHashMap<String, Record>();

        Record overallRecord = new Record();
        records.put("Overall", overallRecord);

        for (int gameIdx = 0; gameIdx < games.size(); gameIdx++) {
            HockeyGame cGame = games.get(gameIdx);

            updateGameRecord(cGame, overallRecord);

            String gameType = cGame.getGameType().toString();
            Record subTypeRecord = records.getOrDefault(gameType, null);
            if (subTypeRecord == null) {
                subTypeRecord = new Record();
                records.put(gameType, subTypeRecord);
            }
            updateGameRecord(cGame, subTypeRecord);

            String[] allLeagues = cGame.getSeperateLeages();
            if (allLeagues != null) {
                for (int leagueIndex=0; leagueIndex < allLeagues.length; leagueIndex++) {
                    String league = allLeagues[leagueIndex];
                    Record currentLeagueRecord = leagueRecords.getOrDefault(league, null);
                    if (currentLeagueRecord == null) {
                        currentLeagueRecord = new Record();
                        leagueRecords.put(league, currentLeagueRecord);
                    }
                    updateGameRecord(cGame, currentLeagueRecord);
                }
            }

        }
        List<RecordEntry> results = new ArrayList<RecordEntry>();
        for (Map.Entry<String, Record> entry : records.entrySet()) {
            RecordEntry newEntry = new RecordEntry();
            newEntry.setDescription(entry.getKey());
            newEntry.setWinRecord(entry.getValue());
            results.add(newEntry);
        }
        for (Map.Entry<String, Record> entry : leagueRecords.entrySet()) {
            RecordEntry newEntry = new RecordEntry();
            newEntry.setDescription(entry.getKey());
            newEntry.setWinRecord(entry.getValue());
            results.add(newEntry);
        }

        return results;


    }

    public List<HockeyPlayerStatsEntry> getPlayerStatsForTeam(long teamId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<HockeyGame> games = session.createQuery("from HockeyGame WHERE TeamId = :tid")
                .setParameter("tid", teamId)
                .list();

        session.getTransaction().commit();
        session.close();

        Map<String, HockeyPlayerStats> typeStats = new LinkedHashMap<String, HockeyPlayerStats>();
        Map<String, HockeyPlayerStats> leagueStats = new LinkedHashMap<String, HockeyPlayerStats>();

        HockeyPlayerStats overallStats = new HockeyPlayerStats();
        typeStats.put("Overall", overallStats);

        for (int gameIdx = 0; gameIdx < games.size(); gameIdx++) {
            HockeyGame cGame = games.get(gameIdx);

            updatePlayerStats(cGame, overallStats);

            String gameType = cGame.getGameType().toString();
            HockeyPlayerStats subTypeStats = typeStats.getOrDefault(gameType, null);
            if (subTypeStats == null) {
                subTypeStats = new HockeyPlayerStats();
                typeStats.put(gameType, subTypeStats);
            }
            updatePlayerStats(cGame, subTypeStats);

            String[] allLeagues = cGame.getSeperateLeages();
            if (allLeagues != null) {
                for (int leagueIndex=0; leagueIndex < allLeagues.length; leagueIndex++) {
                    String league = allLeagues[leagueIndex];
                    HockeyPlayerStats currentLeagueStats = leagueStats.getOrDefault(league, null);
                    if (currentLeagueStats == null) {
                        currentLeagueStats = new HockeyPlayerStats();
                        leagueStats.put(league, currentLeagueStats);
                    }
                    updatePlayerStats(cGame, currentLeagueStats);
                }
            }

        }
        List<HockeyPlayerStatsEntry> results = new ArrayList<HockeyPlayerStatsEntry>();
        for (Map.Entry<String, HockeyPlayerStats> entry : typeStats.entrySet()) {
            HockeyPlayerStatsEntry newEntry = new HockeyPlayerStatsEntry();
            newEntry.setDescription(entry.getKey());
            newEntry.setHockeyPlayerStats(entry.getValue());
            results.add(newEntry);
        }
        for (Map.Entry<String, HockeyPlayerStats> entry : leagueStats.entrySet()) {
            HockeyPlayerStatsEntry newEntry = new HockeyPlayerStatsEntry();
            newEntry.setDescription(entry.getKey());
            newEntry.setHockeyPlayerStats(entry.getValue());
            results.add(newEntry);
        }

        return results;
    }

    public List<HockeyGame> getGames(long teamId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<HockeyGame> games = session.createQuery("from HockeyGame WHERE TeamId = :tid ORDER BY startDateTime ASC")
                .setParameter("tid", teamId)
                .list();

        session.getTransaction().commit();
        session.close();


        return games;
    }

    public HockeyGame getHockeyGame(long teamId, long gameId) {
        List<HockeyGame> games = this.getGames(teamId);

        return games.stream()
                .filter(game -> game.getEventId() == gameId)
                .findFirst()
                .orElse(null);
    }

    public HockeyGame getNewGame(long teamId) {
        HockeyTeam targetTeam = this.getHockeyTeam(teamId);

        HockeyGame newGame = new HockeyGame();
        newGame.setOwnerTeam(targetTeam);


        return newGame;
    }

    public void saveHockeyGame(HockeyGame game) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        session.saveOrUpdate(game);

        session.getTransaction().commit();
        session.close();
    }

    public void deleteHockeyGameById(long gameId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        Query query = session.createQuery("delete HockeyGame WHERE eventId = :id");
        query.setParameter("id", gameId);
        query.executeUpdate();


        session.getTransaction().commit();
        session.close();
    }

    private void updatePlayerStats(HockeyGame game, HockeyPlayerStats stats) {
        stats.setGoals(stats.getGoals() + game.getGoals());
        stats.setAssists(stats.getAssists() + game.getAssists());
        stats.setPoints(stats.getPoints() + game.getAssists() + game.getGoals());
        stats.setShots(stats.getShots() + game.getShots());
        stats.setPenaltyMin(stats.getPenaltyMin() + game.getPenaltyMin());

    }

    private void updateGameRecord(HockeyGame cGame, Record record) {
        if (cGame.getResult() != null) {
            switch (cGame.getResult()) {
                case Win:
                    record.setWins(record.getWins() + 1);
                    break;
                case Loss:
                    record.setLosses(record.getLosses() + 1);
                    break;
                case Tie:
                    record.setTies(record.getTies() + 1);
                    break;
                case OvertimeLoss:
                    record.setOverTimeLosses(record.getOverTimeLosses() + 1);
                    break;
            }
        }
    }
}
