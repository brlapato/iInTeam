package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.Org;
import com.hockey43.iInTeam.dataObjects.Team;
import com.hockey43.iInTeam.persistance.HibernateUtil;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    @Autowired
    private OrgService orgService;

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

    public Team saveTeam(Team team) {
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

        return team;
    }

}
