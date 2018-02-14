import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySalonHome } from './my-salon-home';
import {DataService}  from '../../providers/data-service';

@NgModule({
  declarations: [
    MySalonHome,
  ],
  imports: [
    IonicPageModule.forChild(MySalonHome),
  ],
  exports: [
    MySalonHome
  ],providers:[DataService]
})
export class MySalonHomeModule {}
