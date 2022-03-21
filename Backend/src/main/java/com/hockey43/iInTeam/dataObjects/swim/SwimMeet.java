package com.hockey43.iInTeam.dataObjects.swim;

import com.hockey43.iInTeam.dataObjects.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name="SwimMeet")
@PrimaryKeyJoinColumn(name = "EventId")
public class SwimMeet extends TeamEvent implements ICalendarEventSource {

    @Column(name="Name", nullable = false, length = 255)
    private String name;

    @Column(name="Opponent1", nullable = true, length = 255)
    private String opponent1;

    @Column(name="Opponent2", nullable = true, length = 255)
    private String opponent2;

    @Column(name="PreMeetNotes", nullable = true, length = 3500)
    private String preMeetNotes;

    @Column(name="PostMeetNotes", nullable = true, length = 3500)
    private String postMeetNotes;


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
        return new SwimMeetSheet(this);
    }

    @Override
    public boolean isComplete() {
        LocalDateTime nextDay = this.startDateTime.plusDays(1);
        nextDay.truncatedTo(ChronoUnit.DAYS);
        return nextDay.isBefore(LocalDateTime.now());
    }

    public void mergeSwimMeetSheet(SwimMeetSheet meetSheet) {
        this.setName(meetSheet.getName());
        this.setOpponent1(meetSheet.getOpponent1());
        this.setOpponent2(meetSheet.getOpponent2());
        this.setPreMeetNotes(meetSheet.getPreMeetNotes());
        this.setPostMeetNotes(meetSheet.getPostMeetNotes());
        this.setStartDateTime(meetSheet.getStartDateTime());
        this.setEndDateTime(meetSheet.getEndDateTime());
        this.setLocation(meetSheet.getLocation());
        this.setLocationDetail(meetSheet.getLocationDetail());

    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
