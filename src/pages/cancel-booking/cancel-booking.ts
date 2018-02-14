import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Observable} from "rxjs/Rx";
import {DataService}  from '../../providers/data-service';
@IonicPage()
@Component({
  selector: 'page-cancel-booking',
  templateUrl: 'cancel-booking.html',
})
export class CancelBooking {
	data;
  constructor(public alertCtrl:AlertController,public dataService:DataService,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewWillEnter(){
  	this.data=this.navParams.get('data');
  }
  cancelbooking(){
    if(this.data.paystatus=='Success'){
      let alert=this.alertCtrl.create({
          title:'Booking status',
          subTitle:'Payment already done.',
          buttons:['Ok']
        })         
        alert.present()
    }else{
      let loading = this.loadingCtrl.create({content: 'Please Wait...'});
      let dataa={booking_id:this.data.booking_id,booking_cancel_status:1}
      Observable.fromPromise(loading.present())
       .flatMap(data => this.dataService.cancelbooking(dataa))
       .subscribe(data  =>{
         loading.dismiss()
         let alert=this.alertCtrl.create({
                title:'Booking status',
                subTitle:'Cancelled Successfully',
                buttons:['Ok']
              })         
              alert.present()
              alert.onDidDismiss(()=>{
                this.navCtrl.pop();
              })
       },err=>{
          loading.dismiss()
          let alert=this.alertCtrl.create({
                title:'Something Went Wrong',
                subTitle:'Please Try Again',
                buttons:['Ok']
              })         
              alert.present()
       }) 
    }
  }
}
