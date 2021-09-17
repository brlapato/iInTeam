package com.hockey43.iInTeam.dataObjects.hockey;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hockey43.iInTeam.dataObjects.TeamEventSheet;
import com.hockey43.iInTeam.dataObjects.GameResult;
import com.hockey43.iInTeam.dataObjects.GameType;
import com.hockey43.iInTeam.dataObjects.Side;

import java.time.LocalDateTime;

public class HockeyGameSheet extends TeamEventSheet {

    // region Member Variables
    private LocalDateTime startDateTime;
    private long gameId;
    private long teamId;
    private String teamName;
    private String opponentTeamName;
    private String opponentTeamNameMod;
    private String opponentLevel;
    private String location;
    private String locationDetail;
    private Side side;
    private int teamScore;
    private int opponentScore;
    private int periodLength;
    private int numberPeriods;
    private int goals;
    private int assists;
    private int shots;
    private int penaltyMin;
    private String preGameNotes;
    private String postGameNotes;
    private GameType gameType;
    private String league;
    private GameResult result;
    private boolean isOvertime;
    private boolean isPlayoff;

    //endregion

    // region Getters/Setters


    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public long getGameId() {
        return gameId;
    }

    public void setGameId(long gameId) {
        this.gameId = gameId;
    }

    public long getTeamId() {
        return teamId;
    }

    public void setTeamId(long teamId) {
        this.teamId = teamId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Side getSide() {
        return side;
    }

    public void setSide(Side side) {
        this.side = side;
    }

    public int getTeamScore() {
        return teamScore;
    }

    public void setTeamScore(int teamScore) {
        this.teamScore = teamScore;
    }

    public int getOpponentScore() {
        return opponentScore;
    }

    public void setOpponentScore(int opponentScore) {
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
        return this.league;
    }

    public void setLeague(String league) {
        this.league = league;
    }

    public GameResult getResult() {
        return result;
    }

    public void setResult(GameResult result) {
        this.result = result;
    }

    public String getOpponentTeamNameMod() {
        return opponentTeamNameMod;
    }

    public void setOpponentTeamNameMod(String opponentTeamNameMod) {
        this.opponentTeamNameMod = opponentTeamNameMod;
    }

    public String getLocationDetail() {
        return locationDetail;
    }

    public void setLocationDetail(String locationDetail) {
        this.locationDetail = locationDetail;
    }

    @JsonProperty("isOvertime")
    public boolean isOvertime() {
        return isOvertime;
    }

    @JsonProperty("isOvertime")
    public void setOvertime(boolean overtime) {
        isOvertime = overtime;
    }

    @JsonProperty("isPlayoff")
    public boolean isPlayoff() {
        return isPlayoff;
    }

    @JsonProperty("isPlayoff")
    public void setPlayoff(boolean playoff) {
        isPlayoff = playoff;
    }

    //endregion

    // region Constructors

    public HockeyGameSheet() {
        super();
        this.setSport("Hockey");
    }

    public HockeyGameSheet(HockeyGame hockeyGame) {
        this();
        this.startDateTime = hockeyGame.getStartDateTime();
        this.gameId = hockeyGame.getEventId();
        this.teamId = hockeyGame.getOwnerTeam().getTeamId();
        this.teamName = hockeyGame.getOwnerTeam().getName();
        this.opponentTeamName = hockeyGame.getOpponentTeamName();
        this.opponentTeamNameMod = hockeyGame.getOpponentTeamNameMod();
        this.opponentLevel = hockeyGame.getOpponentLevel();
        this.location = hockeyGame.getLocation();
        this.locationDetail = hockeyGame.getLocationDetail();
        this.side = hockeyGame.getSide();
        this.teamScore = hockeyGame.getTeamScore();
        this.opponentScore = hockeyGame.getOpponentScore();
        this.periodLength = hockeyGame.getPeriodLength();
        this.numberPeriods = hockeyGame.getNumberPeriods();
        this.goals = hockeyGame.getGoals();
        this.assists = hockeyGame.getAssists();
        this.shots = hockeyGame.getShots();
        this.penaltyMin = hockeyGame.getPenaltyMin();
        this.preGameNotes = hockeyGame.getPreGameNotes();
        this.postGameNotes = hockeyGame.getPostGameNotes();
        this.gameType = hockeyGame.getGameType();
        this.league = hockeyGame.getLeague();
        this.result = hockeyGame.getResult();
        this.isOvertime = hockeyGame.isOvertime();
        this.isPlayoff = hockeyGame.isPlayoff();
    }

    //endregion



}
