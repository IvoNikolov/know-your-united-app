import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'team', loadChildren: './pages/team/team.module#TeamPageModule' },
  { path: 'player-details', loadChildren: './pages/player-details/player-details.module#PlayerDetailsPageModule' },
  { path: 'timer', loadChildren: './pages/timer/timer.module#TimerPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
