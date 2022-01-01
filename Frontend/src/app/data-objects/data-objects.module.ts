import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



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
    public nickName: String,
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
    public position?: String,
    public shot?: String
  ){}
}
  
 export class UserInfo {
    constructor (
      public userName: String,
      public firstName: String,
      public lastName: String,
      public email: String,
      public playerId: number
    ) {}
  }  

  export class Media {
    constructor(
      public mediaId: number,
      public description: String,
      public file: String,
      public mediaType: string
    ) {}
  }

  export class Organization {
    constructor(
      public name: String,
      public city: String
    ) {}
  }

  export class WinRecord {
    constructor(
      public wins: number,
      public losses: number,
      public ties: number,
      public overTimeWins: number,
      public overTimeLosses: number
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
      public name: String,
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
      public name: String,
      public headCoach: String,
      public assistantCoach1: String,
      public assistantCoach2: String,
      public manager: String,
      public active: boolean,
      public startDate: Date,
      public ageClass: String,
      public playerNumber: number,
      public regularPosition: String,
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
      public teamName: String,
      public opponentTeamName: String,
      public opponentTeamNameMod: String,
      public startDateTime: Date,
      public location: String,
      public locationDetail: String,
      public side: String,
      public league: String,
      public gameType: String,
      public result: String,
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
      public preGameNotes: String,
      public postGameNotes: String
    ) {}

    public static getDefault() {
      return new HockeyGame(-1,-1,"", "", "", new Date(), "", "","Home","","","Undetermined",undefined,undefined,3,20,false,false,undefined,undefined,undefined,undefined,"","");
    }
  }

  export class HockeyTeamSummary {
    constructor(
      public teamName: String,
      public regularPosition: String,
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
        new WinRecord(0,0,0,0,0),
        0,0,0,0,0, 
        HockeyGame.getDefault()
      );
    }
  }

  export class PersonalGoal {
    constructor (
      public goalId: number,
      public name: String,
      public sport: String,
      public description: String,
      public plan: String,
      public timeFrame: String,
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
      public name: String,
      public nameDetail: String,
      public description: String,
      public sport: String,
      public startDateTime: Date,
      public endDateTime: Date,
      public location: String,
      public locationDetail: String,
      public headCoach: String,
      public assistantCoach1: String,
      public assistantCoach2: String,
      public assistantCoach3: String,
      public assistantCoach4: String
    ) {}

    public static getDefault() {
      return new Clinic (-1, 
        new Organization("",""),
        "","","","",new Date(), new Date(), 
        "","","","","","","")
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
      
      return targetClinic;
    }
  }
    

