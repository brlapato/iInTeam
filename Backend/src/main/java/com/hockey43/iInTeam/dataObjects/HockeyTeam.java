package com.hockey43.iInTeam.dataObjects;

import javax.persistence.*;

@Entity
@Table(name="HockeyTeam")
public class HockeyTeam {


    @Id
    @Column(name="TeamId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int teamId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "OrgId")
    private Org org;


    @ManyToOne()
    @JoinColumn(name="PlayerId", nullable = false)
    private Player playerOwner;

    @Column(name="Name")
    private String name;

    @Column(name="Level")
    @Enumerated(EnumType.STRING)
    private Level level;

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

    @Column(name="RegularPosition")
    private Position regularPosition;

    @Column(name="PlayerNumber")
    private Integer playerNumber;

    @Column(name="IsActive")
    private Boolean isActive;

    public Org getOrg() {
        return org;
    }

    public void setOrg(Org org) {
        this.org = org;
    }

    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
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

    public Player getPlayerOwner() {
        return playerOwner;
    }

    public void setPlayerOwner(Player playerOwner) {
        this.playerOwner = playerOwner;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public Position getRegularPosition() {
        return regularPosition;
    }

    public void setRegularPosition(Position regularPosition) {
        this.regularPosition = regularPosition;
    }

    public Integer getPlayerNumber() {
        return playerNumber;
    }

    public void setPlayerNumber(Integer playerNumber) {
        this.playerNumber = playerNumber;
    }
}
