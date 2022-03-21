import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwimMeet, SwimTeam } from 'src/app/data-objects/data-objects.module';
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SwimTeamService {

  constructor(
    private http:HttpClient
  ) { }

  public updateSwimTeam(playerId: number, teamId: number, swimTeam: SwimTeam) {
    return this.http.put(`${API_URL}/players/${playerId}/SwimTeams/${teamId}`, swimTeam);
  }

  public getSwimMeet(playerId: number, teamId: number, meetId: number) {
    return this.http.get<SwimMeet>(`${API_URL}/players/${playerId}/SwimTeams/${teamId}/meets/${meetId}`);
  }

  public getSwimMeets(playerId: number, teamId: number) {
    return this.http.get<SwimMeet[]>(`${API_URL}/players/${playerId}/SwimTeams/${teamId}/meets`);
  }

  public createSwimMeet(playerId: number, teamId: number, swimMeet: SwimMeet) {
    return this.http.post<SwimMeet>(`${API_URL}/players/${playerId}/SwimTeams/${teamId}/meets`, swimMeet);
  }

  public updateSwimMeet(playerId: number, teamId: number, swimMeet: SwimMeet) {
    return this.http.put<SwimMeet>(`${API_URL}/players/${playerId}/SwimTeams/${teamId}/meets/${swimMeet.meetId}`, swimMeet);
  }

  public deleteSwimMeet(playerId: number, teamId: number, swimMeet: SwimMeet) {
    return this.http.delete<SwimMeet>(`${API_URL}/players/${playerId}/SwimTeams/${teamId}/meets/${swimMeet.meetId}`);
  }
}
