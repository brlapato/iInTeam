package com.hockey43.iInTeam.dataObjects;

import javax.persistence.*;

public class MediaEntry {

    private Long mediaId;
    private String description;
    private String file;
    private String mediaType;

    public MediaEntry() { }

    public MediaEntry(Media media) {
        super();

        this.mediaId = media.getMediaId();
        this.description = media.getDescription();
        this.mediaType = media.getMediaType();
        this.file = media.getFile();
    }

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
