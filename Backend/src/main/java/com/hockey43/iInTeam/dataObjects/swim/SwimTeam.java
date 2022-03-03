package com.hockey43.iInTeam.dataObjects.swim;

import com.hockey43.iInTeam.dataObjects.Sport;
import com.hockey43.iInTeam.dataObjects.Team;
import com.hockey43.iInTeam.dataObjects.TeamSummary;
import org.hibernate.type.descriptor.sql.TinyIntTypeDescriptor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table(name="SwimTeam")
@PrimaryKeyJoinColumn(name = "TeamId")
public class SwimTeam extends Team {

    @Column(name="HomePool", nullable = true, length = 255)
    private String homePool;

    @Column(name="Hometown", nullable = true, length = 255)
    private String hometown;

    @Column(name="ClubExcellenceLevel", nullable = true, length = 255)
    private String clubExcellenceLevel;

    @Column(name="ClubRecognitionLevel", nullable = true, columnDefinition = "TINYINT")
    private Short clubRecognitionLevel;

    @Column(name="HeadCoach", nullable = true, length = 255)
    private String headCoach;

    @Column(name="AssistantCoach1", nullable = true, length = 255)
    private String assistantCoach1;

    @Column(name="AssistantCoach2", nullable = true, length = 255)
    private String assistantCoach2;

    @Override
    public Sport getSport() {
        return Sport.Swim;
    }

    @Override
    public TeamSummary getTeamSummary() {
        SwimTeamSummary teamSummary = new SwimTeamSummary(this);
        teamSummary.setHometown(this.getHometown());
        teamSummary.setHomePool(this.getHomePool());
        teamSummary.setHeadCoach(this.getHeadCoach());
        teamSummary.setAssistantCoach1(this.getAssistantCoach1());
        teamSummary.setAssistantCoach2(this.getAssistantCoach2());
        teamSummary.setClubExcellenceLevel(this.getClubExcellenceLevel());
        teamSummary.setClubRecognitionLevel(this.getClubRecognitionLevel());
        return teamSummary;
    }

    public void mergeSwimTeamSummary(SwimTeamSummary teamSummary) {
        this.setAssistantCoach1(teamSummary.getAssistantCoach1());
        this.setAssistantCoach2(teamSummary.getAssistantCoach2());
        this.setHeadCoach(teamSummary.getHeadCoach());
        this.setClubExcellenceLevel(teamSummary.getClubExcellenceLevel());
        this.setClubRecognitionLevel(teamSummary.getClubRecognitionLevel());
        this.setHometown(teamSummary.getHometown());
        this.setHomePool(teamSummary.getHomePool());
        this.setActive(teamSummary.getActive());
    }


    public String getHomePool() {
        return homePool;
    }

    public void setHomePool(String homePool) {
        this.homePool = homePool;
    }

    public String getHometown() {
        return hometown;
    }

    public void setHometown(String hometown) {
        this.hometown = hometown;
    }

    public String getClubExcellenceLevel() {
        return clubExcellenceLevel;
    }

    public void setClubExcellenceLevel(String clubExcellenceLevel) {
        this.clubExcellenceLevel = clubExcellenceLevel;
    }

    public Short getClubRecognitionLevel() {
        return clubRecognitionLevel;
    }

    public void setClubRecognitionLevel(Short clubRecognitionLevel) {
        this.clubRecognitionLevel = clubRecognitionLevel;
    }

    public String getHeadCoach() {
        return headCoach;
    }

    public void setHeadCoach(String headCoach) {
        this.headCoach = headCoach;
    }

    public String getAssistantCoach1() {
        return assistantCoach1;
    }

    public void setAssistantCoach1(String assistantCoach1) {
        this.assistantCoach1 = assistantCoach1;
    }

    public String getAssistantCoach2() {
        return assistantCoach2;
    }

    public void setAssistantCoach2(String assistantCoach2) {
        this.assistantCoach2 = assistantCoach2;
    }
}
