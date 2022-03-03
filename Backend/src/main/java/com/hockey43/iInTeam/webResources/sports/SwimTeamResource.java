package com.hockey43.iInTeam.webResources.sports;

import com.hockey43.iInTeam.dataObjects.hockey.HockeyTeam;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyTeamSummary;
import com.hockey43.iInTeam.dataObjects.swim.SwimTeam;
import com.hockey43.iInTeam.dataObjects.swim.SwimTeamSummary;
import com.hockey43.iInTeam.dataServices.swim.SwimTeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SwimTeamResource {

    @Autowired
    private SwimTeamService swimTeamService;

    @PutMapping("/players/{playerId}/SwimTeams/{teamId}")
    public ResponseEntity<SwimTeamSummary> updateHockeyTeam(
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
}
