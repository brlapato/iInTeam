package com.hockey43.iInTeam.dataObjects.hockey;

import com.hockey43.iInTeam.dataObjects.*;

import javax.persistence.*;

@Entity
@Table(name="HockeyTeam")
@PrimaryKeyJoinColumn(name = "TeamId")
public class HockeyTeam extends Team {


    @Column(name="Level", nullable = false, length = 10)
    private String level;

    @Column(name="AgeClass")
    @Enumerated(EnumType.STRING)
    private AgeClass ageClass;

    @Column(name="HeadCoach")
    private String headCoach;

    @Column(name="AssistantCoach1")
    private String assistantCoach1;

    @Column(name="AssistantCoach2")
    private String assistantCoach2;

    @Column(name="Manager")
    private String manager;

    @Column(name="RegularPosition", length = 15)
    private String regularPosition;

    @Column(name="PlayerNumber")
    private Integer playerNumber;

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public AgeClass getAgeClass() {
        return ageClass;
    }

    public void setAgeClass(AgeClass ageClass) {
        this.ageClass = ageClass;
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

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
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

    @Override
    public Sport getSport() {
        return Sport.Hockey;
    }

    @Override
    public TeamSummary getTeamSummary() {
        return new HockeyTeamSummary(this);
    }
}
