package com.hockey43.iInTeam.dataObjects.swim;

import com.hockey43.iInTeam.dataObjects.Org;

import javax.persistence.*;

@Entity
@Table(name="SwimEvent")
public class SwimEvent {

    @Id
    @Column(name="SwimEventId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long swimEventId;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "SwimMeetId", nullable = false)
    private SwimMeet swimMeet;

    @Column(name="EventNumber", length = 15)
    private String eventNumber;

    @Column(name="Heat", length = 15)
    private String heat;

    @Column(name="LegDistance", nullable = false)
    private int legDistance;

    @Column(name="TotalDistance", nullable = false)
    private int totalDistance;

    @Column(name="RelayNumber", nullable = false)
    private int relayNumber;

    @Column(name="RelayLeg", nullable = false)
    private int relayLeg;

    @Column(name="EventType", nullable = false)
    @Enumerated(EnumType.STRING)
    private SwimEventType eventType;

    @Column(name="Stroke", nullable = false)
    @Enumerated(EnumType.STRING)
    private Stroke stroke;

    @Column(name="SplitTimeSec")
    private Float splitTimeSec;

    @Column(name="TotalTimeSec")
    private Float totalTimeSec;

    @Column(name="SeedTimeSec")
    private Float seedTimeSec;

    @Column(name="Place")
    private Short place;

    @Column(name="MeetPoints")
    private Short meetPoints;

    @Column(name="Disqualification")
    private boolean disqualification;

    @Column(name="Scratch")
    private boolean scratch;

    @Column(name="Notes", length = 3500)
    private String notes;

    public void mergeSwimEventSummary(SwimEventSummary swimEventSummary) {
        this.eventNumber = swimEventSummary.getEventNumber();
        this.heat = swimEventSummary.getHeat();
        this.legDistance = swimEventSummary.getLegDistance();
        this.totalDistance = swimEventSummary.getTotalDistance();
        this.relayNumber = swimEventSummary.getRelayNumber();
        this.relayLeg = swimEventSummary.getRelayLeg();
        this.eventType = swimEventSummary.getEventType();
        this.stroke = swimEventSummary.getStroke();
        this.splitTimeSec = swimEventSummary.getSplitTimeSec();
        this.totalTimeSec = swimEventSummary.getTotalTimeSec();
        this.seedTimeSec = swimEventSummary.getSeedTimeSec();
        this.place = swimEventSummary.getPlace();
        this.meetPoints = swimEventSummary.getMeetPoints();
        this.disqualification = swimEventSummary.isDisqualification();
        this.scratch = swimEventSummary.isScratch();
        this.notes = swimEventSummary.getNotes();
    }


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

    public SwimMeet getSwimMeet() {
        return swimMeet;
    }

    public void setSwimMeet(SwimMeet swimMeet) {
        this.swimMeet = swimMeet;
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
