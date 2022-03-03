package com.hockey43.iInTeam.dataObjects;

import com.hockey43.iInTeam.dataObjects.hockey.HockeyTeam;
import com.hockey43.iInTeam.dataObjects.swim.SwimTeam;

public final class TeamFactory {
    private static TeamFactory instance = new TeamFactory();
    public static TeamFactory getInstance() {
        return TeamFactory.instance;
    }

    public Team build(TeamSummary teamSummary, Player player) {
        Team team = null;
        switch (teamSummary.getSport()) {
            case Hockey:
                team = new HockeyTeam();
                break;
            case Swim:
                team = new SwimTeam();
                break;
        }

        team.setOrg(teamSummary.getOrg());
        team.setName(teamSummary.getName());
        team.setSeason(teamSummary.getSeason());
        team.setStartDate(teamSummary.getStartDate());
        team.setPlayerOwner(player);
        team.setActive(teamSummary.getActive());

        return team;
    }
}
