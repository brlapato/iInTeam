import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/features/dashboard/dashboard.component';
import { PlayerComponent } from './components/features/player/player.component';
import { TeamsComponent } from './components/features/teams/teams.component';
import { WelcomeComponent } from './components/navigation/welcome/welcome.component';
import { HockeyGame } from './data-objects/data-objects.module';
import { AuthGuard } from '@auth0/auth0-angular';
import { HockeyGameComponent } from './components/games/hockey-game/hockey-game.component';
import { LandingComponent } from './components/navigation/landing/landing.component';
import { HockeyGameInGameComponent } from './components/games/hockey-game-in-game/hockey-game-in-game.component';
import { ClinicsComponent } from './components/features/clinics/clinics.component';
import { CreatePlayerComponent } from './components/player/create-player/create-player.component';
import { EditProfileComponent } from './components/player/edit-profile/edit-profile.component';
import { CalendarComponent } from './components/features/calendar/calendar.component';

const routes: Routes = [
  { path:'login', component:WelcomeComponent },
  { path:'landing', component:LandingComponent, canActivate:[AuthGuard] },
  { path:'createPlayer', component:CreatePlayerComponent, canActivate:[AuthGuard] },
  { path:'editProfile', component:EditProfileComponent, canActivate:[AuthGuard] },
  { path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard] },
  { path:'teams', component:TeamsComponent, canActivate:[AuthGuard] },
  { path:'teams/:selectedId', component:TeamsComponent, canActivate:[AuthGuard] },
  { path:'player', component:PlayerComponent, canActivate:[AuthGuard] },
  { path:'clinics', component:ClinicsComponent, canActivate:[AuthGuard] },
  { path:'calendar', component:CalendarComponent, canActivate:[AuthGuard] },
  { path:'hockeyGame/:teamId/:gameId', component:HockeyGameComponent, canActivate:[AuthGuard]},
  { path:'hockeyGameInGame/:teamId/:gameId', component:HockeyGameInGameComponent, canActivate:[AuthGuard]},
  { path:'', component:WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
