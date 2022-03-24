package com.hockey43.iInTeam.security;

import com.hockey43.iInTeam.dataObjects.Clinic;
import com.hockey43.iInTeam.dataObjects.Team;
import com.hockey43.iInTeam.dataObjects.TeamEvent;
import com.hockey43.iInTeam.dataObjects.TeamSummary;
import com.hockey43.iInTeam.dataServices.ClinicService;
import com.hockey43.iInTeam.dataServices.PlayerService;
import com.hockey43.iInTeam.dataServices.TeamService;
import com.hockey43.iInTeam.persistance.HibernateUtil;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;

import javax.persistence.Query;
import java.util.HashMap;

public class UserAccessManagerImpl {

    @Autowired
    private TeamService teamService = new TeamService();

    @Autowired
    private PlayerService playerService = new PlayerService();

    @Autowired
    private ClinicService clinicService = new ClinicService();

    private UserAccessManagerImpl() {

    }
    public static UserAccessManagerImpl getInstance() {
        return new UserAccessManagerImpl();
    }

    private HashMap<String, UserEntities> userMap = new HashMap<String, UserEntities>();


    public boolean userAccessPlayer(String userId, long playerId) {
        this.initUserMap(userId);

        if (this.userMap.get(userId).getPlayerMap().containsKey(playerId)) {
            return this.userMap.get(userId).getPlayerMap().get(playerId);
        } else {
            boolean result = this.playerService.getPlayer(playerId).getUserId().equals(userId);
            this.userMap.get(userId).getPlayerMap().put(playerId, result);
            return result;
        }

    }

    public boolean userAccessTeam(String userId, long teamId) {
        this.initUserMap(userId);

        if (this.userMap.get(userId).getTeamMap().containsKey(teamId)) {
            return this.userMap.get(userId).getTeamMap().get(teamId);
        } else {
            Team team = this.teamService.getTeamById(teamId);
            Boolean result = team.getPlayerOwner().getUserId().equals(userId);;
            this.userMap.get(userId).getTeamMap().put(teamId, result);
            return result;
        }
    }

    public boolean userAccessTeamEvent(String userId, long teamEventId) {
        this.initUserMap(userId);

        if (this.userMap.get(userId).getTeamEventMap().containsKey(teamEventId)) {
            return this.userMap.get(userId).getTeamEventMap().get(teamEventId);
        } else {
            TeamEvent teamEvent = this.teamService.getTeamEventById(teamEventId);
            boolean result = this.userAccessTeam(userId, teamEvent.getOwnerTeam().getTeamId());
            this.userMap.get(userId).getTeamEventMap().put(teamEventId, result);
            return result;
        }
    }

    public boolean userAccessClinic(String userId, long clinicId) {
        this.initUserMap(userId);

        if (this.userMap.get(userId).getClinicMap().containsKey(clinicId)) {
            return this.userMap.get(userId).getClinicMap().get(clinicId);
        } else {
            Clinic clinic = this.clinicService.getClinicById(clinicId);
            Boolean result = clinic.getPlayerOwner().getUserId().equals(userId);;
            this.userMap.get(userId).getClinicMap().put(clinicId, result);
            return result;
        }
    }

    private void initUserMap(String userId) {
        if (!this.userMap.containsKey(userId)) {
            this.userMap.put(userId, new UserEntities());
        }
    }
}
