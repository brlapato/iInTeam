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
  public displayGames: HockeyGame[] = [];
  public startingDisplayIndex: number = -1;

  constructor(
    public auth: AuthenticationService,
    public teamService: TeamService
  ) { }

  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadTeamList();
}


  loadTeamList() {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId && this.teamId) {
          
          this.teamService.retrieveHockeyGames(playerId, this.teamId).subscribe(
            (data:HockeyGame[]) => {
              this.setStartingIndex(data);
              this.games = data;
            }
          )
        }
      }
    );
  }

  public setStartingIndex(games: HockeyGame[]) {
    if (games.length == 0) {
      this.startingDisplayIndex = -1;
    } else {
      let currentDate = new Date();
      for (let i=0; i < games.length; i++) {
        
        if ( currentDate < new Date(games[i].startDateTime) ) {
          this.startingDisplayIndex = i;
          return;
        }
      }

      this.startingDisplayIndex = games.length - 1;
    }
  }

  onGameDeleted(gameId: number) {
    for (let i:number = 0; i < this.games.length; i++) {
      if (this.games[i].gameId === gameId) {
        this.games.splice(i, 1);
      }
    }
  }

  public onPagedItemsChanged(pagedItems: any) {
    this.displayGames = pagedItems;
  }

}
