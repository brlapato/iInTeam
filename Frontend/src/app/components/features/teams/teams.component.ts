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
  newStartDateStr: string = "";

  newTeam: Team = Team.getDefault();

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

  onAddTeamOpened(): void {
    this.resetNewTeam();
  }

  createTeam(): boolean {
    
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId && this.newTeam) { 
          if (this.newStartDateStr.length > 0) {
            this.newTeam.startDate = new Date(this.newStartDateStr + "T00:00:00");
          } 
          this.teamService.createTeam(playerId, this.newTeam).subscribe(
            (data:Team) => {
              this.loadTeamList(data.teamId)
            }
          );
        }
      }
    )

    return true;
  }

  resetNewTeam():void {
    this.newTeam.name = "";
    this.newTeam.org.name = "";
    this.newTeam.org.city = "";
    this.newTeam.sport = "";
    this.newTeam.startDate = new Date();
    this.newTeam.season = "";
    this.newTeam.active = true;

  }



}
