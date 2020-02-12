import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Angular2BulmaModule } from 'angular2-bulma';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Angular2BulmaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
