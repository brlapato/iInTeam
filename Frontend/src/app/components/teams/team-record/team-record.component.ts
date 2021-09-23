import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { WinRecord, WinRecordEntry } from 'src/app/data-objects/data-objects.module';
import { PlayerStatsService } from 'src/app/services/data/player-stats.service';
import { TeamService } from 'src/app/services/data/team.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-team-record',
  templateUrl: './team-record.component.html',
  styleUrls: ['./team-record.component.css']
})
export class TeamRecordComponent implements OnInit {

  @Input() teamId: number = 0;
  @Input() displayMode: String = "TeamRecord"
  @Input() statSet: String = "";
  @Input() title: String = "";
  @Input() displayColumnHeaders: boolean = true;
  public winRecords: WinRecordEntry[] = [];

  constructor(
    public auth: AuthenticationService,
    public teamService: TeamService,
    public statService: PlayerStatsService
  ) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(`display mode: ${this.displayMode}`);
    
    switch (this.displayMode) {
      case "TeamRecord":
        this.loadTeamRecord();
        break;
      case "PlayerRecord":
        this.loadPlayerRecord();
        break;
      default:
        // don't load anything  
    }
  }


  loadTeamRecord() {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId && this.teamId) {
          
          this.teamService.retrieveTeamRecord(playerId, this.teamId).subscribe((data:WinRecordEntry[]) => {this.winRecords = data; })
        }
      }
    );
  }

  loadPlayerRecord() {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) {
          
          this.statService.retrievePlayerHockeyRecord(playerId, this.statSet).subscribe((data:WinRecordEntry[]) => {this.winRecords = data; })
        }
      }
    );
  }

  getDisplayString(winRecord: WinRecord) {
    return WinRecord.getDisplayString(winRecord);
  }

  

}
