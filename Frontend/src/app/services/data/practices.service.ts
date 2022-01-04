import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Practice } from 'src/app/data-objects/data-objects.module';
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PracticesService {

  constructor(
    private http: HttpClient
  ) { }


  public retrievePractices(playerId: number, teamId: number) {
    return this.http.get<Practice[]>(`${API_URL}/players/${playerId}/teams/${teamId}/practices`);
  }

  public createPractice(playerId: number, teamId: number, practice: Practice) {
    return this.http.post<Practice>(`${API_URL}/players/${playerId}/teams/${teamId}/practices`, practice);
  }

  public updatePractice(playerId: number, teamId: number, practiceId: number, practice: Practice) {
    return this.http.put<Practice>(`${API_URL}/players/${playerId}/teams/${teamId}/practices/${practiceId}`, practice);
  }

  public deletePractice(playerId: number, teamId:number, practiceId: number) {
    return this.http.delete<Practice>(`${API_URL}/players/${playerId}/teams/${teamId}/practices/${practiceId}`);
  }
}
