import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { HockeyTeam, Team } from 'src/app/data-objects/data-objects.module';
import { HockeyTeamDetailComponent } from '../hockey-team-detail/hockey-team-detail.component';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit, OnChanges {

  @Input() team?: Team = Team.getDefault();
  @ViewChild('hockeyDetail') hockeyDetail: HockeyTeamDetailComponent | undefined;

  public hockeyTeam?: HockeyTeam = HockeyTeam.getDefault();

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.team?.sport==="Hockey") {
      this.hockeyTeam = this.team as HockeyTeam;
    }
}

}
