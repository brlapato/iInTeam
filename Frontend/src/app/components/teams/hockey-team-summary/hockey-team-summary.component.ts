import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HockeyTeamSummary } from 'src/app/data-objects/data-objects.module';
import { TeamService } from 'src/app/services/data/team.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { LOCALE_ID, Inject } from "@angular/core";

@Component({
  selector: 'app-hockey-team-summary',
  templateUrl: './hockey-team-summary.component.html',
  styleUrls: ['./hockey-team-summary.component.css']
})
export class HockeyTeamSummaryComponent implements OnInit {

  public teamSummary: HockeyTeamSummary = HockeyTeamSummary.getDefault();
  
  public winRecord: string = "";
  public teamLoaded: boolean = false;

  constructor(
    public auth: AuthenticationService,
    public teamService: TeamService,
    @Inject(LOCALE_ID) public locale: string
  ) { }

  ngOnInit(): void {
    this.loadTeamList();
  }

  populateTeamDisplay(teamSummary: HockeyTeamSummary) {
    
    this.teamSummary = teamSummary;
    this.winRecord = `${teamSummary.record.wins}-${teamSummary.record.losses + teamSummary.record.overTimeLosses}-${teamSummary.record.ties}`;
    

    this.teamLoaded = true;
  }

  private loadTeamList() {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) { 
          this.teamService.retrieveTeamList(playerId, true).subscribe(
            (data:HockeyTeamSummary[]) => {
              this.populateTeamDisplay(data[0]);
            }
          )
        }
      }
    );
  }
}
