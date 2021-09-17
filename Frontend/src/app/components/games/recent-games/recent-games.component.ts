import { Component, Input, OnInit } from '@angular/core';
import { HockeyGame } from 'src/app/data-objects/data-objects.module';
import { GameService } from 'src/app/services/data/game.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-recent-games',
  templateUrl: './recent-games.component.html',
  styleUrls: ['./recent-games.component.css']
})
export class RecentGamesComponent implements OnInit {

  @Input() numberGames: number = 5;
  public recentGames: HockeyGame[] = [];

  constructor(
    public auth: AuthenticationService,
    public gameService: GameService
  ) { }

  ngOnInit(): void {
    this.loadRecentGames();
  }


  loadRecentGames() {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) {
          this.gameService.retrieveRecentGames(playerId, this.numberGames).subscribe((data:HockeyGame[]) => {this.recentGames = data;})
        }
      }
    );
  }

  

}
