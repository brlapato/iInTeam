package com.hockey43.iInTeam.dataObjects.hockey;

import com.hockey43.iInTeam.dataObjects.Record;
import com.hockey43.iInTeam.dataObjects.TeamSummary;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGame;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGameSheet;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyTeam;

import javax.persistence.Column;
import java.util.List;

public class HockeyTeamSummary extends TeamSummary {

    private String teamName;
    private String regularPosition;
    private Integer playerNumber;
    private Record record;
    private String headCoach;
    private String assistantCoach1;
    private String assistantCoach2;
    private String manager;
    private int goals;
    private int assists;
    private int points;
    private int shots;
    private int penaltyMin;
    private HockeyGameSheet nextGame;

    public HockeyTeamSummary() {
        super();
    }

    public HockeyTeamSummary(HockeyTeam team) {
        super(team);

        this.setTeamName(team.getName());
        this.setPlayerNumber(team.getPlayerNumber());
        this.setRegularPosition(team.getRegularPosition());
        this.setHeadCoach(team.getHeadCoach());
        this.setAssistantCoach1(team.getAssistantCoach1());
        this.setAssistantCoach2(team.getAssistantCoach2());
        this.setManager(team.getManager());
    }

    // region Getters/Setters


    public String getHeadCoach() {
        return headCoach;
    }

    public void setHeadCoach(String headCoach) {
        this.headCoach = headCoach;
    }

    public String getAssistantCoach1() {
        return assistantCoach1;
    }

    public void setAssistantCoach1(String assistantCoach1) {
        this.assistantCoach1 = assistantCoach1;
    }

    public String getAssistantCoach2() {
        return assistantCoach2;
    }

    public void setAssistantCoach2(String assistantCoach2) {
        this.assistantCoach2 = assistantCoach2;
    }

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
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

    public Integer getPlayerNumber() {
        return playerNumber;
    }

    public void setPlayerNumber(Integer playerNumber) {
        this.playerNumber = playerNumber;
    }
    //endregion
}
