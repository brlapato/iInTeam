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

  public retrieveClinicList(playerId: number, includeCompleted: boolean) {
    return this.http.get<Clinic[]>(`${API_URL}/players/${playerId}/clinics?includeCompleted=${includeCompleted}`);
  }

  public createClinic(playerId: number, clinic: Clinic) {
    return this.http.post<Clinic>(`${API_URL}/players/${playerId}/clinics`, clinic);
  }

  public updateClinic(playerId: number, clinicId: number, clinic: Clinic) {
    return this.http.put<Clinic>(`${API_URL}/players/${playerId}/clinics/${clinicId}`, clinic);
  }

  public deleteClinic(playerId: number, clinicId: number) {
    return this.http.delete<Clinic>(`${API_URL}/players/${playerId}/clinics/${clinicId}`);
  }
}
