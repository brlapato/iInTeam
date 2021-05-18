package com.hockey43.iInTeam.dataObjects;


import javax.persistence.*;
import java.sql.Blob;

@Entity
public class Media {

    @Id
    @Column(name="MediaId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mediaId;

    @Column(name="Description")
    private String description;

    @Column(name="File")
    private byte[] file;

    @Column(name="OwnerId")
    private long ownerId;
}
