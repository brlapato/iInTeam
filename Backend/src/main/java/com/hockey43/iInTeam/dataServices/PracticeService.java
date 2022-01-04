package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.CalendarEvent;
import com.hockey43.iInTeam.dataObjects.Practice;
import com.hockey43.iInTeam.dataObjects.Team;
import com.hockey43.iInTeam.dataObjects.TeamEvent;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGame;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyTeam;
import com.hockey43.iInTeam.persistance.HibernateUtil;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Query;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PracticeService implements ICalendarEventProvider {

    @Autowired
    private TeamService teamService;

    public PracticeService() {}

    public PracticeService(TeamService ts) {
        this.teamService = ts;
    }

    public List<Practice> getPracticesForTeam(Team team) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<Practice> practices = session.createQuery("SELECT p from Practice p INNER JOIN p.ownerTeam t WHERE t.teamId = :tid ORDER BY p.startDateTime ASC")
                .setParameter("tid", team.getTeamId())
                .list();

        session.getTransaction().commit();
        session.close();

        return practices;
    }

    public Practice getPracticeById(long practiceId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<Practice> practices = session.createQuery("SELECT p from Practice p WHERE p.eventId = :practiceId")
                .setParameter("practiceId", practiceId)
                .list();

        session.getTransaction().commit();
        session.close();

        if(practices.size() > 0)
            return practices.get(0);
        else
            return null;

    }

    public Practice getNewPractice(long teamId) {

        Team targetTeam = this.teamService.getTeamById(teamId);

        Practice newPractice = new Practice();
        newPractice.setOwnerTeam(targetTeam);

        return newPractice;
    }

    public void savePractice(Practice practice) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        session.saveOrUpdate(practice);

        session.getTransaction().commit();
        session.close();

    }

    public void deletePracticeById(long practiceId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        Query query = session.createQuery("delete Practice WHERE eventId = :id");
        query.setParameter("id", practiceId);
        query.executeUpdate();


        session.getTransaction().commit();
        session.close();
    }

    @Override
    public List<CalendarEvent> getEventsOverDateRange(long playerId, LocalDateTime start, LocalDateTime end) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<Practice> games = session.createQuery("SELECT pr from Practice pr INNER JOIN pr.ownerTeam t INNER JOIN t.playerOwner p WHERE p.playerId = :pid AND :start <= startDateTime AND startDateTime <= :end ")
                .setParameter("pid", playerId)
                .setParameter("start", start)
                .setParameter("end", end)
                .list();

        session.getTransaction().commit();
        session.close();

        List<CalendarEvent> events = new ArrayList<CalendarEvent>();
        games.forEach(p->events.add(p.getCalendarEvent()));
        return events;
    }
}
