import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ThermometerModule} from 'ng-thermometer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ThermometerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
