import { Component, OnInit } from '@angular/core';
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
    public teamService: TeamService
  ) { }
  

  ngOnInit(): void {
    this.loadTeamList();
  }

  loadTeamList() {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) {
          this.teamLoaded = false; 
          this.teamService.retrieveTeams(playerId).subscribe((data:Team[]) => {this.teamList = data;})
        }
      }
    );
  }

  
  onSelectTeam(team?: Team): void {
    console.log(team);
    this.selectedTeam = team;
  }

}
