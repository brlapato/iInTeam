import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SwimMeet } from 'src/app/data-objects/data-objects.module';
import { SwimTeamService } from 'src/app/services/data/swim-team.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

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

}
