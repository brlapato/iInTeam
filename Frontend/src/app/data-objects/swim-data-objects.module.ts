import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Organization, Team } from './data-objects.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SwimDataObjectsModule { }



export class SwimTeam extends Team{
  constructor(
    public teamId: number,
    public org: Organization,
    public name: string,
    public headCoach: string,
    public assistantCoach1: string,
    public assistantCoach2: string,
    public active: boolean,
    public startDate: Date,
    public season: string,
    public homePool: string,
    public hometown: string,
    public clubExcellenceLevel: string,
    public clubRecognitionLevel: number
  ) {super(teamId, "Swim", org, name,season, active,startDate);}

  public static getDefault() {
    return new SwimTeam(
      -1, new Organization("",""),
      "","","","",false,new Date(), "","","","",0
    );
  }

  public static copy(copyTeam:SwimTeam) : SwimTeam {
    return new SwimTeam(
      copyTeam.teamId, copyTeam.org, copyTeam.name, copyTeam.headCoach, copyTeam.assistantCoach1, copyTeam.assistantCoach2,
      copyTeam.active, copyTeam.startDate, copyTeam.season, copyTeam.homePool, copyTeam.hometown,
      copyTeam.clubExcellenceLevel, copyTeam.clubRecognitionLevel
    );
  }

  public static copyTo(copyTeam:SwimTeam, targetTeam:SwimTeam) : SwimTeam {
    
    targetTeam.teamId = copyTeam.teamId;
    targetTeam.org = copyTeam.org;
    targetTeam.name = copyTeam.name;
    targetTeam.headCoach = copyTeam.headCoach;
    targetTeam.assistantCoach1 = copyTeam.assistantCoach1;
    targetTeam.assistantCoach2 = copyTeam.assistantCoach2;
    targetTeam.active = copyTeam.active;
    targetTeam.startDate = copyTeam.startDate;
    targetTeam.sport = copyTeam.sport;

    targetTeam.season = copyTeam.season;
    targetTeam.homePool  = copyTeam.homePool;
    targetTeam.hometown = copyTeam.hometown;
    targetTeam.clubExcellenceLevel = copyTeam.clubExcellenceLevel;
    targetTeam.clubRecognitionLevel = copyTeam.clubRecognitionLevel;
    
    return targetTeam;
  }
}

export class SwimMeet {
  constructor(
    public teamId: number,
    public meetId: number,
    public name: string,
    public startDateTime: Date,
    public endDateTime: Date,
    public opponent1: string,
    public opponent2: string,
    public location: string,
    public locationDetail: string,
    public preMeetNotes: string,
    public postMeetNotes: string
  ) { }

  public static getDetault() {
    return new SwimMeet(-1, -1, "", new Date(), new Date(), "", "", "", "", "","");
  }



  public static copyTo(source:SwimMeet, target: SwimMeet) {
      target.teamId = source.teamId;
      target.meetId = source.meetId;
      target.name = source.name;
      target.startDateTime = source.startDateTime;
      target.endDateTime = source.endDateTime;
      target.opponent1 = source.opponent1;
      target.opponent2 = source.opponent2;
      target.location = source.location;
      target.locationDetail = source.locationDetail;
      target.preMeetNotes = source.preMeetNotes;
      target.postMeetNotes = source.postMeetNotes;

  }
}

export class SwimEvent {
  constructor(


    public swimEventId: number,
    public eventNumber: string,
    public heat: string,
    public swimMeetName: string,
    public swimMeetId: number,
    public legDistance: number | null,
    public totalDistance: number| null,
    public relayNumber: number| null,
    public relayLeg: number| null,
    public eventType: string,
    public stroke: string,
    public splitTimeSec: number| null,
    public totalTimeSec: number| null,
    public seedTimeSec: number| null,
    public place: number| null,
    public meetPoints: number| null,
    public disqualification: boolean,
    public scratch: boolean,
    public notes: string
    
  ) { }

  public static getDefault() {
    return new SwimEvent(-1, "", "", "", -1, null, null, null, null,"","",null,null,null,null,null,false, false,"");
  }



  public static copyTo(source:SwimEvent, target: SwimEvent) {
      //target.teamId = source.teamId;
      target.swimEventId = source.swimEventId;
      target.eventNumber = source.eventNumber;
      target.heat = source.heat;
      target.swimMeetName = source.swimMeetName;
      target.swimMeetId = source.swimMeetId;
      target.legDistance = source.legDistance;
      target.totalDistance = source.totalDistance;
      target.relayNumber = source.relayNumber;
      target.relayLeg = source.relayLeg;
      target.eventType = source.eventType;
      target.stroke = source.stroke;
      target.splitTimeSec = source.splitTimeSec;
      target.totalTimeSec = source.totalTimeSec;
      target.seedTimeSec = source.seedTimeSec;
      target.place = source.place;
      target.meetPoints = source.meetPoints;
      target.disqualification = source.disqualification;
      target.scratch = source.scratch;
      target.notes = source.notes;
      

  }
}
