package com.hockey43.iInTeam.dataObjects;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name="TeamEvent")
public abstract class TeamEvent {

    @Id
    @Column(name="EventId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int eventId;

    @Column(name="startDateTime", columnDefinition = "DATETIME", nullable = false)
    protected LocalDateTime startDateTime;

    @Column(name="Location")
    private String location;

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
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

    public abstract TeamEventSummary getTeamEventSummary();
}
