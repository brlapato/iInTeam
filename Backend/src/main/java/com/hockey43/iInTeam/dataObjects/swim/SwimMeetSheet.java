package com.hockey43.iInTeam.dataObjects.swim;

import com.hockey43.iInTeam.dataObjects.GameResult;
import com.hockey43.iInTeam.dataObjects.GameType;
import com.hockey43.iInTeam.dataObjects.Side;
import com.hockey43.iInTeam.dataObjects.TeamEventSheet;

import java.time.LocalDateTime;

public class SwimMeetSheet extends TeamEventSheet {
    public SwimMeetSheet() {
        super();
        this.setSport("Hockey");
    }

    public SwimMeetSheet(SwimMeet swimMeet) {
        this();

        this.name = swimMeet.getName();
        this.startDateTime = swimMeet.getStartDateTime();
        this.endDateTime = swimMeet.getEndDateTime();
        this.meetId = swimMeet.getEventId();
        this.teamId = swimMeet.getOwnerTeam().getTeamId();
        this.opponent1 = swimMeet.getOpponent1();
        this.opponent2 = swimMeet.getOpponent2();
        this.location = swimMeet.getLocation();
        this.locationDetail = swimMeet.getLocationDetail();
        this.preMeetNotes = swimMeet.getPreMeetNotes();
        this.postMeetNotes = swimMeet.getPostMeetNotes();

    }

    private String name;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private long meetId;
    private long teamId;
    private String opponent1;
    private String opponent2;
    private String location;
    private String locationDetail;
    private String preMeetNotes;
    private String postMeetNotes;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public long getMeetId() {
        return meetId;
    }

    public void setMeetId(long meetId) {
        this.meetId = meetId;
    }

    public long getTeamId() {
        return teamId;
    }

    public void setTeamId(long teamId) {
        this.teamId = teamId;
    }

    public String getOpponent1() {
        return opponent1;
    }

    public void setOpponent1(String opponent1) {
        this.opponent1 = opponent1;
    }

    public String getOpponent2() {
        return opponent2;
    }

    public void setOpponent2(String opponent2) {
        this.opponent2 = opponent2;
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

    public String getPreMeetNotes() {
        return preMeetNotes;
    }

    public void setPreMeetNotes(String preMeetNotes) {
        this.preMeetNotes = preMeetNotes;
    }

    public String getPostMeetNotes() {
        return postMeetNotes;
    }

    public void setPostMeetNotes(String postMeetNotes) {
        this.postMeetNotes = postMeetNotes;
    }
}
