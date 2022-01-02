package com.hockey43.iInTeam.dataServices.hockey;

import com.hockey43.iInTeam.dataObjects.CalendarEvent;
import com.hockey43.iInTeam.dataObjects.TeamEvent;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGame;
import com.hockey43.iInTeam.dataServices.GameService;
import com.hockey43.iInTeam.dataServices.ICalendarEventProvider;
import com.hockey43.iInTeam.persistance.HibernateUtil;
import org.hibernate.Session;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class HockeyGameService extends GameService implements ICalendarEventProvider {

    @Override
    @Cacheable(value = "hockeyGamesForPlayer", key = "{#playerId, #activeTeams}")
    public List<TeamEvent> getGamesForPlayer(long playerId, boolean activeTeams) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<HockeyGame> games = session.createQuery("SELECT hg from HockeyGame hg INNER JOIN hg.ownerTeam t INNER JOIN t.playerOwner p WHERE p.playerId = :pid AND (:isActive=false OR t.isActive=true)")
                .setParameter("pid", playerId)
                .setParameter("isActive", activeTeams)
                .list();

        session.getTransaction().commit();
        session.close();

        List<TeamEvent> events = new ArrayList<TeamEvent>(games);
        return events;
    }

    @Override
    @Cacheable(value = "hockeyGamesForTeam", key = "#teamId")
    public List<TeamEvent> getGamesForTeam(long teamId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<HockeyGame> games = session.createQuery("SELECT hg from HockeyGame hg INNER JOIN hg.ownerTeam t WHERE t.teamId = :tid")
                .setParameter("tid", teamId)
                .list();

        session.getTransaction().commit();
        session.close();

        List<TeamEvent> events = new ArrayList<TeamEvent>(games);
        return events;
    }

    @Override
    @Cacheable(value = "upcomingHockeyGames")
    public List<TeamEvent> getUpcomingGames(long playerId, int gameCount) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<HockeyGame> games = session.createQuery("SELECT hg from HockeyGame hg INNER JOIN hg.ownerTeam t INNER JOIN t.playerOwner p WHERE p.playerId = :pid AND t.isActive=true AND CURRENT_TIMESTAMP <= hg.startDateTime ORDER BY hg.startDateTime ASC")
                .setParameter("pid", playerId)
                .setMaxResults(gameCount)
                .list();

        session.getTransaction().commit();
        session.close();

        List<TeamEvent> events = new ArrayList<TeamEvent>(games);
        return events;
    }

    @Override
    @Cacheable(value = "recentHockeyGames")
    public List<TeamEvent> getRecentGames(long playerId, int gameCount) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<HockeyGame> games = session.createQuery("SELECT hg from HockeyGame hg INNER JOIN hg.ownerTeam t INNER JOIN t.playerOwner p WHERE p.playerId = :pid AND t.isActive=true AND hg.startDateTime <= CURRENT_TIMESTAMP ORDER BY hg.startDateTime DESC")
                .setParameter("pid", playerId)
                .setMaxResults(gameCount)
                .list();

        session.getTransaction().commit();
        session.close();

        List<TeamEvent> events = new ArrayList<TeamEvent>(games);
        return events;
    }

    @Override
    public List<CalendarEvent> getEventsOverDateRange(long playerId, LocalDateTime start, LocalDateTime end) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<HockeyGame> games = session.createQuery("SELECT hg from HockeyGame hg INNER JOIN hg.ownerTeam t INNER JOIN t.playerOwner p WHERE p.playerId = :pid AND :start <= startDateTime AND startDateTime <= :end ")
                .setParameter("pid", playerId)
                .setParameter("start", start)
                .setParameter("end", end)
                .list();

        session.getTransaction().commit();
        session.close();

        List<CalendarEvent> events = new ArrayList<CalendarEvent>();
        games.forEach(g->events.add(g.getCalendarEvent()));
        return events;
    }
}
