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
      public isActive: boolean,
      public startDate: Date
    ) {}

    public static getDefault() {
      return new Team(
        -1,
        "",
        new Organization("",""),
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
      public isActive: boolean,
      public startDate: Date,
      public ageClass: String,
      public playerNumber: number,
      public regularPosition: String,
      public nextGame: HockeyGame
    ) {super(teamId, "Hockey", org, name, isActive,startDate);}

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
        HockeyGame.getDefault());
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
        new WinRecord(0,0,0,0),
        0,0,0,0,0, 
        HockeyGame.getDefault()
      );
    }
  }
    

