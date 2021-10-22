import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HockeyGame } from 'src/app/data-objects/data-objects.module';
import { GameService } from 'src/app/services/data/game.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-hockey-game',
  templateUrl: './hockey-game.component.html',
  styleUrls: ['./hockey-game.component.css']
})
export class HockeyGameComponent implements OnInit {

  teamId: number = -1;
  gameId: number = -1;
  hockeyGame: HockeyGame = HockeyGame.getDefault();
  startDate: Date = new Date();
  newStartDate: string = "";
  startTime: string = "";

  constructor(
    public auth: AuthenticationService,
    public gameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.params['teamId'];
    this.gameId = this.route.snapshot.params['gameId'];

    this.loadHockeyGame(this.teamId, this.gameId);
  }

  loadHockeyGame(teamId: number, gameId: number) {
    
    if(gameId != -1) {
      this.auth.playerId$.subscribe(
        (playerId:number | null) => {
          if (playerId && this.teamId) {
            
            this.gameService.retrieveHockeyGame(playerId, teamId, gameId).subscribe((data:HockeyGame) => {
              this.hockeyGame = data;
              this.startDate = data.startDateTime;
              let startDateTime = new Date(data.startDateTime)
              this.startTime = startDateTime.getHours().toString().padStart(2, "0") + ":" + startDateTime.getMinutes().toString().padStart(2, "0");
            })
          }
        }
      );
    }
  }

  saveGame() {
    // set game date/time
    
    let startDateStr = "";
    if (this.newStartDate.length > 0) {
      startDateStr = new Date(this.newStartDate + "T00:00:00").toDateString();
    } else {
      startDateStr = new Date(this.startDate).toDateString();
    }
      
    
    this.hockeyGame.startDateTime = new Date(startDateStr + " " + this.startTime + "Z"); 
    console.log(this.hockeyGame.startDateTime);
    

    if(this.gameId == -1) {
      this.auth.playerId$.subscribe(
        (playerId:number | null) => {
          if (playerId && this.teamId) {
            this.gameService.addHockeyGame(playerId, this.teamId, this.hockeyGame).subscribe();
          }
        }
      );
    } else {
      this.auth.playerId$.subscribe(
        (playerId:number | null) => {
          if (playerId && this.teamId) {
            this.gameService.updateHockeyGame(playerId, this.teamId, this.hockeyGame.gameId, this.hockeyGame).subscribe();
          }
        }
      );
    }

    this.navigateBack();
  }

  navigateBack() {
    console.log("Navigate back");
    this.router.navigate(['teams', this.teamId]);
  }

  public deleteGame(teamId: number, gameId: number) {
    if(confirm('Are you sure you want to delete this game?')) {
      this.auth.playerId$.subscribe(
        (playerId:number | null) => {
          if (playerId && teamId) {
            this.gameService.deleteHockeyGame(playerId, teamId, gameId).subscribe(
              (data:HockeyGame) => { this.navigateBack(); }
            );
          }
        }
      );
    }
  }

  
  

  

}
