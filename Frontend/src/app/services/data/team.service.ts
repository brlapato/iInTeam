import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { HockeyTeam, HockeyTeamSummary } from 'src/app/data-objects/data-objects.module';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private http:HttpClient
  ) { }

  public retrieveTeamSummary(playerId: number, teamId: number) {
    return this.http.get<HockeyTeamSummary>(`${API_URL}/players/${playerId}/HockeyTeams/${teamId}/teamSummary`);
  }

  public retrieveTeamList(playerId: number, activeOnly: boolean) {
    return this.http.get<HockeyTeam[]>(`${API_URL}/players/${playerId}/HockeyTeams?active=${activeOnly}`);
  }
}
