package com.hockey43.iInTeam.dataObjects;

import com.hockey43.iInTeam.dataObjects.hockey.HockeyAttributes;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyPlayerStatsEntry;


import java.util.List;

public class PlayerSummary {

    private Long playerId;
    private String userId;
    private String firstName;
    private String lastName;
    private String nickName;
    private int heightFeet;
    private int heightInches;
    private int weight;

    private boolean includeHockey;
    private HockeyAttributes hockeyAttributes = new HockeyAttributes();
    private List<HockeyPlayerStatsEntry> hockeyPlayerStats;
    private List<RecordEntry> hockeyTeamRecords;


    //region Getter/Setter

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public int getHeightFeet() {
        return heightFeet;
    }

    public void setHeightFeet(int heightFeet) {
        this.heightFeet = heightFeet;
    }

    public int getHeightInches() {
        return heightInches;
    }

    public void setHeightInches(int heightInches) {
        this.heightInches = heightInches;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public boolean isIncludeHockey() {
        return includeHockey;
    }

    public void setIncludeHockey(boolean includeHockey) {
        this.includeHockey = includeHockey;
    }

    public HockeyAttributes getHockeyAttributes() {
        return hockeyAttributes;
    }

    public void setHockeyAttributes(HockeyAttributes hockeyAttributes) {
        this.hockeyAttributes = hockeyAttributes;
    }

    public List<HockeyPlayerStatsEntry> getHockeyPlayerStats() {
        return hockeyPlayerStats;
    }

    public void setHockeyPlayerStats(List<HockeyPlayerStatsEntry> hockeyPlayerStats) {
        this.hockeyPlayerStats = hockeyPlayerStats;
    }

    public List<RecordEntry> getHockeyTeamRecords() {
        return hockeyTeamRecords;
    }

    public void setHockeyTeamRecords(List<RecordEntry> hockeyTeamRecords) {
        this.hockeyTeamRecords = hockeyTeamRecords;
    }


    //endregion

    public PlayerSummary() {

    }

    public PlayerSummary(Player player) {
        this();

        this.firstName = player.getFirstName();
        this.lastName = player.getLastName();
        this.heightFeet = player.getHeightFeet();
        this.heightInches = player.getHeightInches();
        this.hockeyAttributes = player.getHockeyAttributes();
        this.nickName = player.getNickName();
        this.weight = player.getWeight();
        this.includeHockey = player.isIncludeHockey();
        this.userId = player.getUserId();
        this.playerId = player.getPlayerId();
    }
}
