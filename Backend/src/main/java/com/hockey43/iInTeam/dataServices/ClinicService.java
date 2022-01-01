package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.Clinic;
import com.hockey43.iInTeam.dataObjects.ClinicSummary;
import com.hockey43.iInTeam.dataObjects.Org;
import com.hockey43.iInTeam.dataObjects.Team;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGame;
import com.hockey43.iInTeam.persistance.HibernateUtil;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClinicService {

    @Autowired
    private OrgService orgService;

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

    public Clinic getClinicById(long clinicId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<Clinic> clinics = session.createQuery("SELECT c from Clinic c WHERE c.clinicId = :clinicId")
                .setParameter("clinicId", clinicId)
                .list();

        session.getTransaction().commit();
        session.close();

        if (clinics.size() > 0)
            return clinics.get(0);
        else
            return null;
    }

    public Clinic saveClinic(Clinic clinic) {
        Org clinicOrg = orgService.getOrgByName(clinic.getOrg().getCity(), clinic.getOrg().getName());
        if (clinicOrg == null) {
            clinicOrg = new Org();
            clinicOrg.setCity(clinic.getOrg().getCity());
            clinicOrg.setName(clinic.getOrg().getName());
        }

        clinic.setOrg(clinicOrg);

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        //Look up org info; create a new one if there is no matching one
        session.saveOrUpdate(clinicOrg);
        session.saveOrUpdate(clinic);

        session.getTransaction().commit();
        session.close();

        return clinic;
    }
}
