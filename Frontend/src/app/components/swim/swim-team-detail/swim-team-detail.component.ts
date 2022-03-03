import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwimTeam } from 'src/app/data-objects/data-objects.module';
import { SwimTeamService } from 'src/app/services/data/swim-team.service';
import { TeamService } from 'src/app/services/data/team.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-swim-team-detail',
  templateUrl: './swim-team-detail.component.html',
  styleUrls: ['./swim-team-detail.component.css']
})
export class SwimTeamDetailComponent implements OnInit {

  @Input() team?: SwimTeam = SwimTeam.getDefault();
  public editTeam: SwimTeam = SwimTeam.getDefault();

  newStartDateStr: string = "";

  constructor(
    private router: Router,
    private swimTeamService: SwimTeamService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
  }


  saveTeam() {
    if (this.team) {
      if (this.newStartDateStr.length > 0) {
        this.editTeam.startDate = new Date(this.newStartDateStr + "T00:00:00");
      } 
        
      this.auth.playerId$.subscribe(
        (playerId:number | null) => {
          if (playerId && this.team) { 
            this.swimTeamService.updateSwimTeam(playerId, this.editTeam.teamId, this.editTeam).subscribe();
            this.team = SwimTeam.copyTo(this.editTeam, this.team)
          }
        }
      )
      
      return true;
    } else {
      return false;
    }
  }

  onEditOpened() {
    
    if (this.team) {
      this.editTeam = SwimTeam.copy(this.team);
    }
  }

}
