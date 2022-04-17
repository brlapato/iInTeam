package com.hockey43.iInTeam.dataObjects.swim;

import javax.persistence.*;

public class SwimEventSummary {

    public SwimEventSummary() {}

    public SwimEventSummary(SwimEvent swimEvent) {
        this.swimEventId = swimEvent.getSwimEventId();
        this.swimMeetName = swimEvent.getSwimMeet().getName();
        this.swimMeetId = swimEvent.getSwimMeet().getEventId();
        this.heat = swimEvent.getHeat();
        this.eventNumber = swimEvent.getEventNumber();
        this.legDistance = swimEvent.getLegDistance();
        this.totalDistance = swimEvent.getTotalDistance();
        this.relayNumber = swimEvent.getRelayNumber();
        this.relayLeg = swimEvent.getRelayLeg();
        this.eventType = swimEvent.getEventType();
        this.stroke = swimEvent.getStroke();
        this.splitTimeSec = swimEvent.getSplitTimeSec();
        this.totalTimeSec = swimEvent.getTotalTimeSec();
        this.seedTimeSec = swimEvent.getSeedTimeSec();
        this.place = swimEvent.getPlace();
        this.meetPoints = swimEvent.getMeetPoints();
        this.disqualification = swimEvent.isDisqualification();
        this.scratch = swimEvent.isScratch();
        this.notes = swimEvent.getNotes();
    }

    private long swimEventId;
    private String eventNumber;
    private String heat;
    private String swimMeetName;
    private long swimMeetId;
    private int legDistance;
    private int totalDistance;
    private int relayNumber;
    private int relayLeg;
    private SwimEventType eventType;
    private Stroke stroke;
    private Float splitTimeSec;
    private Float totalTimeSec;
    private Float seedTimeSec;
    private Short place;
    private Short meetPoints;
    private boolean disqualification;
    private boolean scratch;
    private String notes;

    public long getSwimEventId() {
        return swimEventId;
    }

    public void setSwimEventId(long swimEventId) {
        this.swimEventId = swimEventId;
    }

    public String getHeat() {
        return heat;
    }

    public void setHeat(String heat) {
        this.heat = heat;
    }

    public String getSwimMeetName() {
        return swimMeetName;
    }

    public void setSwimMeetName(String swimMeetName) {
        this.swimMeetName = swimMeetName;
    }

    public long getSwimMeetId() {
        return swimMeetId;
    }

    public void setSwimMeetId(long swimMeetId) {
        this.swimMeetId = swimMeetId;
    }

    public String getEventNumber() {
        return eventNumber;
    }

    public void setEventNumber(String eventNumber) {
        this.eventNumber = eventNumber;
    }

    public int getLegDistance() {
        return legDistance;
    }

    public void setLegDistance(int legDistance) {
        this.legDistance = legDistance;
    }

    public int getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(int totalDistance) {
        this.totalDistance = totalDistance;
    }

    public int getRelayNumber() {
        return relayNumber;
    }

    public void setRelayNumber(int relayNumber) {
        this.relayNumber = relayNumber;
    }

    public int getRelayLeg() {
        return relayLeg;
    }

    public void setRelayLeg(int relayLeg) {
        this.relayLeg = relayLeg;
    }

    public SwimEventType getEventType() {
        return eventType;
    }

    public void setEventType(SwimEventType eventType) {
        this.eventType = eventType;
    }

    public Stroke getStroke() {
        return stroke;
    }

    public void setStroke(Stroke stroke) {
        this.stroke = stroke;
    }

    public Float getSplitTimeSec() {
        return splitTimeSec;
    }

    public void setSplitTimeSec(Float splitTimeSec) {
        this.splitTimeSec = splitTimeSec;
    }

    public Float getTotalTimeSec() {
        return totalTimeSec;
    }

    public void setTotalTimeSec(Float totalTimeSec) {
        this.totalTimeSec = totalTimeSec;
    }

    public Float getSeedTimeSec() {
        return seedTimeSec;
    }

    public void setSeedTimeSec(Float seedTimeSec) {
        this.seedTimeSec = seedTimeSec;
    }

    public Short getPlace() {
        return place;
    }

    public void setPlace(Short place) {
        this.place = place;
    }

    public Short getMeetPoints() {
        return meetPoints;
    }

    public void setMeetPoints(Short meetPoints) {
        this.meetPoints = meetPoints;
    }

    public boolean isDisqualification() {
        return disqualification;
    }

    public void setDisqualification(boolean disqualification) {
        this.disqualification = disqualification;
    }

    public boolean isScratch() {
        return scratch;
    }

    public void setScratch(boolean scratch) {
        this.scratch = scratch;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
