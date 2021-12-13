package com.hockey43.iInTeam.dataObjects.workouts;

import com.hockey43.iInTeam.dataObjects.Player;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="WorkoutInstance")
public class WorkoutInstance {

    @Id
    @Column(name="WorkoutInstanceId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long workoutInstanceId;

    @Column(name="date", columnDefinition = "DATETIME", nullable = false)
    private LocalDate date;

    @ManyToOne()
    @JoinColumn(name="WorkoutId", nullable = false)
    private Workout workout;

    @Column(name="isCompleted", nullable = false)
    private boolean isCompleted;

    @ManyToOne()
    @JoinColumn(name="PlayerId", nullable = true)
    private Player player;

    @Column(name="notes", nullable = true, length = 5000)
    private String notes;

}
