import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/data-objects/data-objects.module';
import { TeamService } from 'src/app/services/data/team.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  public teamLoaded: boolean = false;
  public teamList: Team[] = [];
  selectedTeam?: Team;

  constructor(
    public auth: AuthenticationService,
    private route: ActivatedRoute,
    public teamService: TeamService
  ) { }
  

  ngOnInit(): void {
    let desiredTeamId = this.route.snapshot.params['selectedId'];
    if (desiredTeamId == null) {
      desiredTeamId = -1;
    }
    this.loadTeamList(desiredTeamId);
  }

  loadTeamList(selectedTeam: number) {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) {
          this.teamLoaded = false; 
          this.teamService.retrieveTeams(playerId).subscribe((data:Team[]) => {
            this.teamList = data;
            for (let i=0; i < data.length; i++) {
              if (this.teamList[i].teamId == selectedTeam) {
                  this.onSelectTeam(this.teamList[i]);
              }
            }
          })
        }
      }
    );
  }

  
  onSelectTeam(team?: Team): void {
    this.selectedTeam = team;
  }

}
