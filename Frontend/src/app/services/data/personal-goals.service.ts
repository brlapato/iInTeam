import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonalGoal } from 'src/app/data-objects/data-objects.module';
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonalGoalsService {

  constructor(private http:HttpClient) { }


  public retrievePersonalGoals(playerId: number, showActiveOnly: boolean) {
    return this.http.get<PersonalGoal[]>(`${API_URL}/players/${playerId}/goals?active=${showActiveOnly}`);
  }
}
