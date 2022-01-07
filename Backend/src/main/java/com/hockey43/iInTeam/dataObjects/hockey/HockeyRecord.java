package com.hockey43.iInTeam.dataObjects.hockey;

import com.hockey43.iInTeam.dataObjects.Record;

public class HockeyRecord extends Record {

    private int goalsFor;
    private int goalsAgainst;
    private int goalDifferential;

    public int getGoalsFor() {
        return goalsFor;
    }

    public void setGoalsFor(int goalsFor) {
        this.goalsFor = goalsFor;
    }

    public int getGoalsAgainst() {
        return goalsAgainst;
    }

    public void setGoalsAgainst(int goalAgainst) {
        this.goalsAgainst = goalAgainst;
    }

    public int getGoalDifferential() {
        return goalDifferential;
    }

    public void setGoalDifferential(int goalDifferential) {
        this.goalDifferential = goalDifferential;
    }
}
