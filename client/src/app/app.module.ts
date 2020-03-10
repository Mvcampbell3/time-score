import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GameDescriptionComponent } from './components/game-description/game-description.component';
import { GameCreateComponent } from './components/game-create/game-create.component';
import { GameEditComponent } from './components/game-edit/game-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    GameListComponent,
    GamePageComponent,
    InstructionsComponent,
    LoginComponent,
    HeaderComponent,
    LoaderComponent,
    ProfileComponent,
    GameDescriptionComponent,
    GameCreateComponent,
    GameEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
