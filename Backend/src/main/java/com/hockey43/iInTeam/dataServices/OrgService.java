package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.Org;
import com.hockey43.iInTeam.dataObjects.PersonalGoal;
import com.hockey43.iInTeam.persistance.HibernateUtil;
import org.hibernate.Session;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrgService {


    public Org getOrgByName(String city, String name) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<Org> orgs = session.createQuery("FROM Org WHERE city = :city AND name = :name")
                .setParameter("city", city)
                .setParameter("name", name)
                .list();

        session.getTransaction().commit();
        session.close();

        if(orgs.size() > 0) {
            return orgs.get(0);
        } else {
            return null;
        }
    }
}
