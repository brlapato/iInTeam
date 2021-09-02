import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { HockeyGame } from 'src/app/data-objects/data-objects.module';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http:HttpClient
  ) { }

  public retrieveHockeyGame(playerId: number, teamId: number, gameId: number) {
    return this.http.get<HockeyGame>(`${API_URL}/players/${playerId}/HockeyTeams/${teamId}/games/${gameId}`);
  }

  public updateHockeyGame(playerId: number, teamId: number, gameId:number, hockeyGame: HockeyGame) {
    return this.http.put(`${API_URL}/players/${playerId}/HockeyTeams/${teamId}/games/${gameId}`, hockeyGame);
  }

  public deleteHockeyGame(playerId: number, teamId: number, gameId:number) {
    return this.http.delete<HockeyGame>(`${API_URL}/players/${playerId}/HockeyTeams/${teamId}/games/${gameId}`);
  }

  public addHockeyGame(playerId:number, teamId: number, hockeyGame: HockeyGame) {
    return this.http.post(`${API_URL}/players/${playerId}/HockeyTeams/${teamId}/games/`, hockeyGame);
  }
}
