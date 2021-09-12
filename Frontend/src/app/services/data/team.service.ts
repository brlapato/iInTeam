import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { HockeyGame, HockeyPlayerStatsEntry, HockeyTeam, HockeyTeamSummary, Team, WinRecordEntry } from 'src/app/data-objects/data-objects.module';

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
    return this.http.get<HockeyTeamSummary[]>(`${API_URL}/players/${playerId}/HockeyTeams/summary?active=${activeOnly}`);
  }

  public retrieveTeams(playerId: number) {
    return this.http.get<Team[]>(`${API_URL}/players/${playerId}/teams`);
  }

  public retrieveTeamRecord(playerId: number, teamId: number) {
    return this.http.get<WinRecordEntry[]>(`${API_URL}/players/${playerId}/HockeyTeams/${teamId}/teamRecord`);
  }

  public retrievePlayerStatsForTeam(playerId: number, teamId: number) {
    return this.http.get<HockeyPlayerStatsEntry[]>(`${API_URL}/players/${playerId}/HockeyTeams/${teamId}/playerStats`);
  }

  public retrieveHockeyGames(playerId: number, teamId: number) {
    return this.http.get<HockeyGame[]>(`${API_URL}/players/${playerId}/HockeyTeams/${teamId}/games`);
  }

  
}
