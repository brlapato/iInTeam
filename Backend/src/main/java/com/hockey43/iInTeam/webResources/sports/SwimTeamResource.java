package com.hockey43.iInTeam.webResources.sports;

import com.hockey43.iInTeam.dataObjects.TeamEventSheet;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGame;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGameSheet;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyTeam;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyTeamSummary;
import com.hockey43.iInTeam.dataObjects.swim.SwimMeet;
import com.hockey43.iInTeam.dataObjects.swim.SwimMeetSheet;
import com.hockey43.iInTeam.dataObjects.swim.SwimTeam;
import com.hockey43.iInTeam.dataObjects.swim.SwimTeamSummary;
import com.hockey43.iInTeam.dataServices.swim.SwimTeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class SwimTeamResource {

    @Autowired
    private SwimTeamService swimTeamService;

    @PutMapping("/players/{playerId}/SwimTeams/{teamId}")
    public ResponseEntity<SwimTeamSummary> updateSwimTeam(
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

    @GetMapping("/players/{playerId}/SwimTeams/{teamId}/meets")
    public List<SwimMeetSheet> getSwimMeets(
            @PathVariable long teamId
    ) {
        List<SwimMeet> meets = this.swimTeamService.getSwimMeets(teamId);

        List<SwimMeetSheet> meetSheets = new ArrayList<SwimMeetSheet>();
        meets.forEach((meet)->meetSheets.add(new SwimMeetSheet(meet)));


        return meetSheets;
    }

    @GetMapping("/players/{playerId}/SwimTeams/{teamId}/meets/{meetId}")
    public SwimMeetSheet getSwimMeet(
            @PathVariable long meetId
    ) {
        SwimMeet meet = this.swimTeamService.getSwimMeet(meetId);

        return new SwimMeetSheet(meet);
    }

    @PutMapping("/players/{playerId}/SwimTeams/{teamId}/meets/{meetId}")
    public ResponseEntity<SwimMeetSheet> updateSwimMeet(
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

    @PostMapping("/players/{playerId}/SwimTeams/{teamId}/meets")
    public ResponseEntity<SwimMeetSheet> createSwimMeet(
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

    @DeleteMapping("/players/{playerId}/SwimTeams/{teamId}/meets/{meetId}")
    public ResponseEntity<HockeyGameSheet> deleteSwimMeet(
            @PathVariable long meetId
    ) {
        this.swimTeamService.deleteSwimMeet(meetId);
        return ResponseEntity.noContent().build();
    }
}
