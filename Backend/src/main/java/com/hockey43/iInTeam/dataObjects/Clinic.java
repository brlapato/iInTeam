package com.hockey43.iInTeam.dataObjects;

import com.hockey43.iInTeam.dataServices.ClinicService;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="Clinic")
public class Clinic {

    @Id
    @Column(name="ClinicId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long clinicId;

    @Column(name="Name", length = 255)
    private String name;

    @Column(name="NameDetail", length = 255)
    private String nameDetail;

    @Column(name="Description", length = 2500)
    private String description;

    @Column(name="Sport", nullable = true, length = 75)
    @Enumerated(EnumType.STRING)
    private Sport sport;

    @ManyToOne()
    @JoinColumn(name="PlayerId", nullable = false)
    private Player playerOwner;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "OrgId")
    private Org org;

    @Column(name="startDateTime", columnDefinition = "DATETIME", nullable = false)
    protected LocalDateTime startDateTime;

    @Column(name="endDateTime", columnDefinition = "DATETIME", nullable = false)
    protected LocalDateTime endDateTime;

    @Column(name="Location", length = 255, nullable = true)
    private String location;

    @Column(name="LocationDetail", length = 255, nullable = true)
    private String locationDetail;

    @Column(name="HeadCoach", length = 255, nullable = true)
    private String headCoach;

    @Column(name="AssistantCoach1", length = 255, nullable = true)
    private String assistantCoach1;

    @Column(name="AssistantCoach2", length = 255, nullable = true)
    private String assistantCoach2;

    @Column(name="AssistantCoach3", length = 255, nullable = true)
    private String assistantCoach3;

    @Column(name="AssistantCoach4", length = 255, nullable = true)
    private String assistantCoach4;

    @Column(name="PreClinicNotes", length = 2500, nullable = true)
    private String preClinicNotes;

    @Column(name="PostClinicNotes", length = 2500, nullable = true)
    private String postClinicNotes;

    public long getClinicId() {
        return clinicId;
    }

    public void setClinicId(long clinicId) {
        this.clinicId = clinicId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameDetail() {
        return nameDetail;
    }

    public void setNameDetail(String nameDetail) {
        this.nameDetail = nameDetail;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Sport getSport() {
        return sport;
    }

    public void setSport(Sport sport) {
        this.sport = sport;
    }

    public Player getPlayerOwner() {
        return playerOwner;
    }

    public void setPlayerOwner(Player playerOwner) {
        this.playerOwner = playerOwner;
    }

    public Org getOrg() {
        return org;
    }

    public void setOrg(Org org) {
        this.org = org;
    }

    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public LocalDateTime getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(LocalDateTime endDateTime) {
        this.endDateTime = endDateTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getLocationDetail() {
        return locationDetail;
    }

    public void setLocationDetail(String locationDetail) {
        locationDetail = locationDetail;
    }

    public String getHeadCoach() {
        return headCoach;
    }

    public void setHeadCoach(String headCoach) {
        this.headCoach = headCoach;
    }

    public String getAssistantCoach1() {
        return assistantCoach1;
    }

    public void setAssistantCoach1(String assistantCoach1) {
        this.assistantCoach1 = assistantCoach1;
    }

    public String getAssistantCoach2() {
        return assistantCoach2;
    }

    public void setAssistantCoach2(String assistantCoach2) {
        this.assistantCoach2 = assistantCoach2;
    }

    public String getAssistantCoach3() {
        return assistantCoach3;
    }

    public void setAssistantCoach3(String assistantCoach3) {
        this.assistantCoach3 = assistantCoach3;
    }

    public String getAssistantCoach4() {
        return assistantCoach4;
    }

    public void setAssistantCoach4(String assistantCoach4) {
        this.assistantCoach4 = assistantCoach4;
    }

    public String getPreClinicNotes() {
        return preClinicNotes;
    }

    public void setPreClinicNotes(String preClinicNotes) {
        this.preClinicNotes = preClinicNotes;
    }

    public String getPostClinicNotes() {
        return postClinicNotes;
    }

    public void setPostClinicNotes(String postClinicNotes) {
        this.postClinicNotes = postClinicNotes;
    }

    public Clinic() { }

    public void mergeSummary(ClinicSummary summary) {

        this.org = summary.getOrg();
        this.name = summary.getName();
        this.nameDetail = summary.getNameDetail();
        this.sport = summary.getSport();
        this.startDateTime = summary.getStartDateTime();
        this.endDateTime = summary.getEndDateTime();
        this.location = summary.getLocation();
        this.locationDetail = summary.getLocationDetail();
        this.description = summary.getDescription();
        this.headCoach = summary.getHeadCoach();
        this.assistantCoach1 = summary.getAssistantCoach1();
        this.assistantCoach2 = summary.getAssistantCoach2();
        this.assistantCoach3 = summary.getAssistantCoach3();
        this.assistantCoach4 = summary.getAssistantCoach4();
    }
}
