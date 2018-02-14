import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerCategories } from './customer-categories';
import {DataService}  from '../../providers/data-service';
@NgModule({
  declarations: [
    CustomerCategories,
  ],
  imports: [
    IonicPageModule.forChild(CustomerCategories),
  ],
  exports: [
    CustomerCategories
  ],providers:[DataService]
})
export class CustomerCategoriesModule {}
