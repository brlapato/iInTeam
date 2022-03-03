package com.hockey43.iInTeam.dataObjects.swim;

import com.hockey43.iInTeam.dataObjects.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table(name="SwimMeet")
@PrimaryKeyJoinColumn(name = "EventId")
public class SwimMeet extends TeamEvent implements ICalendarEventSource {

    @Column(name="Name", nullable = true, length = 255)
    private String name;

    @Column(name="Notes", nullable = true, length = 5000)
    private String notes;


    @Override
    public CalendarEvent getCalendarEvent() {
        return null;
    }

    @Override
    public TeamEventSummary getTeamEventSummary() {
        TeamEventSummary eventSummary = new TeamEventSummary();

        eventSummary.setEventName(this.getName());
        eventSummary.setStartDateTime(this.getStartDateTime());
        eventSummary.setEventLocation(this.getLocation());

        return eventSummary;
    }

    @Override
    public TeamEventSheet getTeamEventSheet() {
        return null;
    }

    @Override
    public boolean isComplete() {
        return false;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
