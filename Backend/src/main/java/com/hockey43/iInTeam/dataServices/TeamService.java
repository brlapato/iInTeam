package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.Team;
import com.hockey43.iInTeam.persistance.HibernateUtil;
import org.hibernate.Session;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {
    public List<Team> getTeamForPlayer(long playerId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<Team> teams = session.createQuery("from Team WHERE PlayerId = :pid")
                .setParameter("pid", playerId)
                .list();

        session.getTransaction().commit();
        session.close();

        return teams;
    }
}
