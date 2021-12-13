import { Component, OnInit } from '@angular/core';
import { PersonalGoal } from 'src/app/data-objects/data-objects.module';
import { PersonalGoalsService } from 'src/app/services/data/personal-goals.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-personal-goals',
  templateUrl: './personal-goals.component.html',
  styleUrls: ['./personal-goals.component.css']
})
export class PersonalGoalsComponent implements OnInit {

  public personalGoals: PersonalGoal[] = [];

  constructor(
    public auth: AuthenticationService,
    public personalGoalsService: PersonalGoalsService
  ) { }

  ngOnInit(): void {
    this.loadPersonalGoals();
  }

  private loadPersonalGoals() {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) {
          this.personalGoalsService.retrievePersonalGoals(playerId, true).subscribe((data:PersonalGoal[]) => {this.personalGoals = data;})
        }
      }
    );
  }

}
