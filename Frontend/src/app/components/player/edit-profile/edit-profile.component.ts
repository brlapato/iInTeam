import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Media, Player } from 'src/app/data-objects/data-objects.module';
import { PlayerService } from 'src/app/services/data/player.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { FileSelectedEventArgs } from '../../ui/image-upload/image-upload.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {


  public player: Player
  public profileImageSrc: string | undefined = '';
  public newProfileImage: Media = new Media(-1, '', '', '');
  public newProfileImageDescription: string = '';

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
          this.loadProfileImage(playerId);

          this.playerService.retrievePlayer(playerId).subscribe(
            (data:Player) => {this.player = data;}
          )
        }
      }
    )
  }

  loadProfileImage(playerId:number) {
    this.playerService.retrievePlayerProfileImage(playerId).subscribe(
      (data: Media) => {
        if(data) {
          this.profileImageSrc = this.sanitizer.sanitize(SecurityContext.HTML, 'data:' + data.mediaType + ';base64,' + data.file)?.toString();
        }
      }   
    );
  }

  savePlayer() {
    
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) {
          this.playerService.updatePlayer(this.player).subscribe();
        }
      }
    );
  }

  onFilesSelected(eventArgs: FileSelectedEventArgs) {
    if (eventArgs.files.length > 0) {
      this.newProfileImage.file = eventArgs.files[0].encodedFile;
      this.newProfileImage.mediaType = eventArgs.files[0].fileType;
    }
  }

  uploadProfileImage() {
    if (this.newProfileImage.file.length > 0 && this.newProfileImage.mediaType.length > 0) {
      this.playerService.updatePlayerProfileImage(this.player, this.newProfileImage).subscribe(
        (data:Media) => {
          this.profileImageSrc = this.sanitizer.sanitize(SecurityContext.HTML, 'data:' + data.mediaType + ';base64,' + data.file)?.toString();
        }
      );
    }
  }

  deleteProfileImage() {
    if(confirm('Are you sure you want to remove your profile picture?')) {
      this.playerService.deletePlayerProfileImage(this.player).subscribe(
        (data: Media) => {
          this.loadProfileImage(this.player.playerId);
        }
      );
    }
  }

}

