import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { WinRecord, WinRecordEntry } from 'src/app/data-objects/data-objects.module';
import { TeamService } from 'src/app/services/data/team.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-team-record',
  templateUrl: './team-record.component.html',
  styleUrls: ['./team-record.component.css']
})
export class TeamRecordComponent implements OnInit {

  @Input() teamId: number = 0;
  public winRecords: WinRecordEntry[] = [];

  constructor(
    public auth: AuthenticationService,
    public teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.loadTeamRecord();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadTeamRecord();
}


  loadTeamRecord() {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId && this.teamId) {
          
          this.teamService.retrieveTeamRecord(playerId, this.teamId).subscribe((data:WinRecordEntry[]) => {this.winRecords = data; console.log(data);})
        }
      }
    );
  }

  getDisplayString(winRecord: WinRecord) {
    return WinRecord.getDisplayString(winRecord);
  }

  

}
