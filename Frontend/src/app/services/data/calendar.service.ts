import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { CalendarEvent } from 'src/app/data-objects/data-objects.module';
import { API_URL } from 'src/environments/environment';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private http: HttpClient,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  public retieveEventsOverRange(playerId: number, start:Date, end:Date) {
    let startStr = formatDate(start, 'yyyy-MM-dd', this.locale);
    let endStr = formatDate(end, 'yyyy-MM-dd', this.locale);
    return this.http.get<CalendarEvent[]>(`${API_URL}/players/${playerId}/calendar?start=${start.toISOString()}&end=${end.toISOString()}`);
  }
}
