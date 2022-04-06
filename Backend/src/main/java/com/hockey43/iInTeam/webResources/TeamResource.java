package com.hockey43.iInTeam.webResources;

import com.hockey43.iInTeam.dataObjects.*;
import com.hockey43.iInTeam.dataObjects.hockey.*;
import com.hockey43.iInTeam.dataServices.PlayerService;
import com.hockey43.iInTeam.dataServices.hockey.HockeyTeamService;
import com.hockey43.iInTeam.dataServices.TeamService;
import com.hockey43.iInTeam.exceptions.GameNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
public class TeamResource {

    private static Logger LOG = LoggerFactory
            .getLogger(TeamResource.class);

    @Autowired
    private HockeyTeamService hockeyTeamService;
    @Autowired
    private TeamService teamService;

    @Autowired
    private PlayerService playerService;




    @PreAuthorize("@authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @GetMapping("/players/{playerId}/teams")
    public List<TeamSummary> getTeamsForPlayer(Principal principal, @PathVariable long playerId) {
        List<Team> teams = this.teamService.getTeamForPlayer(playerId);

        List<TeamSummary> teamSheets = new ArrayList<TeamSummary>();
        teams.forEach((team)->teamSheets.add(team.getTeamSummary()));
        return teamSheets;
    }

    @PreAuthorize("@authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @PostMapping("/players/{playerId}/teams")
    public ResponseEntity<TeamSummary> createTeam(
            Principal principal,
            @PathVariable long playerId,
            @RequestBody TeamSummary teamSummary
    ) {
        Player player = this.playerService.getPlayer(playerId);

        Team team = TeamFactory.getInstance().build(teamSummary, player);
        this.teamService.saveTeam(team);
        teamSummary.setTeamId(team.getTeamId());

        return new ResponseEntity<TeamSummary>(teamSummary, HttpStatus.OK);
    }




}
