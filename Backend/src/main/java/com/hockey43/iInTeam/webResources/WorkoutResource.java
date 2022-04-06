package com.hockey43.iInTeam.webResources;

import com.hockey43.iInTeam.dataObjects.workouts.Workout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class WorkoutResource {

    @Autowired
    private WorkoutResource workoutResource;

    @PreAuthorize("@authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    public List<Workout> getWorkouts(@PathVariable long playerId,
                                     @RequestParam(name="public", required = false, defaultValue = "false") boolean includePublic) {
        return this.workoutResource.getWorkouts(playerId, includePublic);
    }
}
