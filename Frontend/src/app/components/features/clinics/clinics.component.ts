import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Clinic } from 'src/app/data-objects/data-objects.module';
import { ClinicsService } from 'src/app/services/data/clinics.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { PagerComponent } from '../../ui/pager/pager.component';


@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.css']
})
export class ClinicsComponent implements OnInit, OnDestroy {

  @ViewChild('editTeamModal') editTeamModal: ModalDirective | undefined;
  @ViewChild('clinicPager', {static: false}) clinicPager: PagerComponent | undefined = undefined;
  

  public clinics: Clinic[] = [];
  public filteredClinics: Clinic[] = [];
  public displayClinics: Clinic[] = [];
  public editClinic: Clinic = Clinic.getDefault();
  public isEditing: boolean = false;
  public currentFilter: filterItem | null = null;

  public sportsFilters: filterItem[] = [];
  public coachFilters: filterItem[] = [];

  public savingVisible: boolean = false;
  public successVisible: boolean = false;
  public errorVisible: boolean = false;
  

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
          this.clinicService.retrieveClinicList(playerId, true).subscribe(
            (data:Clinic[]) => {
              this.clinics = data;
              this.applyCurrentFilter();
              this.buildClinicFilters(data);
              this.setStartingIndex(this.filteredClinics);
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

    this.clearStatus();
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
    this.isEditing = true;
  }

  public onCancelEdit() {
    this.isEditing = false;
    this.editClinic = Clinic.getDefault()
    this.clearStatus();
  }

  public saveClinic() {

    this.setSaving();
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
              (data: Clinic) => { this.loadClinics(); this.setSuccess();  }
            );
          }
        }
      );
    } else {
      this.auth.playerId$.subscribe(
        (playerId:number | null) => {
          if (playerId) {
            this.clinicService.updateClinic(playerId, this.editClinic.clinicId, this.editClinic).subscribe(
              (data: Clinic) => { this.loadClinics(); this.setSuccess(); }
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

  public isEditClinic(clinic: Clinic) {
    return this.editClinic.clinicId == clinic.clinicId;
  }

  public buildClinicFilters(clinics: Clinic[]): void {
    // for each clinic item, walk through the levels and add or create filter items
    this.sportsFilters.splice(0,this.sportsFilters.length);
    this.coachFilters.splice(0, this.coachFilters.length);

    let coaches: Set<string> = new Set<string>();

    for (let i: number = 0; i < clinics.length; i++) {
      let sportFilter: filterItem | undefined = this.sportsFilters.find(element => element.value === clinics[i].sport);
      if (!sportFilter) {
        sportFilter = new filterItem()
        sportFilter.displayText = clinics[i].sport;
        sportFilter.value = clinics[i].sport;
        sportFilter.level = 'sport';
        sportFilter.filterPredicate = function(clinic: Clinic, value: string) {console.log(clinic.sport + '|' + value); return clinic.sport == value;}
        this.sportsFilters.push(sportFilter);
      }

      let orgFilter: filterItem | undefined = sportFilter.subItems.find(element => element.value === (clinics[i].org.city + ' ' + clinics[i].org.name).trim());
      if (!orgFilter) {
        orgFilter = new filterItem()
        orgFilter.displayText = (clinics[i].org.city + ' ' + clinics[i].org.name).trim();
        orgFilter.value = orgFilter.displayText;
        orgFilter.level = 'org';
        orgFilter.filterPredicate = function(clinic: Clinic, value: string) {
          return (clinic.org.city + ' ' + clinic.org.name).trim() === value;
        }
        sportFilter.subItems.push(orgFilter);
      }

      this.addCoachToSet(clinics[i].headCoach, coaches);
      this.addCoachToSet(clinics[i].assistantCoach1, coaches);
      this.addCoachToSet(clinics[i].assistantCoach2, coaches);
      this.addCoachToSet(clinics[i].assistantCoach3, coaches);
      this.addCoachToSet(clinics[i].assistantCoach4, coaches);
    }

    coaches.forEach(coachName => {
      let coachFilter: filterItem = new filterItem();
      coachFilter.displayText = coachName;
      coachFilter.value = coachName;
      coachFilter.level = 'coach';
      coachFilter.filterPredicate = function(clinic: Clinic, value: string) {
        return clinic.headCoach === value || clinic.assistantCoach1 === value ||
              clinic.assistantCoach2 === value || clinic.assistantCoach3 === value ||
              clinic.assistantCoach4 === value;
      }
      this.coachFilters.push(coachFilter);
    });
  }


  private addCoachToSet(coach: string, set: Set<string>) {
    if(coach && coach.length > 0 && !set.has(coach)) {
      set.add(coach);
    }

  }

  public clearFilter() {
    this.currentFilter = null;
    this.applyCurrentFilter();
  }

  public setFilter(filter: filterItem) {
    this.currentFilter = filter;
    this.applyCurrentFilter();
  }

  public applyCurrentFilter() {
    
    let filterPredicate: (clinic: Clinic, value: string) => boolean = function(clinic: Clinic, value: string) {return true;}
    let value: string = '';
    
    if (this.currentFilter) {
      filterPredicate = this.currentFilter.filterPredicate;
      value = this.currentFilter.value;
    }
    
    this.filteredClinics.splice(0, this.filteredClinics.length);
    for (let i: number = 0; i< this.clinics.length; i++) {

      if (filterPredicate(this.clinics[i], value)) {        
        this.filteredClinics.push(this.clinics[i])
      }
    }
    
    this.setStartingIndex(this.filteredClinics);
    if(this.clinicPager) {
      this.clinicPager.pageData();
    }

  }

  public setSaving(): void {
    this.successVisible = false;
    this.errorVisible = false;
    this.savingVisible = true;
  }

  public setSuccess(): void {
    this.successVisible = true;
    this.errorVisible = false;
    this.savingVisible = false;
  }

  public setError(): void {
    this.successVisible = false;
    this.errorVisible = true;
    this.savingVisible = false;
  }

  public clearStatus(): void {
    this.successVisible = false;
    this.errorVisible = false;
    this.savingVisible = false;
  }
  
  
}



export class filterItem {

  public displayText: string = '';
  public value: string = '';
  public level: string = '';
  public subItems: filterItem[] = [];
  public filterPredicate: (clinic: Clinic, value: string) => boolean = function(clinic: Clinic, value: string) {return true;} 

  constructor() {}

  

  
}
