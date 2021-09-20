import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/data-objects/data-objects.module';
import { PlayerService } from 'src/app/services/data/player.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  player: Player = Player.getDefault();

  constructor(
    public auth: AuthenticationService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.refreshPlayer(1);
  }


  refreshPlayer(playerId:number) {

    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) {
          this.playerService.retrievePlayer(playerId).subscribe(
            (response:Player) => {this.player = response;}
          );
        }
      }
    );
  }

}
