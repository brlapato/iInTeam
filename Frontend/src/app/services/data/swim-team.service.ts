import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwimTeam } from 'src/app/data-objects/data-objects.module';
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
}
