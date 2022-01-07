import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Player, UserInfo } from 'src/app/data-objects/data-objects.module';
import { PLAYER_ID } from 'src/app/app.constants';
import { API_URL, HOME_URL } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public user$ = this.auth.user$;
  public isAuthenticated$ = this.auth.isAuthenticated$;
  public playerLoaded$: EventEmitter<number>;

  constructor(
    private http:HttpClient,
    private auth:AuthService
  ) {
    this.playerLoaded$ = new EventEmitter();
  }

  getUserInfo() {
    return this.http.get<UserInfo>(`${API_URL}/users`);
  }

  login() {
    this.auth.loginWithRedirect({redirect_uri: `${HOME_URL}/landing`});
  }

  logout() {
    
    sessionStorage.removeItem(PLAYER_ID);
    this.auth.logout({ returnTo: `${HOME_URL}` })
    //auth.logout({ returnTo: document.location.origin })
  }

  public playerId$:Observable<number | null> = new Observable(observer => {
    let playerId = sessionStorage.getItem(PLAYER_ID);

    if (!playerId) {
      this.http.get<UserInfo>(`${API_URL}/users`).subscribe(
        (response:UserInfo) => {
          let responsePlayerId = null;
          if(response) {
            responsePlayerId = response.playerId;
            this.setPlayerId(responsePlayerId);
          }

          observer.next(responsePlayerId);
        }
      )
    } else {
      observer.next(parseInt(playerId));
    }   
  });

  public setPlayerId(playerId: number) {
    sessionStorage.setItem(PLAYER_ID, playerId.toString());
    this.playerLoaded$.emit(playerId);
  }
}
