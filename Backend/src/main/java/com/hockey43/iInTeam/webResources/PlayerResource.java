package com.hockey43.iInTeam.webResources;

import com.hockey43.iInTeam.dataObjects.*;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGameSheet;
import com.hockey43.iInTeam.dataServices.IPlayerService;
import com.hockey43.iInTeam.dataServices.hockey.HockeyGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
public class PlayerResource {

    @Autowired
    private IPlayerService playerService;

    @Autowired
    private HockeyGameService hockeyGameService;


    @PreAuthorize("@authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @GetMapping("/players/{playerId}")
    public PlayerSummary getPlayer(Principal principal, @PathVariable long playerId) {
        PlayerSummary summary = new PlayerSummary(this.playerService.getPlayer(playerId));
        summary.setIncludeHockey(true);
        return summary;
    }

    @PreAuthorize("@authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @GetMapping(value = "/players/{playerId}/profileImage")
    public MediaEntry getPlayerProfileImage(Principal principal, @PathVariable long playerId) {
        MediaEntry playerImage = this.playerService.getProfileImage(playerId);
        return playerImage;
    }

    @PreAuthorize("@authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @PutMapping(value = "/players/{playerId}/profileImage")
    public ResponseEntity<MediaEntry> setPlayerProfileImage(Principal principal, @PathVariable long playerId, @RequestBody MediaEntry image) {
        this.playerService.saveProfileImage(playerId, image);
        return new ResponseEntity<MediaEntry>(image, HttpStatus.OK);
    }

    @PreAuthorize("@authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @DeleteMapping(value = "/players/{playerId}/profileImage")
    public ResponseEntity<MediaEntry> removePlayerProfileImage(Principal principal, @PathVariable long playerId) {
        this.playerService.removeProfileImage(playerId);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("@authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @GetMapping(value = "/players/{playerId}/recentGames")
    public List<TeamEventSheet> getRecentGames(Principal principal, @PathVariable long playerId, @RequestParam(defaultValue = "5") Integer numGames) {
        List<TeamEvent> hockeyGames = this.hockeyGameService.getRecentGames(playerId, numGames);

        List<TeamEventSheet> gameSummaries = new ArrayList<TeamEventSheet>();
        hockeyGames.forEach((game)->gameSummaries.add(game.getTeamEventSheet()));
        return gameSummaries;
    }

    @PreAuthorize("@authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @GetMapping(value = "/players/{playerId}/upcomingGames")
    public List<TeamEventSheet> getUpcomingGames(Principal principal, @PathVariable long playerId, @RequestParam(defaultValue = "5") Integer numGames) {
        List<TeamEvent> hockeyGames = this.hockeyGameService.getUpcomingGames(playerId, numGames);

        List<TeamEventSheet> gameSummaries = new ArrayList<TeamEventSheet>();
        hockeyGames.forEach((game)->gameSummaries.add(game.getTeamEventSheet()));
        return gameSummaries;
    }

    @PostMapping("/players")
    public ResponseEntity<PlayerSummary> createPlayer (
            Principal principal,
            @RequestBody PlayerSummary player ) {
        Authentication authentication = (Authentication) principal;

        Player newPlayer = new Player();
        newPlayer.mergePlayerSummary(player);
        newPlayer.setUserId(principal.getName());

        this.playerService.savePlayer(newPlayer);
        player.setPlayerId(newPlayer.getPlayerId());

        return new ResponseEntity<PlayerSummary>(player, HttpStatus.OK);

    }



    @PreAuthorize("@authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @PutMapping("players/{playerId}")
    public ResponseEntity<PlayerSummary> updatePlayer (
            Principal principal,
            @PathVariable long playerId,
            @RequestBody PlayerSummary player
    ) {
        Player basePlayer = this.playerService.getPlayer(player.getPlayerId());
        basePlayer.mergePlayerSummary(player);

        this.playerService.savePlayer(basePlayer);

        return new ResponseEntity<PlayerSummary>(player, HttpStatus.OK);
    }


}
