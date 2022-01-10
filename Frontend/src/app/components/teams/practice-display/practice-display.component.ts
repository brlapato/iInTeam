import { Component, Inject, Input, LOCALE_ID, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Practice, Team } from 'src/app/data-objects/data-objects.module';
import { PracticesService } from 'src/app/services/data/practices.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-practice-display',
  templateUrl: './practice-display.component.html',
  styleUrls: ['./practice-display.component.css']
})
export class PracticeDisplayComponent implements OnChanges {

  @Input() teamId: number = -1;
  public practices: Practice[] = [];
  public displayItems: Practice[] = [];
  public startingDisplayIndex = 1;

  public editPractice: Practice = Practice.getDefault();

  startDate: Date = new Date();
  newStartDate: string = "";
  startTime: string = "";
  endTime: string = "";
  

  constructor(
    private practicesService: PracticesService,
    private auth: AuthenticationService,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  public getPracticeDisplayDate(practice: Practice) {
     return `${formatDate(practice.startDateTime, 'MM/dd', this.locale)} ${formatDate(practice.startDateTime, 'h:mm a', this.locale)}-${formatDate(practice.endDateTime, 'h:mm a', this.locale)}`;
  }

 
  ngOnChanges(changes: SimpleChanges) {
    this.loadPractices();
  } 

  public loadPractices() {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId && this.teamId != -1) { 
          this.practicesService.retrievePractices(playerId, this.teamId).subscribe(
            (data:Practice[]) => {
              this.practices = data;
              this.setStartingIndex(data);
            }
          );
        }
      }
    )
  }

  public setStartingIndex(practices: Practice[]) {
    if (practices.length == 0) {
      this.startingDisplayIndex = -1;
    } else {
      let currentDate = new Date();
      for (let i=0; i < practices.length; i++) {
        if ( currentDate < new Date(practices[i].startDateTime) ) {
          this.startingDisplayIndex = i;
          return;
        }
      }

      this.startingDisplayIndex = practices.length - 1;
    }
  }

  public onPagedItemsChanged(pagedItems: any) {
    this.displayItems = pagedItems;
  }

  public savePractice() {
    let startDateStr = "";
    if (this.newStartDate.length > 0) {
      startDateStr = new Date(this.newStartDate + "T00:00:00").toDateString();
    } else {
      startDateStr = new Date(this.startDate).toDateString();
    }
      
    
    this.editPractice.startDateTime = new Date(startDateStr + " " + this.startTime + "Z");
    this.editPractice.endDateTime = new Date(startDateStr + " " + this.endTime + "Z");

    if(this.editPractice.teamEventId == -1) {
      this.auth.playerId$.subscribe(
        (playerId:number | null) => {
          if (playerId) {
            this.practicesService.createPractice(playerId,this.teamId, this.editPractice).subscribe(
              (data: Practice) => { this.loadPractices(); }
            );
          }
        }
      );
    } else {
      this.auth.playerId$.subscribe(
        (playerId:number | null) => {
          if (playerId) {
            this.practicesService.updatePractice(playerId, this.teamId, this.editPractice.teamEventId, this.editPractice).subscribe(
              (data: Practice) => { this.loadPractices(); }
            );
          }
        }
      );
    }
  }

  public onEditPractice(practice:Practice) {
    let newPractice: Practice = Practice.getDefault();

    if( practice != null ) {
      Practice.copyTo(practice, newPractice);
      this.startDate = practice.startDateTime;
      let startDateTime = new Date(practice.startDateTime);
      let endDateTime = new Date(practice.endDateTime);
      this.startTime = startDateTime.getHours().toString().padStart(2, "0") + ":" + startDateTime.getMinutes().toString().padStart(2, "0");
      this.endTime = endDateTime.getHours().toString().padStart(2, "0") + ":" + endDateTime.getMinutes().toString().padStart(2, "0");
    }

    this.editPractice = newPractice;
  }

  public onDeletePractice(practice:Practice) {
    if(confirm('Are you sure you want to delete this practice?')) {
      this.auth.playerId$.subscribe(
        (playerId:number | null) => {
          if (playerId) {
            this.practicesService.deletePractice(playerId, this.teamId, practice.teamEventId).subscribe(
              (data: Practice) => { this.loadPractices(); }
            );
          }
        }
      );
    }
  }

  

}
