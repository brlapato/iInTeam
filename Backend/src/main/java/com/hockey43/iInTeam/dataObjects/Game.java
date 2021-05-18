package com.hockey43.iInTeam.dataObjects;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="Game")
public class Game {

    @Id
    @Column(name="GameId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int gameId;

    @ManyToOne()
    @JoinColumn(name="TeamId", nullable = false)
    private Team ownerTeam;

    @Column(name="startDateTime", columnDefinition = "DATETIME", nullable = false)
    private LocalDateTime startDateTime;

    @Column(name="OpponentTeamName", nullable = false)
    private String opponentTeamName;

    @Column(name="OpponentLevel")
    @Enumerated(EnumType.STRING)
    private Level opponentLevel;

    @Column(name="Side")
    @Enumerated(EnumType.STRING)
    private Side side;

    @Column(name="TeamScore")
    private Integer teamScore;

    @Column(name="OpponentScore")
    private Integer opponentScore;

    @Column(name="Rink")
    private String rink;

    @Column(name="PeriodLength", nullable = false)
    private int periodLength = 20;

    @Column(name="NumPeriods", nullable = false)
    private int numberPeriods = 3;

    @Column(name="Goals")
    private Integer goals;

    @Column(name="Assists")
    private Integer assists;

    @Column(name="Shots")
    private Integer shots;

    @Column(name="PreGameNotes")
    private String preGameNotes;

    @Column(name="PostGameNotes")
    private String postGameNotes;

    @Column(name="GameType")
    @Enumerated(EnumType.STRING)
    private GameType gameType;

    @Column(name="League")
    private String League;



    public Game() {}

    public Game(Team ownerTeam, LocalDateTime startDateTime, String opponentTeamName, Level opponentLevel, Side side) {
        this.ownerTeam = ownerTeam;
        this.startDateTime = startDateTime;
        this.opponentTeamName = opponentTeamName;
        this.opponentLevel = opponentLevel;
        this.side = side;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public Team getOwnerTeam() {
        return ownerTeam;
    }

    public void setOwnerTeam(Team ownerTeam) {
        this.ownerTeam = ownerTeam;
    }

    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public String getOpponentTeamName() {
        return opponentTeamName;
    }

    public void setOpponentTeamName(String opponentTeamName) {
        this.opponentTeamName = opponentTeamName;
    }

    public Level getOpponentLevel() {
        return opponentLevel;
    }

    public void setOpponentLevel(Level opponentLevel) {
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

    public String getRink() {
        return rink;
    }

    public void setRink(String rink) {
        this.rink = rink;
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
}
