import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from 'src/app/data-objects/data-objects.module';
import { API_URL, PLAYER_ID } from 'src/app/app.constants';
import { map } from 'rxjs/operators'
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public user$ = this.auth.user$;
  public isAuthenticated$ = this.auth.isAuthenticated$;

  constructor(
    private http:HttpClient,
    private auth:AuthService
  ) { }

  getUserInfo() {
    return this.http.get<UserInfo>(`${API_URL}/users`);
  }

  login() {
    this.auth.loginWithRedirect({redirect_uri: 'http://localhost:4200/dashboard'});
  }

  logout() {
    console.log("Logging out user...");
    sessionStorage.removeItem(PLAYER_ID);
    this.auth.logout({ returnTo: 'http://localhost:4200' })
    //auth.logout({ returnTo: document.location.origin })
  }

  public playerId$:Observable<string | null> = new Observable(observer => {
    let playerId = sessionStorage.getItem(PLAYER_ID);
    console.log(playerId);
    console.log(!playerId);
    if (!playerId) {
      this.http.get<UserInfo>(`${API_URL}/users`).subscribe(
        (response:UserInfo) => {
          console.log(response);
          sessionStorage.setItem(PLAYER_ID, response.playerId.toString());
          observer.next(response.playerId.toString());
        }
      )
      
    } 

    observer.next(sessionStorage.getItem(PLAYER_ID));
  });
}
