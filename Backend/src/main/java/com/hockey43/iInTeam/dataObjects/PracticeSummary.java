package com.hockey43.iInTeam.dataObjects;

public class PracticeSummary extends TeamEventSummary {

    private String notes;

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public PracticeSummary() {
        super();
    }

    public PracticeSummary(Practice practice) {
        this.setTeamEventId(practice.getEventId());
        this.setStartDateTime(practice.getStartDateTime());
        this.setEndDateTime(practice.getEndDateTime());
        this.setNotes(practice.getNotes());
        this.setEventName(practice.getDescription());
        this.setEventLocation(practice.getLocation());
        this.setEventLocationDetail((practice.getLocationDetail()));
    }
}
