import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HockeyTeamSummary } from 'src/app/data-objects/data-objects.module';
import { TeamService } from 'src/app/services/data/team.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { LOCALE_ID, Inject } from "@angular/core";

@Component({
  selector: 'app-team-summary',
  templateUrl: './team-summary.component.html',
  styleUrls: ['./team-summary.component.css']
})
export class TeamSummaryComponent implements OnInit {

  @Input() teamSummary: HockeyTeamSummary = HockeyTeamSummary.getDefault();
  
  public winRecord: string = "";
  public nextGameDate: String = "(None)"
  public nextGameVs: String = ""
  public nextGameLocation: String = ""
  public teamLoaded: boolean = false;

  constructor(
    public auth: AuthenticationService,
    public teamService: TeamService,
    @Inject(LOCALE_ID) public locale: string
  ) { }

  ngOnInit(): void {
    this.populateTeamDisplay(this.teamSummary);
  }

  populateTeamDisplay(teamSummary: HockeyTeamSummary) {
    
    this.teamSummary = teamSummary;
    this.winRecord = `(${teamSummary.record.wins}-${teamSummary.record.losses + teamSummary.record.overTimeLosses}-${teamSummary.record.ties})`;
    if (teamSummary.nextGame != null) {
      let vsString = 'vs';
      if (teamSummary.nextGame.side == "Away") {
        vsString = "@"
      }
      
      this.nextGameDate = formatDate(teamSummary.nextGame.startDateTime, 'MMM d, y, h:mm a', this.locale);
      this.nextGameVs = `${vsString} ${teamSummary.nextGame.opponentTeamName} (${teamSummary.nextGame.league})`;
      this.nextGameLocation = teamSummary.nextGame.location
      //this.nextGameDesc = `${formattedDate}: ${vsString} ${teamSummary.nextGame.opponentTeamName} (${teamSummary.nextGame.location})`;
    }

    this.teamLoaded = true;
  }

}
