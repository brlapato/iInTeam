package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.*;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGame;
import com.hockey43.iInTeam.persistance.HibernateUtil;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Query;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ClinicService implements ICalendarEventProvider {

    @Autowired
    private OrgService orgService;

    public List<Clinic> getClinicsForPlayer(long playerId, boolean includeCompleted) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<Clinic> clinics = session.createQuery("SELECT c from Clinic c INNER JOIN c.playerOwner p WHERE p.playerId = :pid AND (:includeCompleted=true OR c.endDateTime < current_date)  ORDER BY c.startDateTime ASC")
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

    public void deleteClinicById(long clinicId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        Query query = session.createQuery("delete Clinic WHERE clinicId = :id");
        query.setParameter("id", clinicId);
        query.executeUpdate();


        session.getTransaction().commit();
        session.close();
    }

    @Override
    public List<CalendarEvent> getEventsOverDateRange(long playerId, LocalDateTime start, LocalDateTime end) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<Clinic> clinics = session.createQuery("SELECT c from Clinic c INNER JOIN c.playerOwner p WHERE p.playerId = :pid AND :start < c.startDateTime and c.startDateTime < :end")
                .setParameter("pid", playerId)
                .setParameter("start", start)
                .setParameter("end", end)
                .list();

        session.getTransaction().commit();
        session.close();

        List<CalendarEvent> events = new ArrayList<CalendarEvent>();
        clinics.forEach(c->events.add(c.getCalendarEvent()));
        return events;
    }
}
