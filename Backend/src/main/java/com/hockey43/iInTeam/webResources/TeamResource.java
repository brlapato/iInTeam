package com.hockey43.iInTeam.webResources;

import com.hockey43.iInTeam.dataObjects.*;
import com.hockey43.iInTeam.dataObjects.hockey.*;
import com.hockey43.iInTeam.dataServices.HockeyTeamService;
import com.hockey43.iInTeam.dataServices.TeamService;
import com.hockey43.iInTeam.exceptions.GameNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TeamResource {

    private static Logger LOG = LoggerFactory
            .getLogger(TeamResource.class);

    @Autowired
    private HockeyTeamService hockeyTeamService;
    @Autowired
    private TeamService teamService;

    //@GetMapping("/players/{playerId}/HockeyTeams")
    //public List<HockeyTeam> getHockeyTeams(@PathVariable long playerId, @RequestParam(name="active", required = false, defaultValue = "false") boolean activeOnly) {
    //    return this.hockeyTeamService.getHockeyTeams(playerId, activeOnly);
    //}

    @GetMapping("/players/{playerId}/HockeyTeams")
    public List<HockeyTeamSummary> getHockeyTeamSummaries(@PathVariable long playerId, @RequestParam(name="active", required = false, defaultValue = "false") boolean activeOnly) {
        return this.hockeyTeamService.getHockeyTeamSummaries(playerId, activeOnly);
    }

    @GetMapping("/players/{playerId}/HockeyTeams/{teamId}/teamSummary")
    public HockeyTeamSummary getHockeyTeamSummary(@PathVariable long teamId) throws GameNotFoundException {
        return this.hockeyTeamService.getHockeyTeamSummary(teamId);
    }

    @GetMapping("/players/{playerId}/teams")
    public List<TeamSummary> getTeamsForPlayer(@PathVariable long playerId) {
        List<Team> teams = this.teamService.getTeamForPlayer(playerId);

        List<TeamSummary> teamSheets = new ArrayList<TeamSummary>();
        teams.forEach((team)->teamSheets.add(team.getTeamSummary()));
        return teamSheets;
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
    public List<HockeyGameSheet> getHockeyTeamGames(@PathVariable long teamId) {
        List<HockeyGame> games = this.hockeyTeamService.getGames(teamId);

        List<HockeyGameSheet> gameSheets = new ArrayList<HockeyGameSheet>();
        games.forEach((game)->gameSheets.add(new HockeyGameSheet(game)));
        return gameSheets;
    }

    @GetMapping("/players/{playerId}/HockeyTeams/{teamId}/games/{gameId}")
    public HockeyGameSheet getHockeyTeamGame(@PathVariable long teamId, @PathVariable long gameId) {
        return new HockeyGameSheet(this.hockeyTeamService.getHockeyGame(teamId, gameId));
    }

    @PutMapping("/players/{playerId}/HockeyTeams/{teamId}/games/{gameId}")
    public ResponseEntity<HockeyGameSheet> updateHockeyGame(
            @PathVariable long teamId,
            @RequestBody HockeyGameSheet gameSheet
    ) {
        HockeyGame targetGame = this.hockeyTeamService.getHockeyGame(teamId, gameSheet.getGameId());

        // Merge sheet with game
        targetGame.mergeHockeyGameSheet(gameSheet);

        // Save game
        this.hockeyTeamService.saveHockeyGame(targetGame);

        HockeyGameSheet updatedGameSheet = gameSheet;

        return new ResponseEntity<HockeyGameSheet>(updatedGameSheet, HttpStatus.OK);
    }

    @PostMapping("/players/{playerId}/HockeyTeams/{teamId}/games/")
    public ResponseEntity<HockeyGameSheet> createHockeyGame(
            @PathVariable long teamId,
            @RequestBody HockeyGameSheet gameSheet
    ) {
        HockeyGame targetGame = this.hockeyTeamService.getNewGame(teamId);

        // Merge sheet with game
        targetGame.mergeHockeyGameSheet(gameSheet);

        // Save game
        this.hockeyTeamService.saveHockeyGame(targetGame);

        HockeyGameSheet updatedGameSheet = gameSheet;

        return new ResponseEntity<HockeyGameSheet>(updatedGameSheet, HttpStatus.OK);
    }

    @DeleteMapping("/players/{playerId}/HockeyTeams/{teamId}/games/{gameId}")
    public ResponseEntity<HockeyGameSheet> deleteHockeyGame(
            @PathVariable long teamId,
            @PathVariable long gameId
    ) {
        this.hockeyTeamService.deleteHockeyGameById(gameId);
        return ResponseEntity.noContent().build();
    }
}
