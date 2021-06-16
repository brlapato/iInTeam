import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { Player } from 'src/app/data-objects/data-objects.module';

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
}
