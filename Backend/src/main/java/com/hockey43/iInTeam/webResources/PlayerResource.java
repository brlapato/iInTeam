package com.hockey43.iInTeam.webResources;

import com.hockey43.iInTeam.dataObjects.*;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGameSheet;
import com.hockey43.iInTeam.dataServices.IPlayerService;
import com.hockey43.iInTeam.dataServices.hockey.HockeyGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
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



    @GetMapping("/players/{playerId}")
    public PlayerSummary getPlayer(@PathVariable long playerId) {
        PlayerSummary summary = new PlayerSummary(this.playerService.getPlayer(playerId));
        summary.setIncludeHockey(true);
        return summary;
    }

    @GetMapping(value = "/players/{playerId}/profileImage")
    public Media getPlayerProfileImage(@PathVariable long playerId) {
        Media playerImage = this.playerService.getProfileImage(playerId);
        return playerImage;
    }

    @PutMapping(value = "/players/{playerId}/profileImage")
    public ResponseEntity<Media> setPlayerProfileImage(@PathVariable long playerId, @RequestBody Media image) {
        this.playerService.saveProfileImage(playerId, image);
        return new ResponseEntity<Media>(image, HttpStatus.OK);
    }

    @DeleteMapping(value = "/players/{playerId}/profileImage")
    public ResponseEntity<Media> removePlayerProfileImage(@PathVariable long playerId) {
        this.playerService.removeProfileImage(playerId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/players/{playerId}/recentGames")
    public List<TeamEventSheet> getRecentGames(@PathVariable long playerId, @RequestParam(defaultValue = "5") Integer numGames) {
        List<TeamEvent> hockeyGames = this.hockeyGameService.getRecentGames(playerId, numGames);

        List<TeamEventSheet> gameSummaries = new ArrayList<TeamEventSheet>();
        hockeyGames.forEach((game)->gameSummaries.add(game.getTeamEventSheet()));
        return gameSummaries;
    }

    @GetMapping(value = "/players/{playerId}/upcomingGames")
    public List<TeamEventSheet> getUpcomingGames(@PathVariable long playerId, @RequestParam(defaultValue = "5") Integer numGames) {
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




    @PutMapping("players/{playerId}")
    public ResponseEntity<PlayerSummary> updatePlayer (
            @PathVariable long playerId,
            @RequestBody PlayerSummary player
    ) {
        Player basePlayer = this.playerService.getPlayer(player.getPlayerId());
        basePlayer.mergePlayerSummary(player);

        this.playerService.savePlayer(basePlayer);

        return new ResponseEntity<PlayerSummary>(player, HttpStatus.OK);
    }


}
