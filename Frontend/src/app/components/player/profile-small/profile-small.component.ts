import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/data-objects/data-objects.module';
import { PlayerService } from 'src/app/services/data/player.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-profile-small',
  templateUrl: './profile-small.component.html',
  styleUrls: ['./profile-small.component.css']
})
export class ProfileSmallComponent implements OnInit {

  public player: Player

  constructor(
    private auth: AuthenticationService,
    private playerService: PlayerService
    ) {
      this.player = Player.getDefault();
    }

  ngOnInit(): void {
    
    this.loadPlayer()
  }

  loadPlayer() {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) { 
          this.playerService.retrievePlayer(playerId).subscribe(
            (data:Player) => {this.player = data;}
          )
        }
      }
    )
  }

}
