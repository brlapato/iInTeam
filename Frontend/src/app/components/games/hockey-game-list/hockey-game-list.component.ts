import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { HockeyGame, HockeyPlayerStatsEntry } from 'src/app/data-objects/data-objects.module';
import { TeamService } from 'src/app/services/data/team.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-hockey-game-list',
  templateUrl: './hockey-game-list.component.html',
  styleUrls: ['./hockey-game-list.component.css']
})
export class HockeyGameListComponent implements OnInit {

  @Input() teamId: number = 0;
  public games: HockeyGame[] = [];

  constructor(
    public auth: AuthenticationService,
    public teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.loadTeamList();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadTeamList();
}


  loadTeamList() {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId && this.teamId) {
          
          this.teamService.retrieveHockeyGames(playerId, this.teamId).subscribe((data:HockeyGame[]) => {this.games = data; console.log(data);})
        }
      }
    );
  }

}
