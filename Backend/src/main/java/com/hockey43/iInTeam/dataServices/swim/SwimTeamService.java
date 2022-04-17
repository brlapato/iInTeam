package com.hockey43.iInTeam.dataServices.swim;

import com.hockey43.iInTeam.dataObjects.Org;
import com.hockey43.iInTeam.dataObjects.TeamEvent;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGame;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyTeam;
import com.hockey43.iInTeam.dataObjects.swim.SwimEvent;
import com.hockey43.iInTeam.dataObjects.swim.SwimMeet;
import com.hockey43.iInTeam.dataObjects.swim.SwimTeam;
import com.hockey43.iInTeam.dataServices.OrgService;
import com.hockey43.iInTeam.persistance.HibernateUtil;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Service
public class SwimTeamService {

    @Autowired
    private OrgService orgService;

    public SwimTeam getSwimteam(long teamId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<SwimTeam> teams = session.createQuery("from SwimTeam t WHERE t.teamId = :tid")
                .setParameter("tid", teamId)
                .list();

        session.getTransaction().commit();
        session.close();
        if (teams.size() > 0)
            return teams.get(0);
        else
            return null;
    }

    public void saveSwimTeam(SwimTeam team) {

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

    public SwimMeet getNewMeet(long teamId) {
        SwimTeam targetTeam = this.getSwimteam(teamId);

        SwimMeet newMeet = new SwimMeet();
        newMeet.setOwnerTeam(targetTeam);


        return newMeet;
    }

    public SwimMeet getSwimMeet(long meetId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<SwimMeet> meets = session.createQuery("from SwimMeet m WHERE m.eventId = :mid")
                .setParameter("mid", meetId)
                .list();

        session.getTransaction().commit();
        session.close();
        if (meets.size() > 0)
            return meets.get(0);
        else
            return null;
    }

    public void saveSwimMeet(SwimMeet meet) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        session.saveOrUpdate(meet);

        session.getTransaction().commit();
        session.close();
    }

    public List<SwimMeet> getSwimMeets(long teamId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<SwimMeet> meets = session.createQuery("SELECT sm from SwimMeet sm INNER JOIN sm.ownerTeam t WHERE t.teamId = :tid ORDER BY startDateTime ASC")
                .setParameter("tid", teamId)
                .list();

        session.getTransaction().commit();
        session.close();

        return meets;
    }

    public void deleteSwimMeet(long meetId) {

        List<SwimEvent> events = this.getSwimEventsForMeet(meetId);

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        events.forEach((e)->this.deleteSwimEvent(e.getSwimEventId(), session));

        Query query = session.createQuery("delete SwimMeet WHERE eventId = :id");
        query.setParameter("id", meetId);
        query.executeUpdate();

        session.getTransaction().commit();
        session.close();
    }

    public List<SwimEvent> getSwimEventsForMeet(long meetId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<SwimEvent> swimEvents = session.createQuery("SELECT se from SwimEvent se " +
                "INNER JOIN FETCH se.swimMeet sm " +
                "WHERE sm.eventId = :mid " +
                "ORDER BY lpad(EventNumber, 5, '0') ASC, totalDistance ASC")
                .setParameter("mid", meetId)
                .list();

        session.getTransaction().commit();
        session.close();

        return swimEvents;
    }

    public List<SwimEvent> getSwimEventsForSwimTeam(long teamId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<SwimEvent> swimEvents = session.createQuery("" +
                "SELECT se from SwimEvent se " +
                "INNER JOIN se.swimMeet sm " +
                "INNER JOIN sm.ownerTeam t " +
                "WHERE t.teamId = :tid " +
                "ORDER BY lpad(EventNumber, 5, '0') ASC, totalDistance ASC")
                .setParameter("tid", teamId)
                .list();

        session.getTransaction().commit();
        session.close();

        return swimEvents;
    }

    public void saveSwimEvent(SwimEvent swimEvent) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        session.saveOrUpdate(swimEvent);

        session.getTransaction().commit();
        session.close();
    }

    public void deleteSwimEvent(long swimEventId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        this.deleteSwimEvent(swimEventId, session);

        session.getTransaction().commit();
        session.close();
    }

    private void deleteSwimEvent(long swimEventId, Session session) {
        Query query = session.createQuery("delete SwimEvent WHERE swimEventId = :id");
        query.setParameter("id", swimEventId);
        query.executeUpdate();
    }

    public SwimEvent getSwimEvent(long swimEventId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<SwimEvent> swimEvents = session.createQuery("" +
                "SELECT se from SwimEvent se " +
                "WHERE se.swimEventId = :sid ")
                .setParameter("sid", swimEventId)
                .list();

        session.getTransaction().commit();
        session.close();

        if (swimEvents.size() > 0) {
            return swimEvents.get(0);
        } else {
            return null;
        }
    }

    public SwimEvent getNewSwimEvent(long meetId) {
        SwimMeet targetMeet = this.getSwimMeet(meetId);
        SwimEvent newEvent = new SwimEvent();
        newEvent.setSwimMeet(targetMeet);
        return newEvent;
    }
}
