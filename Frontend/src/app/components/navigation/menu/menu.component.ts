import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { UserInfo } from 'src/app/data-objects/data-objects.module';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthenticationService) { }

  public accountHasPlayer: boolean = false;
  public playerInfoRetrieved: boolean = false;
  public userInfo: UserInfo | null = null;

  ngOnInit(): void {
    this.auth.playerLoaded$.subscribe(
      (playerId:number | null) => {
        if (playerId) {
          this.accountHasPlayer = true;
        }
        this.playerInfoRetrieved = true;
      }
    )

    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) {
          this.accountHasPlayer = true;
          this.userInfo = this.auth.getUserInfoCache();
        } else {
          this.accountHasPlayer = false;
        }
        this.playerInfoRetrieved = true;
      }
    )

    
  }

}
