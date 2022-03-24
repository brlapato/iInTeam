package com.hockey43.iInTeam.webResources.sports;

import com.hockey43.iInTeam.dataObjects.RecordEntry;
import com.hockey43.iInTeam.dataObjects.hockey.*;
import com.hockey43.iInTeam.dataServices.PlayerService;
import com.hockey43.iInTeam.dataServices.TeamService;
import com.hockey43.iInTeam.dataServices.hockey.HockeyTeamService;
import com.hockey43.iInTeam.exceptions.GameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.ProjectedPayload;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
public class HockeyTeamResource {

    @Autowired
    private HockeyTeamService hockeyTeamService;
    @Autowired
    private TeamService teamService;
    @Autowired
    private PlayerService playerService;

    @PreAuthorize("@authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @GetMapping("/players/{playerId}/HockeyTeams")
    public List<HockeyTeamSummary> getHockeyTeamSummaries(Principal principal,
                                                          @PathVariable long playerId,
                                                          @RequestParam(name="active", required = false, defaultValue = "false") boolean activeOnly) {
        return this.hockeyTeamService.getHockeyTeamSummaries(playerId, activeOnly);
    }

    @PreAuthorize("@authenticator.userCanAccessTeam(#principal.getName(), #teamId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @GetMapping("/players/{playerId}/HockeyTeams/{teamId}/teamSummary")
    public HockeyTeamSummary getHockeyTeamSummary(Principal principal,
                                                  @PathVariable long playerId,
                                                  @PathVariable long teamId) throws GameNotFoundException {
        return this.hockeyTeamService.getHockeyTeamSummary(teamId);
    }

    @PreAuthorize("@authenticator.userCanAccessTeam(#principal.getName(), #teamId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @PutMapping("/players/{playerId}/HockeyTeams/{teamId}")
    public ResponseEntity<HockeyTeamSummary> updateHockeyTeam(
            Principal principal,
            @PathVariable long playerId,
            @PathVariable long teamId,
            @RequestBody HockeyTeamSummary teamSummary
    ) {
        HockeyTeam targetTeam = this.hockeyTeamService.getHockeyTeam(teamId);

        // Merge sheet with team
        targetTeam.mergeHockeyTeamSummary(teamSummary);

        // Save team
        this.hockeyTeamService.saveHockeyTeam(targetTeam);

        HockeyTeamSummary updatedTeamSummary = teamSummary;

        return new ResponseEntity<HockeyTeamSummary>(updatedTeamSummary, HttpStatus.OK);
    }

    @PreAuthorize("@authenticator.userCanAccessTeam(#principal.getName(), #teamId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @PostMapping("/players/{playerId}/HockeyTeams/{teamId}/games/")
    public ResponseEntity<HockeyGameSheet> createHockeyGame(
            Principal principal,
            @PathVariable long playerId,
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

    @PreAuthorize("@authenticator.userCanAccessTeamEvent(#principal.getName(), #gameId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @DeleteMapping("/players/{playerId}/HockeyTeams/{teamId}/games/{gameId}")
    public ResponseEntity<HockeyGameSheet> deleteHockeyGame(
            Principal principal,
            @PathVariable long playerId,
            @PathVariable long teamId,
            @PathVariable long gameId
    ) {
        this.hockeyTeamService.deleteHockeyGameById(gameId);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("@authenticator.userCanAccessTeam(#principal.getName(), #teamId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @GetMapping("/players/{playerId}/HockeyTeams/{teamId}/teamRecord")
    public List<RecordEntry> getHockeyTeamRecord(Principal principal,
                                                 @PathVariable long playerId,
                                                 @PathVariable long teamId) {
        return this.hockeyTeamService.getTeamRecord(teamId);
    }

    @PreAuthorize("@authenticator.userCanAccessTeam(#principal.getName(), #teamId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @GetMapping("/players/{playerId}/HockeyTeams/{teamId}/playerStats")
    public List<HockeyPlayerStatsEntry> getHockeyTeamPlayerStats(Principal principal,
                                                                 @PathVariable long playerId,
                                                                 @PathVariable long teamId) {
        return this.hockeyTeamService.getPlayerStatsForTeam(teamId);
    }

    @PreAuthorize("@authenticator.userCanAccessTeam(#principal.getName(), #teamId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @GetMapping("/players/{playerId}/HockeyTeams/{teamId}/games")
    public List<HockeyGameSheet> getHockeyTeamGames(Principal principal,
                                                    @PathVariable long playerId,
                                                    @PathVariable long teamId) {
        List<HockeyGame> games = this.hockeyTeamService.getGames(teamId);

        List<HockeyGameSheet> gameSheets = new ArrayList<HockeyGameSheet>();
        games.forEach((game)->gameSheets.add(new HockeyGameSheet(game)));
        return gameSheets;
    }

    @PreAuthorize("@authenticator.userCanAccessTeamEvent(#principal.getName(), #gameId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @GetMapping("/players/{playerId}/HockeyTeams/{teamId}/games/{gameId}")
    public HockeyGameSheet getHockeyTeamGame(Principal principal, @PathVariable long playerId, @PathVariable long teamId, @PathVariable long gameId) {
        return new HockeyGameSheet(this.hockeyTeamService.getHockeyGame(teamId, gameId));
    }

    @PreAuthorize("@authenticator.userCanAccessTeamEvent(#principal.getName(), #gameId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @PutMapping("/players/{playerId}/HockeyTeams/{teamId}/games/{gameId}")
    public ResponseEntity<HockeyGameSheet> updateHockeyGame(
            Principal principal,
            @PathVariable long playerId,
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


}
