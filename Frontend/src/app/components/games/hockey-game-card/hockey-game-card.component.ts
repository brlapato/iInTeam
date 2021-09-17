import { Component, Input, OnInit } from '@angular/core';
import { HockeyGame } from 'src/app/data-objects/data-objects.module';

@Component({
  selector: 'app-hockey-game-card',
  templateUrl: './hockey-game-card.component.html',
  styleUrls: ['./hockey-game-card.component.css']
})
export class HockeyGameCardComponent implements OnInit {

  @Input() game: HockeyGame = HockeyGame.getDefault();

  constructor() { }

  ngOnInit(): void {
  }

  public formatOppenentName(game:HockeyGame) {
     let vsString = 'vs';
     if (game.side === "Away") {
       vsString = "@";
     }

     if (game.opponentTeamNameMod && game.opponentTeamNameMod.length > 0) {
       return `${vsString} ${game.opponentTeamName} (${game.opponentTeamNameMod})`;
     } else {
      return `${vsString} ${game.opponentTeamName}`;
     }
  }

  public formatScore(game:HockeyGame) {
    return `${game.teamScore} - ${game.opponentScore}`
  }

  public getScoringSummary(game:HockeyGame) {
    let goalString = "";
    if (game.goals && game.goals > 0) {
      let plural = "";
      if (game.goals > 1) {
        plural = "s";
      }

      goalString = `${game.goals} goal${plural}`;
    }

    let assistString = "";
    if (game.assists && game.assists > 0) {
      let plural = "";
      if (game.assists > 1) {
        plural = "s";
      }

      assistString = `${game.assists} assist${plural}`;
    } 

    let outString = ""
    if (goalString.length > 0 && assistString.length > 0) {
      outString = `${goalString}; ${assistString}`;
    } else if (goalString.length > 0) {
      outString = `${goalString}`;
    } else {
      outString = `${assistString}`;
    }
    return outString;

  }

}
