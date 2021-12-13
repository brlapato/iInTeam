package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.PersonalGoal;
import com.hockey43.iInTeam.dataObjects.TeamEvent;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGame;
import com.hockey43.iInTeam.persistance.HibernateUtil;
import org.hibernate.Session;
import org.springframework.stereotype.Service;

import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Service
public class GoalsService {

    public List<PersonalGoal> getGoalsForPlayer(long playerId, boolean showCompletedOnly) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<PersonalGoal> goals = session.createQuery("SELECT pg from PersonalGoal pg INNER JOIN pg.player p WHERE p.playerId = :pid AND (:showCompleted=true OR pg.isComplete=false)")
                .setParameter("pid", playerId)
                .setParameter("showCompleted", showCompletedOnly)
                .list();

        session.getTransaction().commit();
        session.close();


        return goals;
    }

    public void saveGoal(PersonalGoal goal) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        session.saveOrUpdate(goal);

        session.getTransaction().commit();
        session.close();
    }

    public void deleteGoal(long goalId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        Query query = session.createQuery("delete PersonalGoal WHERE eventId = :id");
        query.setParameter("id", goalId);
        query.executeUpdate();

        session.getTransaction().commit();
        session.close();
    }
}
