import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/data-objects/data-objects.module';
import { PlayerService } from 'src/app/services/data/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  player: Player = new Player(0,'','');

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.refreshPlayer(1);
  }


  refreshPlayer(playerId:number) {
    this.playerService.retrievePlayer(playerId).subscribe(
      (response:Player) => {this.player = response;}
    );
  }

}
