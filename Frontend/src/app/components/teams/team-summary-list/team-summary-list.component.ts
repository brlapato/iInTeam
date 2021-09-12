import { Component, Input, OnInit } from '@angular/core';
import { HockeyTeam, HockeyTeamSummary } from 'src/app/data-objects/data-objects.module';
import { TeamService } from 'src/app/services/data/team.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-team-summary-list',
  templateUrl: './team-summary-list.component.html',
  styleUrls: ['./team-summary-list.component.css']
})
export class TeamSummaryListComponent implements OnInit {

  @Input() activeOnly: boolean = false;
  public teams: HockeyTeamSummary[] = [];

  

  constructor(
    public auth: AuthenticationService,
    public teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.loadTeamList();
  }

  private loadTeamList() {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) { 
          this.teamService.retrieveTeamList(playerId, this.activeOnly).subscribe(
            (data:HockeyTeamSummary[]) => {
              this.teams = data;
            }
          )
        }
      }
    );
  }


}
