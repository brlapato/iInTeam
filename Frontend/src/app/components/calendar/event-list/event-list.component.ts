import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { CalendarEvent } from 'src/app/data-objects/data-objects.module';
import { CalendarService } from 'src/app/services/data/calendar.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  @Input() numberOfDays: number = 7;
  public calendarEvents: CalendarEvent[] = [];

  constructor(
    private auth: AuthenticationService,
    private calendarService: CalendarService,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  public loadEvents() {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) { 
          let startDate: Date = new Date();
          let endDate: Date = new Date();
          
          startDate.setHours(0,0,0,0);
          endDate.setDate(startDate.getDate() + this.numberOfDays);

          this.calendarService.retieveEventsOverRange(playerId, startDate, endDate).subscribe(
            (data:CalendarEvent[]) => {
              this.calendarEvents = data;
            }
          );
        }
      }
    )
  }

  public getEventDayString(calendarEvent: CalendarEvent) {
    let currentDate: Date = new Date();
    currentDate.setHours(0,0,0,0);

    let eventDate: Date = new Date(calendarEvent.startDateTime);
    eventDate.setHours(0,0,0,0);

    let dateDiff = eventDate.getDate() - currentDate.getDate();
    if (dateDiff==0) {
      return "Today";
    } else if (dateDiff == 1) {
      return "Tomorrow";
    } else if (dateDiff < 7) {
      return formatDate(eventDate, "EEEE", this.locale);
    } else {
      return formatDate(eventDate, "MMM d", this.locale);
    }
  }

}
