import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/data-objects/data-objects.module';
import { PlayerService } from 'src/app/services/data/player.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {

  constructor(
    private playerService: PlayerService,
    private auth: AuthenticationService,
    private router: Router,
  ) { }

  public newPlayer: Player = Player.getDefault();

  ngOnInit(): void {
  }

  public savePlayer(): void {
    this.playerService.createPlayer(this.newPlayer).subscribe(
      (data: Player) => { 
        this.auth.setPlayerId(data.playerId);
        this.router.navigate(['editProfile']);
      }
    );
  }

}
