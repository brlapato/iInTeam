import { SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HockeyPlayerStatsEntry } from 'src/app/data-objects/data-objects.module';
import { TeamService } from 'src/app/services/data/team.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit {

  @Input() teamId: number = 0;
  public playerStats: HockeyPlayerStatsEntry[] = [];

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
          
          this.teamService.retrievePlayerStatsForTeam(playerId, this.teamId).subscribe((data:HockeyPlayerStatsEntry[]) => {this.playerStats = data; console.log(data);})
        }
      }
    );
  }



}
