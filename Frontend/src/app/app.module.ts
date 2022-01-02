import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from "angular-datatables";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/navigation/menu/menu.component';
import { DashboardComponent } from './components/features/dashboard/dashboard.component';
import { PlayerComponent } from './components/features/player/player.component';
import { TeamsComponent } from './components/features/teams/teams.component';
import { WelcomeComponent } from './components/navigation/welcome/welcome.component';
import { API_URL } from 'src/environments/environment';
import { ProfileSmallComponent } from './components/player/profile-small/profile-small.component';
import { SecurePipe } from './pipes/secure.pipe';
import { TeamSummaryComponent } from './components/teams/team-summary/team-summary.component';
import { TeamSummaryListComponent } from './components/teams/team-summary-list/team-summary-list.component';
import { TeamListItemComponent } from './components/teams/team-list-item/team-list-item.component';
import { TeamListComponent } from './components/teams/team-list/team-list.component';
import { TeamDetailComponent } from './components/teams/team-detail/team-detail.component';
import { HockeyTeamDetailComponent } from './components/teams/hockey-team-detail/hockey-team-detail.component';
import { TeamRecordComponent } from './components/teams/team-record/team-record.component';
import { PlayerStatsComponent } from './components/player/player-stats/player-stats.component';
import { HockeyGameListComponent } from './components/games/hockey-game-list/hockey-game-list.component';
import { HockeyGameListItemComponent } from './components/games/hockey-game-list-item/hockey-game-list-item.component';
import { HockeyGameComponent } from './components/games/hockey-game/hockey-game.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/navigation/login/login.component';
import { RecentGamesComponent } from './components/games/recent-games/recent-games.component';
import { HockeyGameCardComponent } from './components/games/hockey-game-card/hockey-game-card.component';
import { LandingComponent } from './components/navigation/landing/landing.component';
import { HockeyGameInGameComponent } from './components/games/hockey-game-in-game/hockey-game-in-game.component';
import { ProfileComponent } from './components/player/profile/profile.component';
import { PersonalGoalsComponent } from './components/player/personal-goals/personal-goals.component';
import { ProfileSummaryComponent } from './components/player/profile-summary/profile-summary.component';
import { HockeyTeamSummaryComponent } from './components/teams/hockey-team-summary/hockey-team-summary.component';
import { StatDisplayComponent } from './components/ui/stat-display/stat-display.component';
import { ClinicsComponent } from './components/features/clinics/clinics.component';
import { ClinicListItemComponent } from './components/clinics/clinic-list-item/clinic-list-item.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EventListComponent } from './components/calendar/event-list/event-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    PlayerComponent,
    TeamsComponent,
    WelcomeComponent,
    ProfileSmallComponent,
    SecurePipe,
    TeamSummaryComponent,
    TeamSummaryListComponent,
    TeamListItemComponent,
    TeamListComponent,
    TeamDetailComponent,
    HockeyTeamDetailComponent,
    TeamRecordComponent,
    PlayerStatsComponent,
    HockeyGameListComponent,
    HockeyGameListItemComponent,
    HockeyGameComponent,
    LoginComponent,
    RecentGamesComponent,
    HockeyGameCardComponent,
    LandingComponent,
    HockeyGameInGameComponent,
    ProfileComponent,
    PersonalGoalsComponent,
    ProfileSummaryComponent,
    HockeyTeamSummaryComponent,
    StatDisplayComponent,
    ClinicsComponent,
    ClinicListItemComponent,
    EventListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    AuthModule.forRoot({
      domain: 'dev-hockey43.us.auth0.com',
      clientId: 'sbJUIAi6tefnkox1oOrVpBgNKucjjpVT',
      audience: 'https://iInTeam.Hockey43.com',
      httpInterceptor: {
        allowedList: [`${API_URL}/*`],
      }
    })
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
