package com.hockey43.iInTeam.dataObjects;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name="Practice")
@PrimaryKeyJoinColumn(name = "EventId")
public class Practice extends TeamEvent implements ICalendarEventSource {

    @Column(name="Notes", length = 3500)
    private String notes;

    @Column(name="Description", length = 255)
    private String description;


    // TODO Complete fields
    @Override
    public TeamEventSummary getTeamEventSummary() {
        return null;
    }

    @Override
    public TeamEventSheet getTeamEventSheet() {
        return null;
    }

    @Override
    public boolean isComplete() {
        return this.endDateTime.isBefore(LocalDateTime.now());
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void mergePracticeSummary(PracticeSummary summary) {
        this.setStartDateTime(summary.getStartDateTime());
        this.setEndDateTime(summary.getEndDateTime());
        this.setDescription(summary.getEventName());
        this.setNotes(summary.getNotes());
        this.setLocation(summary.getEventLocation());
        this.setLocationDetail(summary.getEventLocationDetail());
    }

    @Override
    public CalendarEvent getCalendarEvent() {
        CalendarEvent calendarEvent = new CalendarEvent();
        calendarEvent.setStartDateTime(this.getStartDateTime());
        calendarEvent.setEndDateTime(this.getEndDateTime());
        calendarEvent.setOrg(this.getOwnerTeam().getOrg());
        calendarEvent.setName(this.getDescription());
        calendarEvent.setEventType("Practice");
        calendarEvent.setSport(this.getOwnerTeam().getSport());
        calendarEvent.setLocation(this.getLocation());
        calendarEvent.setLocationDetail(this.getLocationDetail());
        return calendarEvent;
    }
}
