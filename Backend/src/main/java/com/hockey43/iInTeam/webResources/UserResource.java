package com.hockey43.iInTeam.webResources;

import com.hockey43.iInTeam.dataObjects.Player;
import com.hockey43.iInTeam.dataObjects.UserInfo;
import com.hockey43.iInTeam.dataServices.IPlayerService;
import com.hockey43.iInTeam.dataServices.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class UserResource {

    private IPlayerService playerService;

    @Autowired
    public UserResource(IPlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/users")
    public UserInfo getUser(Principal principal) {
        Authentication authentication = (Authentication) principal;
        Jwt user = (Jwt)authentication.getPrincipal();

        Player player = this.playerService.getPlayer(principal.getName());
        UserInfo userInfo = new UserInfo();
        userInfo.setFirstName(player.getFirstName());
        userInfo.setLastName(player.getLastName());
        userInfo.setPlayerId(player.getPlayerId());
        return userInfo;
    }
}
