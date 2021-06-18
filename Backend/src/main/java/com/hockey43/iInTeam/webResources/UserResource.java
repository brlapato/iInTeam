package com.hockey43.iInTeam.webResources;

import com.hockey43.iInTeam.dataObjects.UserInfo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserResource {

    @GetMapping("/users")
    public UserInfo getUser(Principal principal) {
        Authentication authentication = (Authentication) principal;
        Jwt user = (Jwt)authentication.getPrincipal();

        UserInfo userInfo = new UserInfo();
        userInfo.setFirstName("Test");
        userInfo.setLastName("Name");
        return userInfo;
    }
}
