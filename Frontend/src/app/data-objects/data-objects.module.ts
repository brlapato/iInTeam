import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DataObjectsModule {

 }


 export class Player {
  constructor (
    public playerId: number,
    public firstName: string,
    public lastName: string,
    public nickName: string,
    public heightFeet: number,
    public heightInches: number,
    public weight: number,
    public includeHockey: boolean,
    public hockeyAttributes?: HockeyAttributes
  ) {}

  public static getDefault() {
    let player = new Player(-1, "","","",0,0,0,false);
    player.hockeyAttributes = new HockeyAttributes();
    return player;
  }
}

export class HockeyAttributes {
  constructor(
    public position?: string,
    public shot?: string
  ){}
}
  
 export class UserInfo {
    constructor (
      public userName: string,
      public firstName: string,
      public lastName: string,
      public email: string,
      public playerId: number
    ) {}
  }  

  export class Media {
    constructor(
      public mediaId: number,
      public description: string,
      public file: string,
      public mediaType: string
    ) {}
  }

  export class Organization {
    constructor(
      public name: string,
      public city: string
    ) {}
  }

  export class WinRecord {
    constructor(
      public wins: number,
      public losses: number,
      public ties: number,
      public overTimeWins: number,
      public overTimeLosses: number,
      public goalsFor: number,
      public goalsAgainst: number,
      public goalDifferential: number
    ) {}

    public static getDisplayString(winRecord: WinRecord):string {
      return `${winRecord.wins}-${winRecord.losses + winRecord.overTimeLosses}-${winRecord.ties}`;
    }
  }

  export class HockeyPlayerStats {
    constructor(
      public gamesPlayed: number,
      public goals: number,
      public assists: number,
      public points: number,
      public shots: number,
      public penaltyMin: number
    ) {}

    public static getDefault() {
      return new HockeyPlayerStats(0,0,0,0,0,0);
    }
  }

  export class HockeyPlayerStatsEntry {
    constructor (
      public description:string,
      public hockeyPlayerStats: HockeyPlayerStats
    ) {}

    public static getDefault() {
      return new HockeyPlayerStatsEntry("", HockeyPlayerStats.getDefault());
    }
  }

  export class WinRecordEntry {
    constructor (
      public description: string,
      public winRecord: WinRecord
    ) {}

  }

  export class Team {
    constructor(
      public teamId: number,
      public sport: string,
      public org: Organization,
      public name: string,
      public season: string,
      public active: boolean,
      public startDate: Date
    ) {}

    public static getDefault() {
      return new Team(
        -1,
        "",
        new Organization("",""),
        "",
        "",
        false,
        new Date());
    }
  }

  export class HockeyTeam extends Team{
    constructor(
      public teamId: number,
      public org: Organization,
      public name: string,
      public headCoach: string,
      public assistantCoach1: string,
      public assistantCoach2: string,
      public manager: string,
      public active: boolean,
      public startDate: Date,
      public ageClass: string,
      public playerNumber: number,
      public regularPosition: string,
      public level: string,
      public season: string,
      public nextGame: HockeyGame
    ) {super(teamId, "Hockey", org, name,season, active,startDate);}

    public static getDefault() {
      return new HockeyTeam(
        -1,
        new Organization("",""),
        "","","","","",
        false,
        new Date(),
        "",
        -1,
        "",
        "",
        "",
        HockeyGame.getDefault());
    }

    public static copy(copyTeam:HockeyTeam) : HockeyTeam {
      return new HockeyTeam(
        copyTeam.teamId, copyTeam.org, copyTeam.name, copyTeam.headCoach, copyTeam.assistantCoach1, copyTeam.assistantCoach2,
        copyTeam.manager, copyTeam.active, copyTeam.startDate, copyTeam.ageClass, copyTeam.playerNumber, copyTeam.regularPosition,
        copyTeam.level, copyTeam.season,  copyTeam.nextGame
      );
    }

    public static copyTo(copyTeam:HockeyTeam, targetTeam:HockeyTeam) : HockeyTeam {
      
      targetTeam.teamId = copyTeam.teamId;
      targetTeam.org = copyTeam.org;
      targetTeam.name = copyTeam.name;
      targetTeam.headCoach = copyTeam.headCoach;
      targetTeam.assistantCoach1 = copyTeam.assistantCoach1;
      targetTeam.assistantCoach2 = copyTeam.assistantCoach2;
      targetTeam.manager = copyTeam.manager;
      targetTeam.active = copyTeam.active;
      targetTeam.startDate = copyTeam.startDate;
      targetTeam.ageClass = copyTeam.ageClass;
      targetTeam.playerNumber = copyTeam.playerNumber;
      targetTeam.regularPosition = copyTeam.regularPosition;
      targetTeam.level = copyTeam.level;
      targetTeam.nextGame = copyTeam.nextGame;
      targetTeam.season = copyTeam.season;
      
      return targetTeam;
    }
  }

  export class HockeyGame {
    constructor(
      public gameId: number,
      public teamId: number,
      public teamName: string,
      public opponentTeamName: string,
      public opponentTeamNameMod: string,
      public startDateTime: Date,
      public location: string,
      public locationDetail: string,
      public side: string,
      public league: string,
      public gameType: string,
      public result: string,
      public teamScore: number| undefined,
      public opponentScore: number| undefined,
      public numberPeriods: number,
      public periodLength: number,
      public isPlayoff: boolean,
      public isOvertime: boolean,
      public goals: number | undefined,
      public assists: number | undefined,
      public shots: number | undefined,
      public penaltyMin: number | undefined,
      public preGameNotes: string,
      public postGameNotes: string
    ) {}

    public static getDefault() {
      return new HockeyGame(-1,-1,"", "", "", new Date(), "", "","Home","","","Undetermined",undefined,undefined,3,20,false,false,undefined,undefined,undefined,undefined,"","");
    }
  }

  export class HockeyTeamSummary {
    constructor(
      public teamName: string,
      public regularPosition: string,
      public playerNumber: number,
      public record: WinRecord,
      public goals: number,
      public assists: number,
      public points: number,
      public shots: number,
      public penaltyMin: number,
      public nextGame: HockeyGame
    ) {}

    public static getDefault() {
      return new HockeyTeamSummary(
        "", "", -1,
        new WinRecord(0,0,0,0,0,0,0,0),
        0,0,0,0,0, 
        HockeyGame.getDefault()
      );
    }
  }

  export class PersonalGoal {
    constructor (
      public goalId: number,
      public name: string,
      public sport: string,
      public description: string,
      public plan: string,
      public timeFrame: string,
      public isComplete: boolean
    ){}

    public static getDefault() {
      return new PersonalGoal (
          -1,
          "",
          "",
          "",
          "",
          "",
          false
      );
    }
  }

  export class Clinic {
    constructor(
      public clinicId: number,
      public org: Organization,
      public name: string,
      public nameDetail: string,
      public description: string,
      public sport: string,
      public startDateTime: Date,
      public endDateTime: Date,
      public location: string,
      public locationDetail: string,
      public headCoach: string,
      public assistantCoach1: string,
      public assistantCoach2: string,
      public assistantCoach3: string,
      public assistantCoach4: string,
      public preClinicNotes: string,
      public postClinicNotes: string
    ) {}

    public static getDefault() {
      return new Clinic (-1, 
        new Organization("",""),
        "","","","",new Date(), new Date(), 
        "","","","","","","","","")
    }

    public static copyTo(copyClinic:Clinic, targetClinic:Clinic) : Clinic {
      
      targetClinic.clinicId = copyClinic.clinicId;
      if(copyClinic.org) {
        targetClinic.org = copyClinic.org;
      }
      targetClinic.name = copyClinic.name;  
      targetClinic.nameDetail = copyClinic.nameDetail;
      targetClinic.description = copyClinic.description;
      targetClinic.sport = copyClinic.sport;
      targetClinic.startDateTime = copyClinic.startDateTime;
      targetClinic.endDateTime = copyClinic.endDateTime;
      targetClinic.location = copyClinic.location;
      targetClinic.locationDetail = copyClinic.locationDetail;
      targetClinic.headCoach = copyClinic.headCoach;
      targetClinic.assistantCoach1 = copyClinic.assistantCoach1;
      targetClinic.assistantCoach2 = copyClinic.assistantCoach2;
      targetClinic.assistantCoach3 = copyClinic.assistantCoach3;
      targetClinic.assistantCoach4 = copyClinic.assistantCoach4;
      targetClinic.preClinicNotes = copyClinic.preClinicNotes;
      targetClinic.postClinicNotes = copyClinic.postClinicNotes;
      
      return targetClinic;
    }
  }

  export class CalendarEvent {
    constructor(
      public eventType: string,
      public name: string,
      public description: string,
      public sport: string,
      public org: Organization,
      public startDateTime: Date,
      public endDateTime: Date,
      public location: string,
      public locationDetail: string
    ) {}

    public static getDefault(){
      return new CalendarEvent("", "", "", "", new Organization("",""), new Date, new Date,
        "","");
    }
  }

  export class Practice {
    constructor(
      public teamEventId: number,
      public startDateTime: Date,
      public endDateTime: Date,
      public eventName: string,
      public eventLocation: string,
      public eventLocationDetail: string,
      public notes: string
    ) {}

    public static getDefault() {
      return new Practice(-1, new Date(), new Date(), "","","","");
    }

    public static copyTo(copyPractice:Practice, targetPractice:Practice) : Practice {
      
      targetPractice.teamEventId = copyPractice.teamEventId;
      targetPractice.eventName = copyPractice.eventName;
      targetPractice.endDateTime = copyPractice.endDateTime;
      targetPractice.startDateTime = copyPractice.startDateTime;
      targetPractice.eventLocation = copyPractice.eventLocation;
      targetPractice.eventLocationDetail = copyPractice.eventLocationDetail;
      targetPractice.notes = copyPractice.notes;
      
      return targetPractice;
    }

  }
    

