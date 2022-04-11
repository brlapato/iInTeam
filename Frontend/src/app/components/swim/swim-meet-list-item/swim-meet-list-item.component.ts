import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwimMeet, SwimTeam } from 'src/app/data-objects/swim-data-objects.module';
import { SwimTeamService } from 'src/app/services/data/swim-team.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-swim-meet-list-item',
  templateUrl: './swim-meet-list-item.component.html',
  styleUrls: ['./swim-meet-list-item.component.css']
})
export class SwimMeetListItemComponent implements OnInit {

  @Input() meet?: SwimMeet = undefined;

  constructor(
    private router: Router,
    private swimTeamService: SwimTeamService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  public editMeet(meet: SwimMeet) {
    if (this.meet != null) {
      this.router.navigate(['swimMeet', this.meet?.teamId, this.meet?.meetId]);
    }
  }

  public deleteMeet(meet: SwimMeet) {
    if(confirm('Are you sure you want to delete this swim meet?')) {
      this.auth.playerId$.subscribe(
        (playerId:number | null) => {
          if (playerId && this.meet) {
              this.swimTeamService.deleteSwimMeet(playerId, this.meet?.teamId, this.meet).subscribe(
                (data: any) => {

                }
              );
            }
        }
      );
    }
  }

}
