import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { InstructionsComponent } from './instructions/instructions.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'gameslist', component: GameListComponent },
  { path: 'instructions', component: InstructionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
