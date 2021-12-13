package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.workouts.Workout;
import com.hockey43.iInTeam.dataObjects.workouts.WorkoutInstance;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {

    public List<Workout> getAvailableWorkouts(long playerId, boolean includePublic) {
        return null;
    }

    public Workout getWorkoutById(long workoutId) {
        return null;
    }

    public void SaveWorkout(Workout workout) {

    }

    public List<WorkoutInstance> GetWorkouts(long playerId) {
        return null;
    }

    public void SaveWorkoutInstance(WorkoutInstance workoutInstance) {

    }
}
