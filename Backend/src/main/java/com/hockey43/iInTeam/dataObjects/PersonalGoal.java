package com.hockey43.iInTeam.dataObjects;

import javax.persistence.*;

@Entity
@Table(name="PersonalGoal")
public class PersonalGoal {

    @Id
    @Column(name="GoalId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long goalId;

    @ManyToOne()
    @JoinColumn(name="PlayerId", nullable = false)
    private Player player;

    @Column(name="Name", nullable = false, length = 150)
    private String name;

    @Column(name="Sport", nullable = true, length = 75)
    @Enumerated(EnumType.STRING)
    private Sport sport;

    @Column(name="Description", nullable = true, length = 500)
    private String description;

    @Column(name="TimeFrame", nullable = true, length = 100)
    private String timeFrame;

    @Column(name="Plan", nullable = true, length = 500)
    private String plan;

    @Column(name="IsComplete", nullable = true)
    private boolean isComplete = false;

    public long getGoalId() {
        return goalId;
    }

    public void setGoalId(long goalId) {
        this.goalId = goalId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Sport getSport() {
        return sport;
    }

    public void setSport(Sport sport) {
        this.sport = sport;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTimeFrame() {
        return timeFrame;
    }

    public void setTimeFrame(String timeFrame) {
        this.timeFrame = timeFrame;
    }

    public String getPlan() {
        return plan;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    public boolean isComplete() {
        return isComplete;
    }

    public void setComplete(boolean complete) {
        isComplete = complete;
    }
}
