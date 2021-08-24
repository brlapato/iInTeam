import { Component, Input, OnInit } from '@angular/core';
import { HockeyGame } from 'src/app/data-objects/data-objects.module';

@Component({
  selector: 'app-hockey-game-list-item',
  templateUrl: './hockey-game-list-item.component.html',
  styleUrls: ['./hockey-game-list-item.component.css']
})
export class HockeyGameListItemComponent  {

  @Input() game: HockeyGame = HockeyGame.getDefault();
  
  constructor() {}

  public getSideModifierString(game: HockeyGame) {
    if (game.side=="Home") {
      return "vs.";
    } else {
      return "@";
    }
  }

  public getGameResultString(game: HockeyGame) {
    let resultStr = "";

    if (this.game.result != null) {
      resultStr = `${this.game.result} (${this.game.teamScore}-${this.game.opponentScore})`
    }

    return resultStr;
  }


}
