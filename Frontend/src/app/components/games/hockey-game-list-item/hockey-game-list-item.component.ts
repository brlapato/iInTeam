import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HockeyGame } from 'src/app/data-objects/data-objects.module';
import { GameService } from 'src/app/services/data/game.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';


@Component({
  selector: 'app-hockey-game-list-item',
  templateUrl: './hockey-game-list-item.component.html',
  styleUrls: ['./hockey-game-list-item.component.css']
})
export class HockeyGameListItemComponent  {

  @Input() game: HockeyGame = HockeyGame.getDefault();
  @Output() gameDeleted = new EventEmitter<number>();
  
  constructor(
    private router: Router,
    public auth: AuthenticationService,
    public gameService: GameService
  ) {}

  public getSideModifierString(game: HockeyGame) {
    if (game.side=="Home") {
      return "vs.";
    } else {
      return "@";
    }
  }

  public getGameResultString(game: HockeyGame) {
    let resultStr = "";

    if (this.game.result != null && this.game.result != "Undetermined") {
      resultStr = `${this.game.result} (${this.game.teamScore}-${this.game.opponentScore})`
    }

    return resultStr;
  }

  public editGame(teamId: number, gameId: number) {
    this.router.navigate(['hockeyGame', teamId, gameId]);
  }

  public deleteGame(teamId: number, gameId: number) {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId && teamId) {
          this.gameService.deleteHockeyGame(playerId, teamId, this.game.gameId).subscribe(
            (data:HockeyGame) => { this.gameDeleted.emit(gameId); }
          );
        }
      }
    );
  }

  public isGameComplete(game: HockeyGame) {
    return (game.result && game.result != "Undetermined");
  }

  public isGameWin(game: HockeyGame) {
    return (game.result && (game.result === "Win" || game.result === "OvertimeWin"));
  }

  public isGameLoss(game: HockeyGame) {
    return (game.result && (game.result === "Loss" || game.result === "OvertimeLoss"));
  }

  public isGameTie(game: HockeyGame) {
    return (game.result && game.result === "Tie");
  }


}
