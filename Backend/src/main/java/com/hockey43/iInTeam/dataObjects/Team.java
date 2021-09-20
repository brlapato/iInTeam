package com.hockey43.iInTeam.dataObjects;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name="Team")
public abstract class Team {
    @Id
    @Column(name="TeamId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long teamId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "OrgId")
    private Org org;

    @ManyToOne()
    @JoinColumn(name="PlayerId", nullable = false)
    private Player playerOwner;

    @Column(name="Name")
    private String name;

    @Column(name="IsActive")
    private Boolean isActive;

    @Column(name="StartDate", columnDefinition = "DATETIME", nullable = false)
    private LocalDateTime startDate;

    @Column(name="Season", length = 10, nullable = false)
    private String season;

    public Org getOrg() {
        return org;
    }

    public void setOrg(Org org) {
        this.org = org;
    }

    public long getTeamId() {
        return teamId;
    }

    public void setTeamId(long teamId) {
        this.teamId = teamId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public abstract Sport getSport();

    public abstract TeamSummary getTeamSummary();

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }
}
