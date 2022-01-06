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

import java.security.Principal;
import java.util.ArrayList;
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
        String mediaTypeValue = MediaType.IMAGE_PNG_VALUE;
        if ( playerImage == null) {
            // TODO: load default image
        } else {
            mediaTypeValue = playerImage.getMediaType();
        }

        return playerImage;
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

        return new ResponseEntity<PlayerSummary>(player, HttpStatus.OK);

    }



    @PutMapping("players/{playerId}")
    public ResponseEntity<Player> updatePlayer (
            @PathVariable long playerId,
            @RequestBody Player player
    ) {
        return null;
    }


}
