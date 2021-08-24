package com.hockey43.iInTeam.dataObjects;

import com.hockey43.iInTeam.dataObjects.hockey.HockeyAttributes;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name="Player")
public class Player {

    @Id
    @Column(name="PlayerId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playerId;

    @Column(name="UserId", nullable = false)
    private String userId;

    @Column(name="FirstName", nullable = false)
    private String firstName;

    @Column(name="LastName", nullable = false)
    private String lastName;

    @Column(name="Nickname")
    private String nickName;

    @Column(name="HeightFeet")
    private int heightFeet;

    @Column(name="HeightInches")
    private int heightInches;

    @Column(name="Weight")
    private int weight;

    @Column(name="IncludeHockey")
    private boolean includeHockey;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "HockeyAttributeId", referencedColumnName = "HockeyAttributeId")
    private HockeyAttributes hockeyAttributes = new HockeyAttributes();

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
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

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public int getHeightFeet() {
        return heightFeet;
    }

    public void setHeightFeet(int heightFeet) {
        this.heightFeet = heightFeet;
    }

    public int getHeightInches() {
        return heightInches;
    }

    public void setHeightInches(int heightInches) {
        this.heightInches = heightInches;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public boolean isIncludeHockey() {
        return includeHockey;
    }

    public void setIncludeHockey(boolean includeHockey) {
        this.includeHockey = includeHockey;
    }

    public HockeyAttributes getHockeyAttributes() {
        return hockeyAttributes;
    }

    public void setHockeyAttributes(HockeyAttributes hockeyAttributes) {
        this.hockeyAttributes = hockeyAttributes;
    }

    @JsonIgnore
    public Media getPlayerPicture() {
        return playerPicture;
    }

    public void setPlayerPicture(Media playerPicture) {
        this.playerPicture = playerPicture;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
