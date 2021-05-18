package com.hockey43.iInTeam.webResources;

import com.hockey43.iInTeam.dataObjects.Player;
import com.hockey43.iInTeam.dataServices.IPlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PlayerResource {

    @Autowired
    private IPlayerService playerService;

    @GetMapping("/players/{playerId}")
    public Player getPlayer(@PathVariable long playerId) {
        return this.playerService.getPlayer(playerId);
    }

    @PutMapping("players/{playerId}")
    public ResponseEntity<Player> updatePlayer (
            @PathVariable long playerId,
            @RequestBody Player player
    ) {
        return null;
    }
}
