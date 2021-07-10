package com.hockey43.iInTeam.webResources;

import com.hockey43.iInTeam.dataObjects.HockeyTeam;
import com.hockey43.iInTeam.dataObjects.HockeyTeamSummary;
import com.hockey43.iInTeam.dataObjects.Player;
import com.hockey43.iInTeam.dataServices.HockeyTeamService;
import com.hockey43.iInTeam.exceptions.GameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TeamResource {

    @Autowired
    private HockeyTeamService hockeyTeamService;

    @GetMapping("/players/{playerId}/HockeyTeams")
    public List<HockeyTeam> getHockeyTeams(@PathVariable long playerId, @RequestParam(name="active", required = false, defaultValue = "false") boolean activeOnly) {
        return this.hockeyTeamService.getHockeyTeams(playerId, activeOnly);
    }

    @GetMapping("/players/{playerId}/HockeyTeams/{teamId}/teamSummary")
    public HockeyTeamSummary getHockeyTeamSummary(@PathVariable long teamId) throws GameNotFoundException {
        return this.hockeyTeamService.getHockeyTeamSummary(teamId);
    }
}
