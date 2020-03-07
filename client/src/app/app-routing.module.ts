import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { GameCreateComponent } from './components/game-create/game-create.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'gameslist', component: GameListComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'game/:id', component: GamePageComponent },
  { path: 'create', component: GameCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
