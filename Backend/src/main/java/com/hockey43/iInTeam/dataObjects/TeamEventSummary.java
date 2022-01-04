package com.hockey43.iInTeam.dataObjects;

import java.time.LocalDateTime;
import java.util.Date;

public class TeamEventSummary {
    private long teamEventId;

    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private String eventName;
    private String eventLocation;
    private String eventLocationDetail;

    public long getTeamEventId() {
        return teamEventId;
    }

    public void setTeamEventId(long teamEventId) {
        this.teamEventId = teamEventId;
    }

    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventLocation() {
        return eventLocation;
    }

    public void setEventLocation(String eventLocation) {
        this.eventLocation = eventLocation;
    }

    public LocalDateTime getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(LocalDateTime endDateTime) {
        this.endDateTime = endDateTime;
    }

    public String getEventLocationDetail() {
        return eventLocationDetail;
    }

    public void setEventLocationDetail(String eventLocationDetail) {
        this.eventLocationDetail = eventLocationDetail;
    }
}
