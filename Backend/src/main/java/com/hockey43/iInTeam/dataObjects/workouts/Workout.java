package com.hockey43.iInTeam.dataObjects.workouts;

import com.hockey43.iInTeam.dataObjects.Player;

import javax.persistence.*;

@Entity
@Table(name="Workout")
public class Workout {

    @Id
    @Column(name="WorkoutId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long workoutId;

    @Column(name="Name", nullable = false, length = 150)
    private String name;

    @Column(name="category", nullable = false, length = 150)
    private String category;

    @Column(name="description", nullable = false, length = 5000)
    private String description;

    @ManyToOne()
    @JoinColumn(name="PlayerId", nullable = false)
    private Player player;

    @Column(name="isActive", nullable = false)
    private boolean isActive;
}
