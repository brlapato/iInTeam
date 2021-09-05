import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/features/dashboard/dashboard.component';
import { PlayerComponent } from './components/features/player/player.component';
import { TeamsComponent } from './components/features/teams/teams.component';
import { WelcomeComponent } from './components/navigation/welcome/welcome.component';
import { HockeyGame } from './data-objects/data-objects.module';
import { AuthGuard } from '@auth0/auth0-angular';
import { HockeyGameComponent } from './components/games/hockey-game/hockey-game.component';

const routes: Routes = [
  { path:'login', component:WelcomeComponent },
  { path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard] },
  { path:'teams', component:TeamsComponent, canActivate:[AuthGuard] },
  { path:'teams/:selectedId', component:TeamsComponent, canActivate:[AuthGuard] },
  { path:'player', component:PlayerComponent, canActivate:[AuthGuard] },
  { path:'hockeyGame/:teamId/:gameId', component:HockeyGameComponent, canActivate:[AuthGuard]},
  { path:'', component:WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
