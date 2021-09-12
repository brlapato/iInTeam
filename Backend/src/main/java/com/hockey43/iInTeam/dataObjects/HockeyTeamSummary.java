package com.hockey43.iInTeam.dataObjects;

import com.hockey43.iInTeam.dataObjects.hockey.HockeyGame;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGameSheet;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyTeam;

import java.util.List;

public class HockeyTeamSummary {

    private String teamName;

    private String regularPosition;

    private int playerNumber;

    private Record record;

    private int goals;

    private int assists;

    private int points;

    private int shots;

    private int penaltyMin;

    private HockeyGameSheet nextGame;

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

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public HockeyGameSheet getNextGame() {
        return nextGame;
    }

    public void setNextGame(HockeyGameSheet nextGame) {
        this.nextGame = nextGame;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getRegularPosition() {
        return regularPosition;
    }

    public void setRegularPosition(String regularPosition) {
        this.regularPosition = regularPosition;
    }

    public int getPlayerNumber() {
        return playerNumber;
    }

    public void setPlayerNumber(int playerNumber) {
        this.playerNumber = playerNumber;
    }
}
