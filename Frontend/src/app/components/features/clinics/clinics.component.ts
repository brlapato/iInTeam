import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Clinic } from 'src/app/data-objects/data-objects.module';
import { ClinicsService } from 'src/app/services/data/clinics.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';


@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.css']
})
export class ClinicsComponent implements OnInit, OnDestroy {

  @ViewChild('editTeamModal') editTeamModal: ModalDirective | undefined;

  public clinics: Clinic[] = [];
  public displayClinics: Clinic[] = [];
  public editClinic: Clinic = Clinic.getDefault();

  startDate: Date = new Date();
  newStartDate: string = "";
  startTime: string = "";
  endTime: string = "";
  startingDisplayIndex: number = -1;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private clinicService: ClinicsService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.configureTable();
    this.loadClinics();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  configureTable(): void {
    this.dtOptions = {
      lengthMenu: [10],
      paging: false,
      pagingType: 'numbers',
      info: false,
      search: false
    };
  }

  public loadClinics() {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) { 
          this.clinicService.retrieveTeamList(playerId, true).subscribe(
            (data:Clinic[]) => {
              this.setStartingIndex(data);
              this.clinics = data;
              this.dtTrigger.next();
            }
          );
        }
      }
    )
  }

  public setStartingIndex(clinics: Clinic[]) {
    if (clinics.length == 0) {
      this.startingDisplayIndex = -1;
    } else {
      let currentDate = new Date();
      for (let i=0; i < clinics.length; i++) {
        
        if ( currentDate < new Date(clinics[i].startDateTime) ) {
          this.startingDisplayIndex = i;
          return;
        }
      }

      this.startingDisplayIndex = clinics.length - 1;
    }
  }

  public onEditClinic(clinic: Clinic) {
    this.onEditOpened(clinic);
  }

  public onEditOpened(clinic: Clinic | null) {

    let newClinic: Clinic = Clinic.getDefault();

    if( clinic != null ) {
      Clinic.copyTo(clinic, newClinic);
      this.startDate = clinic.startDateTime;
      let startDateTime = new Date(clinic.startDateTime);
      let endDateTime = new Date(clinic.endDateTime);
      this.startTime = startDateTime.getHours().toString().padStart(2, "0") + ":" + startDateTime.getMinutes().toString().padStart(2, "0");
      this.endTime = endDateTime.getHours().toString().padStart(2, "0") + ":" + endDateTime.getMinutes().toString().padStart(2, "0");
    }

    this.editClinic = newClinic;
  }

  public saveClinic() {

    let startDateStr = "";
    if (this.newStartDate.length > 0) {
      startDateStr = new Date(this.newStartDate + "T00:00:00").toDateString();
    } else {
      startDateStr = new Date(this.startDate).toDateString();
    }
      
    
    this.editClinic.startDateTime = new Date(startDateStr + " " + this.startTime + "Z");
    this.editClinic.endDateTime = new Date(startDateStr + " " + this.endTime + "Z");

    if(this.editClinic.clinicId == -1) {
      this.auth.playerId$.subscribe(
        (playerId:number | null) => {
          if (playerId) {
            this.clinicService.createClinic(playerId, this.editClinic).subscribe(
              (data: Clinic) => { this.loadClinics(); }
            );
          }
        }
      );
    } else {
      this.auth.playerId$.subscribe(
        (playerId:number | null) => {
          if (playerId) {
            this.clinicService.updateClinic(playerId, this.editClinic.clinicId, this.editClinic).subscribe(
              (data: Clinic) => { this.loadClinics(); }
            );
          }
        }
      );
    }
  }

  public deleteClinic(clinic: Clinic) {
    if(confirm('Are you sure you want to delete this clinic?')) {
      this.auth.playerId$.subscribe(
        (playerId:number | null) => {
          if (playerId) {
            this.clinicService.deleteClinic(playerId, clinic.clinicId).subscribe(
              (data: Clinic) => { this.loadClinics(); }
            );
          }
        }
      );
    }
    
  }

  public onPagedItemsChanged(pagedClinics: Clinic[]) {
    this.displayClinics = pagedClinics;
  }

  public isClinicComplete(clinic: Clinic) {
    return new Date(clinic.endDateTime) < new Date();
  }

}
