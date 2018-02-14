import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalonEditCategoryPage } from './salon-edit-category';

@NgModule({
  declarations: [
    SalonEditCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(SalonEditCategoryPage),
  ],
  exports: [
    SalonEditCategoryPage
  ]
})
export class SalonEditCategoryPageModule {}
