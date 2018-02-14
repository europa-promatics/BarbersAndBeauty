import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CancelBooking } from './cancel-booking';

@NgModule({
  declarations: [
    CancelBooking,
  ],
  imports: [
    IonicPageModule.forChild(CancelBooking),
  ],
  exports: [
    CancelBooking
  ]
})
export class CancelBookingModule {}
