import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThermometerComponent} from './thermometer.component';

@NgModule({
  declarations: [
    ThermometerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ThermometerComponent
  ]
})
export class ThermometerModule {
}
