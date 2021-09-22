import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { HockeyPlayerStatsEntry, WinRecordEntry } from 'src/app/data-objects/data-objects.module';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsService {

  constructor(
    private http:HttpClient
  ) { }

  public retrievePlayerHockeyStats(playerId: number, statSet: String) {
    return this.http.get<HockeyPlayerStatsEntry[]>(`${API_URL}/players/${playerId}/hockeyStats?statSet=${statSet}`);
  }

  public retrievePlayerHockeyRecord(playerId: number, statSet: String) {
    return this.http.get<WinRecordEntry[]>(`${API_URL}/players/${playerId}/winRecord?statSet=${statSet}`);
  }
}
