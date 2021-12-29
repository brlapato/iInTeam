package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.Clinic;
import com.hockey43.iInTeam.dataObjects.ClinicSummary;
import com.hockey43.iInTeam.dataObjects.Team;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGame;
import com.hockey43.iInTeam.persistance.HibernateUtil;
import org.hibernate.Session;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClinicService {

    public List<Clinic> getClinicsForPlayer(long playerId, boolean includeCompleted) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<Clinic> clinics = session.createQuery("SELECT c from Clinic c INNER JOIN c.playerOwner p WHERE p.playerId = :pid AND (:includeCompleted=true OR c.endDateTime < current_date)")
                .setParameter("pid", playerId)
                .setParameter("includeCompleted", includeCompleted)
                .list();

        session.getTransaction().commit();
        session.close();

        return clinics;
    }
}
