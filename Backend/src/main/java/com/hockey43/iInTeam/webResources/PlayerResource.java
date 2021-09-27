package com.hockey43.iInTeam.webResources;

import com.hockey43.iInTeam.dataObjects.*;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGameSheet;
import com.hockey43.iInTeam.dataServices.IPlayerService;
import com.hockey43.iInTeam.dataServices.hockey.HockeyGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

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
        return new PlayerSummary(this.playerService.getPlayer(playerId));

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



    @PutMapping("players/{playerId}")
    public ResponseEntity<Player> updatePlayer (
            @PathVariable long playerId,
            @RequestBody Player player
    ) {
        return null;
    }


}
