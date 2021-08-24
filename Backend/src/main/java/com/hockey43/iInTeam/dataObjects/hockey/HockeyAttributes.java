package com.hockey43.iInTeam.dataObjects.hockey;

import com.hockey43.iInTeam.dataObjects.Position;
import com.hockey43.iInTeam.dataObjects.Shot;

import javax.persistence.*;

@Entity
@Table(name="HockeyAttributes")
public class HockeyAttributes {

    @Id
    @Column(name="HockeyAttributeId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long hockeyAttributeId;

    @Column(name="Position")
    @Enumerated(EnumType.STRING)
    private Position position;

    @Column(name="Shot")
    @Enumerated(EnumType.STRING)
    private Shot shot;

    public long getHockeyAttributeId() {
        return hockeyAttributeId;
    }

    public void setHockeyAttributeId(long hockeyAttributeId) {
        hockeyAttributeId = hockeyAttributeId;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public Shot getShot() {
        return shot;
    }

    public void setShot(Shot shot) {
        this.shot = shot;
    }
}
