package com.hockey43.iInTeam.dataObjects;

import com.hockey43.iInTeam.dataObjects.hockey.HockeyTeam;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name="TeamEvent")
public abstract class TeamEvent {

    @Id
    @Column(name="EventId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long eventId;

    @ManyToOne()
    @JoinColumn(name="TeamId", nullable = false)
    private Team ownerTeam;

    @Column(name="startDateTime", columnDefinition = "DATETIME", nullable = false)
    protected LocalDateTime startDateTime;

    @Column(name="endDateTime", columnDefinition = "DATETIME", nullable = true)
    protected LocalDateTime endDateTime;

    @Column(name="Location", length = 255)
    private String location;

    @Column(name="LocationDetail", length = 255, nullable = true)
    private String LocationDetail;

    public long getEventId() {
        return eventId;
    }

    public void setEventId(long eventId) {
        this.eventId = eventId;
    }

    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getLocationDetail() {
        return LocationDetail;
    }

    public void setLocationDetail(String locationDetail) {
        LocationDetail = locationDetail;
    }

    public abstract TeamEventSummary getTeamEventSummary();

    public Team getOwnerTeam() {
        return ownerTeam;
    }

    public LocalDateTime getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(LocalDateTime endDateTime) {
        this.endDateTime = endDateTime;
    }

    public void setOwnerTeam(Team ownerTeam) {
        this.ownerTeam = ownerTeam;
    }

    public abstract TeamEventSheet getTeamEventSheet();

    public abstract boolean isComplete();

}
