import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
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
  @Input() collapsible: boolean = true;

  public expanded:boolean = false;
  public winRecords: WinRecordEntry[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    public auth: AuthenticationService,
    public teamService: TeamService,
    public statService: PlayerStatsService
  ) { }

  ngOnInit(): void {
    this.expanded = !this.collapsible;

    this.dtOptions = {
      paging: false,
      searching: false,
      info: false
    };
  }

  ngOnChanges(changes: SimpleChanges) {    
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
          
          this.teamService.retrieveTeamRecord(playerId, this.teamId).subscribe(
            (data:WinRecordEntry[]) => {
              this.winRecords = data; 
              this.dtTrigger.next();
            }
          )
        }
      }
    );
  }

  loadPlayerRecord() {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) {
          
          this.statService.retrievePlayerHockeyRecord(playerId, this.statSet).subscribe(
            (data:WinRecordEntry[]) => {
              this.winRecords = data; 
              this.dtTrigger.next();
            }
          )
        }
      }
    );
  }

  getDisplayString(winRecord: WinRecord) {
    return WinRecord.getDisplayString(winRecord);
  }

  onToggleExpand() {
    this.expanded = !this.expanded;
  }

}
