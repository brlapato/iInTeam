import { Component, OnDestroy, OnInit } from '@angular/core';
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

  public clinics: Clinic[] = [];
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
              this.clinics = data;
              this.dtTrigger.next();
            }
          );
        }
      }
    )
  }

}
