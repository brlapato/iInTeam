import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HockeyGame } from 'src/app/data-objects/data-objects.module';
import { GameService } from 'src/app/services/data/game.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { LoginComponent } from '../../navigation/login/login.component';


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
    this.router.navigate(['hockeyGame', teamId, gameId], {queryParams: {'src': 'team'}});
  }

  public scoreGame(teamId: number, gameId: number) {
    this.router.navigate(['hockeyGameInGame', teamId, gameId], {queryParams: {'src': 'dashboard'}});
  }

  public deleteGame(teamId: number, gameId: number, opponentName: String) {
    if(confirm('Are you sure you want to delete the game against ' + opponentName + '?')) {
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

  public isWithinTimeWindow(targetDate:Date, timeWindowHours:number) {
    return (Math.abs(new Date(targetDate).getTime() - new Date().getTime()) / 1000 / 60 / 60) < timeWindowHours;
  }

  public getHomeTeamName(game: HockeyGame) {
    if (game.side == "Home") {
      return game.teamName;
    } else {
      if (game.opponentTeamNameMod) {
        return `${game.opponentTeamName} ${game.opponentTeamNameMod}`;
      } else {
        return `${game.opponentTeamName}`;
      }
    }
  }

  

  public getAwayTeamName(game: HockeyGame) {
    if (game.side == "Home") {
      if (game.opponentTeamNameMod) {
        return `${game.opponentTeamName} ${game.opponentTeamNameMod}`;
      } else {
        return `${game.opponentTeamName}`;
      }
    } else {
      return game.teamName;
    }
  }

  public getHomeTeamScore(game: HockeyGame) {
    if (game.side == "Home") {
      return game.teamScore;
    } else {
      return game.opponentScore;
    }
  }

  public getAwayTeamScore(game: HockeyGame) {
    if (game.side == "Home") {
      return game.opponentScore;
    } else {
      return game.teamScore;
    }
  }


}
