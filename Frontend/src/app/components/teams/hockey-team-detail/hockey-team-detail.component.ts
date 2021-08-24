import { Component, Input, OnInit } from '@angular/core';
import { Team, HockeyTeam } from 'src/app/data-objects/data-objects.module';

@Component({
  selector: 'app-hockey-team-detail',
  templateUrl: './hockey-team-detail.component.html',
  styleUrls: ['./hockey-team-detail.component.css']
})
export class HockeyTeamDetailComponent implements OnInit {

  @Input() team?: HockeyTeam = HockeyTeam.getDefault();

  constructor() { }

  ngOnInit(): void {
  }

}
