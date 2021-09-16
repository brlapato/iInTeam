package com.hockey43.iInTeam.webResources;

import com.hockey43.iInTeam.dataObjects.Media;
import com.hockey43.iInTeam.dataObjects.Player;
import com.hockey43.iInTeam.dataObjects.PlayerSummary;
import com.hockey43.iInTeam.dataServices.IPlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PlayerResource {

    @Autowired
    private IPlayerService playerService;

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

    @PutMapping("players/{playerId}")
    public ResponseEntity<Player> updatePlayer (
            @PathVariable long playerId,
            @RequestBody Player player
    ) {
        return null;
    }


}
