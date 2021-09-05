package com.hockey43.iInTeam.dataObjects.hockey;

import com.hockey43.iInTeam.dataObjects.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="HockeyGame")
@PrimaryKeyJoinColumn(name = "EventId")
public class HockeyGame extends TeamEvent {

    @ManyToOne()
    @JoinColumn(name="TeamId", nullable = false)
    private HockeyTeam ownerHockeyTeam;

    @Column(name="OpponentTeamName",
            nullable = false,
            length = 150)
    private String opponentTeamName;

    @Column(name="OpponentLevel",
            nullable = true,
            length = 5)
    private String opponentLevel;

    @Column(name="Side", nullable = false)
    @Enumerated(EnumType.STRING)
    private Side side;

    @Column(name="TeamScore")
    private int teamScore;

    @Column(name="OpponentScore")
    private int opponentScore;

    @Column(name="PeriodLength", nullable = false)
    private int periodLength = 20;

    @Column(name="NumPeriods", nullable = false)
    private int numberPeriods = 3;

    @Column(name="Goals")
    private int goals;

    @Column(name="Assists")
    private int assists;

    @Column(name="Shots")
    private int shots;

    @Column(name="PenaltyMin")
    private int penaltyMin;

    @Column(name="PreGameNotes", length = 3500)
    private String preGameNotes;

    @Column(name="PostGameNotes", length = 3500)
    private String postGameNotes;

    @Column(name="GameType", nullable = false)
    @Enumerated(EnumType.STRING)
    private GameType gameType;

    @Column(name="League", nullable = false)
    private String League;

    @Column(name="Result")
    private GameResult result;

    @Column(name="IsOvertime")
    private boolean isOvertime;

    @Column(name="IsPlayoff")
    private boolean isPlayoff;


    public HockeyGame() {}

    public HockeyGame(HockeyTeam ownerHockeyTeam, LocalDateTime startDateTime, String opponentTeamName, String opponentLevel, Side side) {
        this.ownerHockeyTeam = ownerHockeyTeam;
        this.startDateTime = startDateTime;
        this.opponentTeamName = opponentTeamName;
        this.opponentLevel = opponentLevel;
        this.side = side;
    }

    @Override
    public TeamEventSummary getTeamEventSummary() {
        TeamEventSummary eventSummary = new TeamEventSummary();

        String locationModifier = "vs";
        if (this.side == Side.Away) {
            locationModifier = "@";
        }

        eventSummary.setEventName(String.format("%s %s (%s)", locationModifier, this.getOpponentTeamName(), this.getLeague()));
        eventSummary.setStartDateTime(this.getStartDateTime());
        eventSummary.setEventLocation(this.getLocation());

        return eventSummary;
    }

    public HockeyTeam getOwnerTeam() {
        return ownerHockeyTeam;
    }

    public void setOwnerTeam(HockeyTeam ownerHockeyTeam) {
        this.ownerHockeyTeam = ownerHockeyTeam;
    }

    public String getOpponentTeamName() {
        return opponentTeamName;
    }

    public void setOpponentTeamName(String opponentTeamName) {
        this.opponentTeamName = opponentTeamName;
    }

    public String getOpponentLevel() {
        return opponentLevel;
    }

    public void setOpponentLevel(String opponentLevel) {
        this.opponentLevel = opponentLevel;
    }

    public Side getSide() {
        return side;
    }

    public void setSide(Side side) {
        this.side = side;
    }

    public Integer getTeamScore() {
        return teamScore;
    }

    public void setTeamScore(Integer teamScore) {
        this.teamScore = teamScore;
    }

    public Integer getOpponentScore() {
        return opponentScore;
    }

    public void setOpponentScore(Integer opponentScore) {
        this.opponentScore = opponentScore;
    }

    public int getPeriodLength() {
        return periodLength;
    }

    public void setPeriodLength(int periodLength) {
        this.periodLength = periodLength;
    }

    public int getNumberPeriods() {
        return numberPeriods;
    }

    public void setNumberPeriods(int numberPeriods) {
        this.numberPeriods = numberPeriods;
    }

    public Integer getGoals() {
        return goals;
    }

    public void setGoals(Integer goals) {
        this.goals = goals;
    }

    public Integer getAssists() {
        return assists;
    }

    public void setAssists(Integer assists) {
        this.assists = assists;
    }

    public Integer getShots() {
        return shots;
    }

    public void setShots(Integer shots) {
        this.shots = shots;
    }

    public String getPreGameNotes() {
        return preGameNotes;
    }

    public void setPreGameNotes(String preGameNotes) {
        this.preGameNotes = preGameNotes;
    }

    public String getPostGameNotes() {
        return postGameNotes;
    }

    public void setPostGameNotes(String postGameNotes) {
        this.postGameNotes = postGameNotes;
    }

    public GameType getGameType() {
        return gameType;
    }

    public void setGameType(GameType gameType) {
        this.gameType = gameType;
    }

    public String getLeague() {
        return League;
    }

    public void setLeague(String league) {
        League = league;
    }

    public Integer getPenaltyMin() {
        return penaltyMin;
    }

    public void setPenaltyMin(Integer penaltyMin) {
        this.penaltyMin = penaltyMin;
    }

    public GameResult getResult() {
        return result;
    }

    public void setResult(GameResult result) {
        this.result = result;
    }

    public boolean isOvertime() {
        return isOvertime;
    }

    public void setOvertime(boolean overtime) {
        isOvertime = overtime;
    }
}
