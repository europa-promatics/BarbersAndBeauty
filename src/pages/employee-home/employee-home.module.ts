import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeHome } from './employee-home';
import {DataService}  from '../../providers/data-service';
@NgModule({
  declarations: [
    EmployeeHome,
  ],
  imports: [
    IonicPageModule.forChild(EmployeeHome),
  ],
  exports: [
    EmployeeHome
  ],providers:[DataService]
})
export class EmployeeHomeModule {}
