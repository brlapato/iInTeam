package com.hockey43.iInTeam.webResources.sports;

import com.hockey43.iInTeam.dataObjects.TeamEventSheet;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGame;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGameSheet;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyTeam;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyTeamSummary;
import com.hockey43.iInTeam.dataObjects.swim.*;
import com.hockey43.iInTeam.dataServices.swim.SwimTeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
public class SwimTeamResource {

    @Autowired
    private SwimTeamService swimTeamService;

    @PreAuthorize("@authenticator.userCanAccessTeam(#principal.getName(), #teamId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @PutMapping("/players/{playerId}/SwimTeams/{teamId}")
    public ResponseEntity<SwimTeamSummary> updateSwimTeam(
            Principal principal,
            @PathVariable long playerId,
            @PathVariable long teamId,
            @RequestBody SwimTeamSummary teamSummary
    ) {
        SwimTeam targetTeam = this.swimTeamService.getSwimteam(teamId);

        // Merge sheet with team
        targetTeam.mergeSwimTeamSummary(teamSummary);

        // Save team
        this.swimTeamService.saveSwimTeam(targetTeam);

        SwimTeamSummary updatedTeamSummary = teamSummary;

        return new ResponseEntity<SwimTeamSummary>(updatedTeamSummary, HttpStatus.OK);
    }

    @PreAuthorize("@authenticator.userCanAccessTeam(#principal.getName(), #teamId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @GetMapping("/players/{playerId}/SwimTeams/{teamId}/meets")
    public List<SwimMeetSheet> getSwimMeets(
            Principal principal,
            @PathVariable long playerId,
            @PathVariable long teamId
    ) {
        List<SwimMeet> meets = this.swimTeamService.getSwimMeets(teamId);

        List<SwimMeetSheet> meetSheets = new ArrayList<SwimMeetSheet>();
        meets.forEach((meet)->meetSheets.add(new SwimMeetSheet(meet)));


        return meetSheets;
    }

    @PreAuthorize("@authenticator.userCanAccessTeamEvent(#principal.getName(), #meetId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @GetMapping("/players/{playerId}/SwimTeams/{teamId}/meets/{meetId}")
    public SwimMeetSheet getSwimMeet(
            Principal principal,
            @PathVariable long playerId,
            @PathVariable long meetId
    ) {
        SwimMeet meet = this.swimTeamService.getSwimMeet(meetId);

        return new SwimMeetSheet(meet);
    }

    @PreAuthorize("@authenticator.userCanAccessTeamEvent(#principal.getName(), #meetId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @PutMapping("/players/{playerId}/SwimTeams/{teamId}/meets/{meetId}")
    public ResponseEntity<SwimMeetSheet> updateSwimMeet(
            Principal principal,
            @PathVariable long playerId,
            @PathVariable long meetId,
            @RequestBody SwimMeetSheet meetSheet
    ) {
        SwimMeet targetMeet = this.swimTeamService.getSwimMeet(meetId);

        // Merge sheet with game
        targetMeet.mergeSwimMeetSheet(meetSheet);

        // Save game
        this.swimTeamService.saveSwimMeet(targetMeet);

        SwimMeetSheet updatedSwimMeetSheet = meetSheet;
        updatedSwimMeetSheet.setMeetId(targetMeet.getEventId());

        return new ResponseEntity<SwimMeetSheet>(updatedSwimMeetSheet, HttpStatus.OK);
    }

    @PreAuthorize("@authenticator.userCanAccessTeam(#principal.getName(), #teamId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @PostMapping("/players/{playerId}/SwimTeams/{teamId}/meets")
    public ResponseEntity<SwimMeetSheet> createSwimMeet(
            Principal principal,
            @PathVariable long playerId,
            @PathVariable long teamId,
            @RequestBody SwimMeetSheet meetSheet
    ) {
        SwimMeet targetMeet = this.swimTeamService.getNewMeet(teamId);

        // Merge sheet with game
        targetMeet.mergeSwimMeetSheet(meetSheet);

        // Save game
        this.swimTeamService.saveSwimMeet(targetMeet);

        SwimMeetSheet updatedSwimMeetSheet = meetSheet;
        updatedSwimMeetSheet.setMeetId(targetMeet.getEventId());

        return new ResponseEntity<SwimMeetSheet>(updatedSwimMeetSheet, HttpStatus.OK);
    }

    @PreAuthorize("@authenticator.userCanAccessTeamEventEvent(#principal.getName(), #meetId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @DeleteMapping("/players/{playerId}/SwimTeams/{teamId}/meets/{meetId}")
    public ResponseEntity<HockeyGameSheet> deleteSwimMeet(
            Principal principal,
            @PathVariable long playerId,
            @PathVariable long meetId
    ) {
        this.swimTeamService.deleteSwimMeet(meetId);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("@authenticator.userCanAccessTeamEvent(#principal.getName(), #meetId)")
    @GetMapping("/players/{playerId}/SwimTeams/{teamId}/meets/{meetId}/swimEvents")
    public List<SwimEventSummary> getSwimMeetEvents(
            Principal principal,
            @PathVariable long meetId
    ) {
        List<SwimEvent> swimEvents = this.swimTeamService.getSwimEventsForMeet(meetId);

        List<SwimEventSummary> eventSummaries = new ArrayList<SwimEventSummary>();
        swimEvents.forEach((swimEvent)->eventSummaries.add(new SwimEventSummary(swimEvent)));


        return eventSummaries;
    }

    @PreAuthorize("@authenticator.userCanAccessTeamEvent(#principal.getName(), #meetId)")
    @PostMapping("/players/{playerId}/SwimTeams/{teamId}/meets/{meetId}/swimEvents")
    public ResponseEntity<SwimEventSummary> createSwimEvent(
            Principal principal,
            @PathVariable long meetId,
            @RequestBody SwimEventSummary swimEventSummary
    ) {
        SwimEvent newEvent = this.swimTeamService.getNewSwimEvent(meetId);
        newEvent.mergeSwimEventSummary(swimEventSummary);
        this.swimTeamService.saveSwimEvent(newEvent);

        SwimEventSummary updatedSwimEventSummary = swimEventSummary;
        updatedSwimEventSummary.setSwimEventId(newEvent.getSwimEventId());

        return new ResponseEntity<SwimEventSummary>(updatedSwimEventSummary, HttpStatus.OK);
    }
}
