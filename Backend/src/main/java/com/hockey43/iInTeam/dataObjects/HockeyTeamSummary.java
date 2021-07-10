package com.hockey43.iInTeam.dataObjects;

import java.util.List;

public class HockeyTeamSummary {

    private HockeyTeam hockeyTeam;

    private Record record;

    private int goals;

    private int assists;

    private int points;

    private int shots;

    private int penaltyMin;

    private List<TeamEvent> schedule;

    private HockeyGame nextGame;

    public HockeyTeam getHockeyTeam() {
        return hockeyTeam;
    }

    public void setHockeyTeam(HockeyTeam hockeyTeam) {
        this.hockeyTeam = hockeyTeam;
    }

    public Record getRecord() {
        return record;
    }

    public void setRecord(Record record) {
        this.record = record;
    }

    public int getGoals() {
        return goals;
    }

    public void setGoals(int goals) {
        this.goals = goals;
    }

    public int getAssists() {
        return assists;
    }

    public void setAssists(int assists) {
        this.assists = assists;
    }

    public int getShots() {
        return shots;
    }

    public void setShots(int shots) {
        this.shots = shots;
    }

    public int getPenaltyMin() {
        return penaltyMin;
    }

    public void setPenaltyMin(int penaltyMin) {
        this.penaltyMin = penaltyMin;
    }

    public List<TeamEvent> getSchedule() {
        return schedule;
    }

    public void setSchedule(List<TeamEvent> schedule) {
        this.schedule = schedule;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public HockeyGame getNextGame() {
        return nextGame;
    }

    public void setNextGame(HockeyGame nextGame) {
        this.nextGame = nextGame;
    }
}
