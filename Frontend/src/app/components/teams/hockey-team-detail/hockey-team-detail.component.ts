import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Team, HockeyTeam } from 'src/app/data-objects/data-objects.module';
import { TeamService } from 'src/app/services/data/team.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-hockey-team-detail',
  templateUrl: './hockey-team-detail.component.html',
  styleUrls: ['./hockey-team-detail.component.css']
})
export class HockeyTeamDetailComponent {

  @Input() team?: HockeyTeam = HockeyTeam.getDefault();
  public editTeam: HockeyTeam = HockeyTeam.getDefault();

  
  newStartDateStr: string = "";

  public numberPosString = "";

  constructor(
    private router: Router,
    private teamService: TeamService,
    private auth: AuthenticationService
  ) { }


  addGame() {
    if (this.team != null) {
      this.router.navigate(['hockeyGame', this.team?.teamId, -1]);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateNumberPosDisplay();
  } 

  updateNumberPosDisplay() {
    this.numberPosString = "";
    if (this.team) {
      if (this.team?.regularPosition && this.team?.playerNumber) {
        this.numberPosString = "#" + this.team?.playerNumber.toString() + "-" + this.team.regularPosition;
      } else if (this.team?.playerNumber) {
        this.numberPosString = "#" + this.team?.playerNumber.toString();
      } else if (this.team?.regularPosition) {
        this.numberPosString = this.team?.regularPosition.toString();
      }
    }
  }

  saveTeam() {
    if (this.team) {
      if (this.newStartDateStr.length > 0) {
        this.editTeam.startDate = new Date(this.newStartDateStr + "T00:00:00");
      } 
        
      this.auth.playerId$.subscribe(
        (playerId:number | null) => {
          if (playerId && this.team) { 
            this.teamService.updateHockeyTeam(playerId, this.editTeam.teamId, this.editTeam).subscribe();
            this.team = HockeyTeam.copyTo(this.editTeam, this.team)
            this.updateNumberPosDisplay();
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
      this.editTeam = HockeyTeam.copy(this.team);
    }
  }

}
