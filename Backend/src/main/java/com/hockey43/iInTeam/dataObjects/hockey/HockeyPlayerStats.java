package com.hockey43.iInTeam.dataObjects.hockey;

import com.hockey43.iInTeam.dataObjects.Stats;

public class HockeyPlayerStats extends Stats {
    private int goals;
    private int assists;
    private int points;
    private int shots;
    private int penaltyMin;

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

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }
}
