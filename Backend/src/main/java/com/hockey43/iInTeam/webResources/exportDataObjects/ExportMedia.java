package com.hockey43.iInTeam.webResources.exportDataObjects;

import com.hockey43.iInTeam.dataObjects.Media;

import java.util.Base64;

public class ExportMedia {
    private Media media;

    public ExportMedia(Media media) {
        this.media = media;
    }

    public long getMediaId() {
        return media.getMediaId();
    }

    public String getDescription() {
        return media.getDescription();
    }

    public String getMediaType() {
        return media.getMediaType();
    }

    public String getFile() {
        //return Base64.getMimeEncoder().encodeToString(media.getFile());
        return media.getFile();
    }
}
