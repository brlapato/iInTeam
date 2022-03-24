package com.hockey43.iInTeam.security;

import java.util.HashMap;

public class UserEntities {
    private HashMap<Long, Boolean> teamMap = new HashMap<>();
    private HashMap<Long, Boolean> teamEventMap = new HashMap<>();
    private HashMap<Long, Boolean> clinicMap = new HashMap<>();
    private HashMap<Long, Boolean> playerMap = new HashMap<>();

    public HashMap<Long, Boolean> getPlayerMap() {
        return this.playerMap;
    }

    public HashMap<Long, Boolean> getTeamMap() {
        return this.teamMap;
    }

    public HashMap<Long, Boolean> getTeamEventMap() {
        return this.teamMap;
    }

    public HashMap<Long, Boolean> getClinicMap() {
        return this.clinicMap;
    }

}
