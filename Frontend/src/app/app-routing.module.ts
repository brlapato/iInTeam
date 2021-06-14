import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/features/dashboard/dashboard.component';
import { PlayerComponent } from './components/features/player/player.component';
import { TeamsComponent } from './components/features/teams/teams.component';
import { WelcomeComponent } from './components/navigation/welcome/welcome.component';

const routes: Routes = [
  { path:'', component:WelcomeComponent },
  { path:'login', component:WelcomeComponent },
  { path:'dashboard', component:DashboardComponent },
  { path:'teams', component:TeamsComponent },
  { path:'player', component:PlayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
