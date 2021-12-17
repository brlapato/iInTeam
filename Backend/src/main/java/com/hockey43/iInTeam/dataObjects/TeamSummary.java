package com.hockey43.iInTeam.dataObjects;

import javax.persistence.*;
import java.time.LocalDateTime;

public class TeamSummary {

    public TeamSummary() { }

    public TeamSummary(Team team) {
        this();

        this.teamId = team.getTeamId();
        this.org = team.getOrg();
        this.isActive = team.getActive();
        this.startDate = team.getStartDate();
        this.name = team.getName();
        this.sport = team.getSport();
        this.season = team.getSeason();
    }


    private long teamId;
    private Org org;
    private String name;
    private Boolean isActive;
    private LocalDateTime startDate;
    private Sport sport;
    private String season;

    public Sport getSport() {
        return sport;
    }

    public void setSport(Sport sport) {
        this.sport = sport;
    }

    public long getTeamId() {
        return teamId;
    }

    public void setTeamId(long teamId) {
        this.teamId = teamId;
    }

    public Org getOrg() {
        return org;
    }

    public void setOrg(Org org) {
        this.org = org;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }
}
