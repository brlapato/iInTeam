package com.hockey43.iInTeam.dataObjects;


import javax.persistence.*;
import java.sql.Blob;

@Entity
@Table(name="Media")
public class Media {

    @Id
    @Column(name="MediaId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mediaId;

    @Column(name="Description", length = 500)
    private String description;

    @Lob
    @Column(name="File")
    private String file;

    @Column(name="MediaType", length = 15)
    private String mediaType;

    public Long getMediaId() {
        return mediaId;
    }

    public void setMediaId(Long mediaId) {
        this.mediaId = mediaId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }
}
