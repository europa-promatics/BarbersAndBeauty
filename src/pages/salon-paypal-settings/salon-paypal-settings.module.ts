import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalonPaypalSettingsPage } from './salon-paypal-settings';

@NgModule({
  declarations: [
    SalonPaypalSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SalonPaypalSettingsPage),
  ],
  exports: [
    SalonPaypalSettingsPage
  ]
})
export class SalonPaypalSettingsPageModule {}
