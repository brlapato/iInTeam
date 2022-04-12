import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SwimEvent, SwimMeet } from 'src/app/data-objects/swim-data-objects.module';
import { SwimTeamService } from 'src/app/services/data/swim-team.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { StatusIconSettings } from '../../ui/status-icon/status-icon.component';

@Component({
  selector: 'app-swim-meet',
  templateUrl: './swim-meet.component.html',
  styleUrls: ['./swim-meet.component.css']
})
export class SwimMeetComponent implements OnInit {

  teamId: number = -1;
  meetId: number = -1;

  savedSwimMeet: SwimMeet = SwimMeet.getDetault();
  editedSwimMeet: SwimMeet = SwimMeet.getDetault();

  editSwimEvent: SwimEvent = SwimEvent.getDefault();
  editSwimEventSeedTimeStr: string = "";
  editSwimEventSplitTimeStr: string = "";
  editSwimEventTotalTimeStr: string = "";

  swimEventStatusIconSettings: StatusIconSettings = new StatusIconSettings();

  startDate: Date = new Date();
  newStartDateStr: string = "";
  startTimeStr: string = "";
  endTimeStr: string = "";
  
  canSwitchEditMode: boolean = true;
  isEditing: boolean = true;
  isSaving: boolean = true;

  constructor(
    public auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private swimTeamService: SwimTeamService,
    
  ) { }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.params['teamId'];
    this.meetId = this.route.snapshot.params['meetId'];

    if (this.meetId == -1) {
      this.editedSwimMeet = this.savedSwimMeet;
      this.editedSwimMeet.teamId = this.teamId;
      this.canSwitchEditMode = false;
      this.isEditing = true;
      
    } else {

      this.canSwitchEditMode = true;
      this.isEditing = false;
      this.loadSwimMeet(this.meetId);
    }
    
  }

  public loadSwimMeet(meetId: number) {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) {
            this.swimTeamService.getSwimMeet(playerId, this.teamId, meetId).subscribe(
              (data: SwimMeet) => { 
                  this.savedSwimMeet = data; 
                  this.setDates(data.startDateTime, data.endDateTime);
              }
            );
          }
      }
    );
  }

  public setDates(startDate: Date, endDate: Date) {
    this.startDate = startDate;
    let startDateTime = new Date(startDate);
    let endDateTime = new Date(endDate);
    this.startTimeStr = startDateTime.getHours().toString().padStart(2, "0") + ":" + startDateTime.getMinutes().toString().padStart(2, "0");
    this.endTimeStr = endDateTime.getHours().toString().padStart(2, "0") + ":" + endDateTime.getMinutes().toString().padStart(2, "0");
  }

  public editSwimMeet() {

    SwimMeet.copyTo(this.savedSwimMeet, this.editedSwimMeet);
    this.isEditing = true;
  }

  public saveSwimMeet() {
 
    //save meet for real
    let startDateStr = "";
    if (this.newStartDateStr.length > 0) {
      startDateStr = new Date(this.newStartDateStr + "T00:00:00").toDateString();
    } else {
      startDateStr = new Date(this.startDate).toDateString();
    }

    this.editedSwimMeet.startDateTime = new Date(startDateStr + " " + this.startTimeStr + "Z");
    this.editedSwimMeet.endDateTime = new Date(startDateStr + " " + this.endTimeStr + "Z");
      
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId ) { 
          let serviceFunction: Observable<SwimMeet>;
          if (this.editedSwimMeet.meetId == -1) {
            serviceFunction = this.swimTeamService.createSwimMeet(playerId, this.teamId, this.editedSwimMeet);
          } else {
            serviceFunction = this.swimTeamService.updateSwimMeet(playerId, this.teamId, this.editedSwimMeet);

          }
          serviceFunction.subscribe(
            (data: SwimMeet) => { 
                
                SwimMeet.copyTo(data, this.savedSwimMeet);
                this.setDates(this.savedSwimMeet.startDateTime, this.savedSwimMeet.endDateTime);
                this.canSwitchEditMode = true;
                this.isEditing = false;
             }
          );
          
        }
      }
    )
  }

  public cancelSwimMeetEdit() {
    this.isEditing = false;
  }

  public navigateBack() {
    this.router.navigate(['teams', this.teamId]);
  }

  public deleteSwimMeet(swimMeet: SwimMeet) {
    if(confirm('Are you sure you want to delete this swim meet?')) {
      this.auth.playerId$.subscribe(
        (playerId:number | null) => {
          if (playerId) {
              this.swimTeamService.deleteSwimMeet(playerId, this.teamId, this.savedSwimMeet).subscribe(
                (data: any) => {
                  this.navigateBack();
                }
              );
            }
        }
      );
    }
  }

  


  public resetSwimEventForm(): void {
    StatusIconSettings.clearStatus(this.swimEventStatusIconSettings);
    SwimEvent.copyTo(SwimEvent.getDefault(), this.editSwimEvent);
    this.editSwimEventSeedTimeStr = "";
    this.editSwimEventSplitTimeStr = "";
    this.editSwimEventTotalTimeStr = "";
  }

  public saveSwimEvent(): void {

    StatusIconSettings.setSaving(this.swimEventStatusIconSettings);

    // parse time inputs and set the editSwimEvent object
    this.editSwimEvent.seedTimeSec = this.parseTimeInput(this.editSwimEventSeedTimeStr);
    this.editSwimEvent.splitTimeSec = this.parseTimeInput(this.editSwimEventSplitTimeStr);
    this.editSwimEvent.totalTimeSec = this.parseTimeInput(this.editSwimEventTotalTimeStr);

    if (this.editSwimEvent.totalDistance != null && this.editSwimEvent.relayNumber != null) {
      this.editSwimEvent.legDistance = this.editSwimEvent.totalDistance / this.editSwimEvent.relayNumber;
    } else {
      this.editSwimEvent.legDistance = null;
    }

    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) {
          let serviceFunction: Observable<SwimEvent>;
          if (this.editSwimEvent.swimEventId == -1) {
            serviceFunction = this.swimTeamService.createSwimEvent(playerId, this.teamId, this.savedSwimMeet.meetId, this.editSwimEvent);
          } else {
            serviceFunction = this.swimTeamService.updateSwimEvent(playerId, this.teamId, this.savedSwimMeet.meetId, this.editSwimEvent);
          }
          serviceFunction.subscribe(
            (data: SwimEvent) => { 
              SwimEvent.copyTo(data, this.editSwimEvent);
              StatusIconSettings.setSuccess(this.swimEventStatusIconSettings);
             },
            (error: any) => {
              StatusIconSettings.setError(this.swimEventStatusIconSettings);
            }
          );
        }
      }
    );

    

    
    
;
  }

  public parseTimeInput(text: string): number {
    let parts: string[] = text.split(':');
    if (parts.length > 1) {
      let min = +parts[0];
      let seconds = +parts[1];
      return min * 60 + seconds;
    } else {
      return +parts[0];
    }
  }

  public onChangeSwimEventType(changeEventArgs: any) {

    if(!this.isSwimEventIM(this.editSwimEvent)) {
      this.editSwimEvent.stroke = this.editSwimEvent.eventType;
    }
  }

  public onChangeSwimEventRelay(changeEventArgs: any) {
    if(!this.isSwimEventRelay(this.editSwimEvent)) {

      this.editSwimEvent.relayLeg = null;
    }
  }

  public onChangeSwimEventSplitTime(changeEventArgs: any) {

    if(!this.isSwimEventRelay(this.editSwimEvent)) {
      this.editSwimEventTotalTimeStr = this.editSwimEventSplitTimeStr;
    }
  }

  public isSwimEventRelay(swimEvent: SwimEvent) {
    if (swimEvent.relayNumber == null) {
      return false;
    } else {
      return swimEvent.relayNumber > 1;
    }
  }

  public isSwimEventIM(swimEvent: SwimEvent) {
    if (swimEvent.eventType == null) {
      return false;
    } else {
      return swimEvent.eventType == 'IM';
    }
  }

  

}
