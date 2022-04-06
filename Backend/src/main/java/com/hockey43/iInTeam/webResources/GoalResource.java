package com.hockey43.iInTeam.webResources;

import com.hockey43.iInTeam.dataObjects.PersonalGoal;
import com.hockey43.iInTeam.dataObjects.PlayerSummary;
import com.hockey43.iInTeam.dataServices.GoalsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
public class GoalResource {

    @Autowired
    private GoalsService goalsService;

    @PreAuthorize("@authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @GetMapping("/players/{playerId}/goals")
    public List<PersonalGoal> getPlayerGoals(Principal principal,
                                             @PathVariable long playerId,
                                             @RequestParam(name="active", required = false, defaultValue = "false") boolean activeOnly) {
        return this.goalsService.getGoalsForPlayer(playerId, activeOnly);

    }
}
