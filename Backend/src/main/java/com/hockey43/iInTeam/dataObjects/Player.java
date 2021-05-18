package com.hockey43.iInTeam.dataObjects;

import javax.persistence.*;

@Entity
@Table(name="Player")
public class Player {

    @Id
    @Column(name="PlayerId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playerId;

    @Column(name="FirstName")
    private String firstName;

    @Column(name="LastName")
    private String lastName;

    @Column(name="Position")
    @Enumerated(EnumType.STRING)
    private Position position;

    @Column(name="Shot")
    @Enumerated(EnumType.STRING)
    private Shot shot;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="PlayerPictureMediaId", nullable = true)
    private Media playerPicture;


    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


}
