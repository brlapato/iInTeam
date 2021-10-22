import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/environments/environment';
import { Media, Player } from 'src/app/data-objects/data-objects.module';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private http:HttpClient
  ) { }

  public retrievePlayer(playerId: number) {
    return this.http.get<Player>(`${API_URL}/players/${playerId}`);
  }

  public retrievePlayerProfileImage(playerId: number): Observable<Media> {
    let url = `${API_URL}/players/${playerId}/profileImage`;
    return this.http.get<Media>(url);
  }
}
