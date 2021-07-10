package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.*;
import com.hockey43.iInTeam.dataObjects.Record;
import com.hockey43.iInTeam.exceptions.GameNotFoundException;
import com.hockey43.iInTeam.persistance.HibernateUtil;
import org.hibernate.Session;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

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

    public HockeyTeam getHockeyTeam(long teamId) throws GameNotFoundException {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<HockeyTeam> teams = session.createQuery("from HockeyTeam WHERE TeamId = :tid")
                .setParameter("tid", teamId)
                .list();

        session.getTransaction().commit();
        session.close();
        if (teams.size() > 0)
            return teams.get(0);
        else
            throw new GameNotFoundException();
    }

    public HockeyTeamSummary getHockeyTeamSummary(long teamId) throws GameNotFoundException {
        HockeyTeam team = this.getHockeyTeam(teamId);

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<HockeyGame> games = session.createQuery("from HockeyGame WHERE TeamId = :tid")
                .setParameter("tid", teamId)
                .list();

        session.getTransaction().commit();
        session.close();

        List<TeamEvent> schedule = new ArrayList<>(games);
        HockeyTeamSummary teamSummary = new HockeyTeamSummary();
        teamSummary.setHockeyTeam(team);
        teamSummary.setSchedule(schedule);

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

            if (cGame.getResult() != null) {
                switch (cGame.getResult()) {
                    case Win:
                        teamRecord.setWins(teamRecord.getWins() + 1);
                        break;
                    case Loss:
                        teamRecord.setLosses(teamRecord.getLosses() + 1);
                        break;
                    case Tie:
                        teamRecord.setTies(teamRecord.getTies() + 1);
                        break;
                    case OvertimeLoss:
                        teamRecord.setOverTimeLosses(teamRecord.getOverTimeLosses() + 1);
                        break;
                }
            }

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
        teamSummary.setNextGame(nextGame);


        return teamSummary;
    }
}
