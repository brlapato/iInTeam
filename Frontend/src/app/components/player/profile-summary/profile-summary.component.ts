import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Media, Player } from 'src/app/data-objects/data-objects.module';
import { PlayerService } from 'src/app/services/data/player.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.css']
})
export class ProfileSummaryComponent implements OnInit {

  public player: Player
  public profileImageSrc: string | undefined = "";
  public playerHeightStr = "";
  public playerWeightStr = "";
  

  constructor(
      private auth: AuthenticationService,
      private playerService: PlayerService,
      private sanitizer: DomSanitizer
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
          this.playerService.retrievePlayerProfileImage(playerId).subscribe(
            (data: Media) => {
              this.profileImageSrc = this.sanitizer.sanitize(SecurityContext.HTML, 'data:' + data.mediaType + ';base64,' + data.file)?.toString();
            }   
          );
          //this.profileImageSrc = `${API_URL}/players/${playerId}/profileImageB`;
          this.playerService.retrievePlayer(playerId).subscribe(
            (data:Player) => {
              this.player = data;
              this.playerHeightStr = this.player.heightFeet.toString() + "'-" + this.player.heightInches.toString() + "\"";
              this.playerWeightStr = this.player.weight.toString() + " lbs.";
            }
          )
        }
      }
    )
  }

}
