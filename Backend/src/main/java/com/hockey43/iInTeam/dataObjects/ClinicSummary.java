package com.hockey43.iInTeam.dataObjects;

import javax.persistence.*;
import java.time.LocalDateTime;

public class ClinicSummary {

    public ClinicSummary() {}

    public ClinicSummary(Clinic clinic) {
        this.clinicId = clinic.getClinicId();
        this.sport = clinic.getSport();
        this.name = clinic.getName();
        this.nameDetail = clinic.getNameDetail();
        this.description = clinic.getDescription();
        this.location = clinic.getLocation();
        this.locationDetail = clinic.getLocationDetail();
        this.org = clinic.getOrg();
        this.startDateTime = clinic.getStartDateTime();
        this.endDateTime = clinic.getEndDateTime();
        this.headCoach = clinic.getHeadCoach();
        this.assistantCoach1 = clinic.getAssistantCoach1();
        this.assistantCoach2 = clinic.getAssistantCoach2();
        this.assistantCoach3 = clinic.getAssistantCoach3();
        this.assistantCoach4 = clinic.getAssistantCoach4();
        this.preClinicNotes = clinic.getPreClinicNotes();
        this.postClinicNotes = clinic.getPostClinicNotes();
    }

    private long clinicId;
    private String name;
    private String nameDetail;
    private String description;
    private Sport sport;
    private Org org;
    protected LocalDateTime startDateTime;
    protected LocalDateTime endDateTime;
    private String location;
    private String locationDetail;
    private String headCoach;
    private String assistantCoach1;
    private String assistantCoach2;
    private String assistantCoach3;
    private String assistantCoach4;
    private String preClinicNotes;
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
        this.locationDetail = locationDetail;
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
}
