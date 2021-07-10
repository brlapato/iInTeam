package com.hockey43.iInTeam.dataObjects;

import java.time.LocalDateTime;
import java.util.Date;

public class TeamEventSummary {
    private long teamEventId;

    private LocalDateTime startDateTime;

    private String eventName;

    private String eventLocation;



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


}
