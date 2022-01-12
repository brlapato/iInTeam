import { Component, forwardRef, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions, EventInput, FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarEvent } from 'src/app/data-objects/data-objects.module';
import { CalendarService } from 'src/app/services/data/calendar.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    plugins: [ timeGridPlugin, dayGridPlugin ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    height: "auto",
    themeSystem: 'standard',
    datesSet: this.onDatesSet.bind(this)
  };

  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;

  constructor(
    private auth: AuthenticationService,
    private calendarService: CalendarService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    
   }

  ngOnInit(): void {
    forwardRef(() => Calendar);

    let startDate: Date = new Date();
    let endDate: Date = new Date();
          
    startDate.setDate(1);
    startDate.setHours(0,0,0,0);
    endDate.setMonth(startDate.getMonth()+1);

    this.loadEvents(startDate, endDate);
  }

  public loadEvents(startDate: Date, endDate: Date): void{
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) { 
          this.calendarService.retieveEventsOverRange(playerId, startDate, endDate).subscribe(
            
            (data:CalendarEvent[]) => {
              this.calendarOptions.events = this.convertToEventInput(data);
            }
          );
        }
      }
    )
  }

  public convertToEventInput(calendarEvents: CalendarEvent[]): EventInput[] {
    if(calendarEvents == null) {
      return [];
    }

    let events: EventInput[] = []
    calendarEvents.forEach(c => {
      events.push({
          title: c.name,
          start: c.startDateTime,
          end: c.endDateTime
        }
      );
    })

    
    return events;
  }

  async onDatesSet(eventArgs: any) {
    
    this.loadEvents(eventArgs.start, eventArgs.end);
  }

}
