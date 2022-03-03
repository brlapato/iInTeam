package com.hockey43.iInTeam.dataObjects.swim;

import com.hockey43.iInTeam.dataObjects.TeamSummary;

import javax.persistence.Column;

public class SwimTeamSummary extends TeamSummary {

    private String homePool;
    private String hometown;
    private String clubExcellenceLevel;
    private Short clubRecognitionLevel;
    private String headCoach;
    private String assistantCoach1;

    public SwimTeamSummary() {
        super();
    }

    public SwimTeamSummary(SwimTeam team) {
        super(team);

        this.homePool = team.getHomePool();
        this.hometown = team.getHometown();
        this.assistantCoach1 = team.getAssistantCoach1();
        this.assistantCoach2 = team.getAssistantCoach2();
        this.clubExcellenceLevel = this.getClubExcellenceLevel();
        this.clubRecognitionLevel = this.getClubRecognitionLevel();
        this.headCoach = team.getHeadCoach();

    }

    public String getHomePool() {
        return homePool;
    }

    public void setHomePool(String homePool) {
        this.homePool = homePool;
    }

    public String getHometown() {
        return hometown;
    }

    public void setHometown(String hometown) {
        this.hometown = hometown;
    }

    public String getClubExcellenceLevel() {
        return clubExcellenceLevel;
    }

    public void setClubExcellenceLevel(String clubExcellenceLevel) {
        this.clubExcellenceLevel = clubExcellenceLevel;
    }

    public Short getClubRecognitionLevel() {
        return clubRecognitionLevel;
    }

    public void setClubRecognitionLevel(Short clubRecognitionLevel) {
        this.clubRecognitionLevel = clubRecognitionLevel;
    }

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

    private String assistantCoach2;

}
