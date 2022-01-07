import { animate, style, transition, trigger } from '@angular/animations';
import { SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HockeyPlayerStatsEntry } from 'src/app/data-objects/data-objects.module';
import { PlayerStatsService } from 'src/app/services/data/player-stats.service';
import { TeamService } from 'src/app/services/data/team.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { LoginComponent } from '../../navigation/login/login.component';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit {

  @Input() teamId: number = -1;
  @Input() displayMode: String = "TeamStats"
  @Input() statSet: String = "";
  @Input() title: String = "";
  @Input() displayColumnHeaders: boolean = true;
  @Input() collapsible: boolean = true;

  public playerStats: HockeyPlayerStatsEntry[] = [];
  public expanded:boolean = false;

  constructor(
    public auth: AuthenticationService,
    public teamService: TeamService,
    public statService: PlayerStatsService
  ) { }

  ngOnInit(): void {
    this.expanded = !this.collapsible;
  }

  ngOnChanges(changes: SimpleChanges) {
    switch (this.displayMode) {
      case "TeamStats":
        this.loadTeamStats();
        break;
      case "PlayerStats":
        this.loadPlayerStats();
        break;
      default:
        // don't load anything  
    }
  }


  private loadTeamStats() {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId && this.teamId != -1) {
          
          this.teamService.retrievePlayerStatsForTeam(playerId, this.teamId).subscribe((data:HockeyPlayerStatsEntry[]) => {this.playerStats = data;})
        }
      }
    );
  }

  private loadPlayerStats() {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) {
          this.statService.retrievePlayerHockeyStats(playerId, this.statSet).subscribe((data:HockeyPlayerStatsEntry[]) => {this.playerStats = data;})
        }
      }
    );
  }

  onToggleExpand() {
    this.expanded = !this.expanded;
  }



}
