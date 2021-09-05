package com.hockey43.iInTeam.dataObjects;

public class Record {
    private int wins;

    private int losses;

    private int overTimeLosses;

    private int overTimeWins;

    private int ties;

    public int getWins() {
        return wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public int getLosses() {
        return losses;
    }

    public void setLosses(int losses) {
        this.losses = losses;
    }

    public int getOverTimeLosses() {
        return overTimeLosses;
    }

    public void setOverTimeLosses(int overTimeLosses) {
        this.overTimeLosses = overTimeLosses;
    }

    public int getTies() {
        return ties;
    }

    public void setTies(int ties) {
        this.ties = ties;
    }

    public int getOverTimeWins() {
        return overTimeWins;
    }

    public void setOverTimeWins(int overTimeWins) {
        this.overTimeWins = overTimeWins;
    }
}
