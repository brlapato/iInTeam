package com.hockey43.iInTeam.dataServices.hockey;

import com.hockey43.iInTeam.dataObjects.*;
import com.hockey43.iInTeam.dataObjects.Record;
import com.hockey43.iInTeam.dataObjects.hockey.*;
import com.hockey43.iInTeam.dataServices.IPlayerService;
import com.hockey43.iInTeam.dataServices.OrgService;
import com.hockey43.iInTeam.dataServices.TeamService;
import com.hockey43.iInTeam.persistance.HibernateUtil;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import javax.persistence.Query;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class HockeyTeamService {

    @Autowired
    private HockeyGameService hockeyGameService;

    @Autowired
    private OrgService orgService;

    @Autowired
    private HockeyStatsService hockeyStatsService;

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

        List<TeamEvent> games = this.hockeyGameService.getGamesForTeam(teamId);

        HockeyTeamSummary teamSummary = new HockeyTeamSummary(team);

        HockeyGame nextGame = null;
        LocalDateTime currentDateTime = LocalDateTime.now();

        for (int gameIdx = 0; gameIdx < games.size(); gameIdx++) {
            if (games.get(gameIdx) instanceof HockeyGame) {
                HockeyGame cGame = (HockeyGame) games.get(gameIdx);

                LocalDateTime startTime = cGame.getStartDateTime();
                if (startTime.isAfter(currentDateTime)) {
                    if (nextGame == null || cGame.getStartDateTime().isBefore(nextGame.getStartDateTime())) {
                        nextGame = cGame;
                    }
                }
            }
        }

        if (nextGame != null) {
            teamSummary.setNextGame(new HockeyGameSheet(nextGame));
        }

        List<HockeyPlayerStatsEntry> statsEntries = this.hockeyStatsService.aggregateStatsFromEvents(games, "Overall");
        if (statsEntries.size() > 0) {
            HockeyPlayerStats stats = statsEntries.get(0).getHockeyPlayerStats();
            teamSummary.setGoals(stats.getGoals());
            teamSummary.setAssists(stats.getAssists());
            teamSummary.setShots(stats.getShots());
            teamSummary.setPoints(stats.getPoints());
            teamSummary.setPenaltyMin(stats.getPenaltyMin());
        }

        List<RecordEntry> records = this.hockeyStatsService.aggregateRecordFromEvents(games, "Overall");
        if (records.size() > 0) {
            teamSummary.setRecord(records.get(0).getWinRecord());
        }

        return teamSummary;
    }

    @CacheEvict(value = {"getHockeyTeamSummary", "getHockeyTeam"}, allEntries = true)
    public void saveHockeyTeam(HockeyTeam team) {

        Org teamOrg = orgService.getOrgByName(team.getOrg().getCity(), team.getOrg().getName());
        if (teamOrg == null) {
            teamOrg = new Org();
            teamOrg.setCity(team.getOrg().getCity());
            teamOrg.setName(team.getOrg().getName());
        }

        team.setOrg(teamOrg);

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        //Look up org info; create a new one if there is no matching one
        session.saveOrUpdate(teamOrg);
        session.saveOrUpdate(team);

        session.getTransaction().commit();
        session.close();
    }

    public List<RecordEntry> getTeamRecord(long teamId) {

        List<TeamEvent> games = this.hockeyGameService.getGamesForTeam(teamId);


        List<RecordEntry> winRecord = this.hockeyStatsService.aggregateRecordFromEvents(games, "Overall");
        winRecord.addAll(this.hockeyStatsService.aggregateRecordFromEvents(games, "ByGameType"));
        winRecord.addAll(this.hockeyStatsService.aggregateRecordFromEvents(games, "ByLeagueDetail"));

        return winRecord;
    }

    public List<HockeyPlayerStatsEntry> getPlayerStatsForTeam(long teamId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<HockeyGame> games = session.createQuery("from HockeyGame WHERE TeamId = :tid")
                .setParameter("tid", teamId)
                .list();

        session.getTransaction().commit();
        session.close();

        List<HockeyPlayerStatsEntry> stats = this.hockeyStatsService.aggregateStats(games, "Overall");
        stats.addAll(this.hockeyStatsService.aggregateStats(games, "ByGameType"));
        stats.addAll(this.hockeyStatsService.aggregateStats(games, "ByLeagueDetail"));

        return stats;
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

    @CacheEvict(value = {"hockeyGamesForPlayer", "hockeyGamesForTeam", "upcomingHockeyGames", "recentHockeyGames"}, allEntries = true)
    public void saveHockeyGame(HockeyGame game) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        //Look up org info; create a new one if there is no matching one

        session.saveOrUpdate(game);

        session.getTransaction().commit();
        session.close();
    }

    @CacheEvict(value = {"hockeyGamesForPlayer", "hockeyGamesForTeam", "upcomingHockeyGames", "recentHockeyGames"}, allEntries = true)
    public void deleteHockeyGameById(long gameId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        Query query = session.createQuery("delete HockeyGame WHERE eventId = :id");
        query.setParameter("id", gameId);
        query.executeUpdate();


        session.getTransaction().commit();
        session.close();
    }


}
