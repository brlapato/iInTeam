import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clinic } from 'src/app/data-objects/data-objects.module';
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClinicsService {

  constructor(
    private http: HttpClient
  ) { 

  }

  public retrieveTeamList(playerId: number, includeCompleted: boolean) {
    return this.http.get<Clinic[]>(`${API_URL}/players/${playerId}/clinics?includeCompleted=${includeCompleted}`);
  }
}
