import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/data-objects/data-objects.module';
import { TeamService } from 'src/app/services/data/team.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  public teamLoaded: boolean = false;
  public teamList: Team[] = [];
  public groupedTeams: TeamGroup[] = [];
  public groupBy: [string, string] = ['active', 'ASC']
  selectedTeam?: Team;
  newStartDateStr: string = "";

  newTeam: Team = Team.getDefault();

  private LOCAL_STORAGE_GROUPBY_KEY: string = 'TEAM_GROUPBY'

  constructor(
    public auth: AuthenticationService,
    private route: ActivatedRoute,
    public teamService: TeamService
  ) { }
  

  ngOnInit(): void {
    this.setGrouping(this.getStoredGroupBy());

    let desiredTeamId = this.route.snapshot.params['selectedId'];
    if (desiredTeamId == null) {
      desiredTeamId = -1;
    }
    this.loadTeamList(desiredTeamId);
  }

  loadTeamList(selectedTeam: number) {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) {
          this.teamLoaded = false; 
          this.teamService.retrieveTeams(playerId).subscribe((data:Team[]) => {
            this.teamList = data;
            this.buildTeamCategories(this.teamList, this.groupBy);
            console.log(this.groupedTeams);
            for (let i=0; i < data.length; i++) {
              if (this.teamList[i].teamId == selectedTeam) {
                  this.onSelectTeam(this.teamList[i]);
              }
            }
          })
        }
      }
    );
  }

  
  onSelectTeam(team?: Team): void {
    this.selectedTeam = team;
  }

  onAddTeamOpened(): void {
    this.resetNewTeam();
  }

  createTeam(): boolean {
    
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId && this.newTeam) { 
          if (this.newStartDateStr.length > 0) {
            this.newTeam.startDate = new Date(this.newStartDateStr + "T00:00:00");
          } 
          this.teamService.createTeam(playerId, this.newTeam).subscribe(
            (data:Team) => {
              this.loadTeamList(data.teamId)
            }
          );
        }
      }
    )

    return true;
  }

  resetNewTeam():void {
    this.newTeam.name = "";
    this.newTeam.org.name = "";
    this.newTeam.org.city = "";
    this.newTeam.sport = "";
    this.newTeam.startDate = new Date();
    this.newTeam.season = "";
    this.newTeam.active = true;

  }

  buildTeamCategories(teams: Team[], groupBy: [string, string]): void {
    let groupMap: Map<string, TeamGroup> = new Map<string, TeamGroup>();
    for (let i:number =0; i< teams.length; i++) {

      // get group name for team
      let groupInfo: [string, string] = this.getTeamGroupName(groupBy[0], teams[i]);
      let groupName = groupInfo[0];
      let groupKey = groupInfo[1] + groupInfo[0];

      // Does the group exist?
      if (groupMap.has(groupKey)) {
        groupMap.get(groupKey)?.teams.push(teams[i]);
      } else {
        let newGroup = new TeamGroup();
        newGroup.groupName = groupName;
        newGroup.teams.push(teams[i]);
        groupMap.set(groupKey, newGroup);
      }
    }

    let sortedKeys: string[];
    if (groupBy[1] === 'DESC' ) {
      sortedKeys = Array.from(groupMap.keys()).sort((a, b) => (a > b ? -1 : 1));
    } else {
      sortedKeys = Array.from(groupMap.keys()).sort((a, b) => (a < b ? -1 : 1));
    }

    this.groupedTeams.splice(0, this.groupedTeams.length);
    sortedKeys.forEach(key => {
      let value:any = groupMap.get(key);
      if (value) {
        this.groupedTeams.push(value);
      }
    });

    
  }

  getTeamGroupName(groupBy: string, team: Team): [string, string] {
    switch(groupBy.toLocaleLowerCase())  {
      case 'active': {
        return team.active ? ['Current', '10_'] : ['Previous', '20_'];
      }
      case 'sport': {
        return [team.sport, ''];
      }
      case 'season': {
        return [team.season, ''];
      }
      case 'org': {
        return [(team.org.city + ' ' + team.org.name).trim(), ''];
      }
      default: {
        return [team.sport, ''];
      }
    }
  }

  setGrouping(newGroupBy: [string, string]) : void {
    this.groupBy = newGroupBy;
    this.buildTeamCategories(this.teamList, newGroupBy);
    this.setStoredGroupBy(newGroupBy);
  }

  isGroupBySelected(groupName: string) {
    return this.groupBy[0] === groupName;
  }

  getStoredGroupBy(): [string, string] {
    let cacheValue: string | null = localStorage.getItem(this.LOCAL_STORAGE_GROUPBY_KEY);

    console.log(cacheValue);
    if (cacheValue) {
      let cachedGroupBy: [string, string] = JSON.parse(cacheValue);
      return cachedGroupBy;
    } else {
      return ['active', 'ASC'];
    }
  }

  setStoredGroupBy(groupByValue: [string, string]) {
    localStorage.setItem(this.LOCAL_STORAGE_GROUPBY_KEY, JSON.stringify(groupByValue));
  }
}



export class TeamGroup {

  public groupSortVal: string | number = 1;
  public groupName: string = "";
  public teams: Team[] = [];

  constructor(){}
}
