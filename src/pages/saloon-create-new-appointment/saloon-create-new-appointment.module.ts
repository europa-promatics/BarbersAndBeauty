import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaloonCreateNewAppointmentPage } from './saloon-create-new-appointment';

@NgModule({
  declarations: [
    SaloonCreateNewAppointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(SaloonCreateNewAppointmentPage),
  ],
  exports: [
    SaloonCreateNewAppointmentPage
  ]
})
export class SaloonCreateNewAppointmentPageModule {}
