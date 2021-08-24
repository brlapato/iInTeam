package com.hockey43.iInTeam.webResources;

import com.hockey43.iInTeam.dataObjects.*;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGame;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyPlayerStatsEntry;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyTeam;
import com.hockey43.iInTeam.dataServices.HockeyTeamService;
import com.hockey43.iInTeam.dataServices.TeamService;
import com.hockey43.iInTeam.exceptions.GameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TeamResource {

    @Autowired
    private HockeyTeamService hockeyTeamService;
    @Autowired
    private TeamService teamService;

    @GetMapping("/players/{playerId}/HockeyTeams")
    public List<HockeyTeam> getHockeyTeams(@PathVariable long playerId, @RequestParam(name="active", required = false, defaultValue = "false") boolean activeOnly) {
        return this.hockeyTeamService.getHockeyTeams(playerId, activeOnly);
    }

    @GetMapping("/players/{playerId}/HockeyTeams/{teamId}/teamSummary")
    public HockeyTeamSummary getHockeyTeamSummary(@PathVariable long teamId) throws GameNotFoundException {
        return this.hockeyTeamService.getHockeyTeamSummary(teamId);
    }

    @GetMapping("/players/{playerId}/teams")
    public List<Team> getTeamsForPlayer(@PathVariable long playerId) {
        return this.teamService.getTeamForPlayer(playerId);
    }

    @GetMapping("/players/{playerId}/HockeyTeams/{teamId}/teamRecord")
    public List<RecordEntry> getHockeyTeamRecord(@PathVariable long teamId) {
        return this.hockeyTeamService.getTeamRecord(teamId);
    }

    @GetMapping("/players/{playerId}/HockeyTeams/{teamId}/playerStats")
    public List<HockeyPlayerStatsEntry> getHockeyTeamPlayerStats(@PathVariable long teamId) {
        return this.hockeyTeamService.getPlayerStatsForTeam(teamId);
    }

    @GetMapping("/players/{playerId}/HockeyTeams/{teamId}/games")
    public List<HockeyGame> getHockeyTeamGames(@PathVariable long teamId) {
        return this.hockeyTeamService.getGames(teamId);
    }
}
