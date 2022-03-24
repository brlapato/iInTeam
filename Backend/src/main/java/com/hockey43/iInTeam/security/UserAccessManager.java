package com.hockey43.iInTeam.security;

import org.springframework.stereotype.Service;

@Service("authenticator")
public class UserAccessManager {


    public boolean userCanAccessPlayer(String userId, long playerId) {
        return UserAccessManagerImpl.getInstance().userAccessPlayer(userId, playerId);
    }

    public boolean userCanAccessTeam(String userId, long teamId) {
        return UserAccessManagerImpl.getInstance().userAccessTeam(userId, teamId);
    }

    public boolean userCanAccessTeamEvent(String userId, long teamEventId) {
        return UserAccessManagerImpl.getInstance().userAccessTeamEvent(userId, teamEventId);
    }

    public boolean userCanAccessClinic(String userId, long clinicId) {
        return UserAccessManagerImpl.getInstance().userAccessClinic(userId, clinicId);
    }


}
