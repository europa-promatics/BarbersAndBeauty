import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataService } from "../../providers/data-service"
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable} from "rxjs/Rx";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-salon-service-description',
  templateUrl: 'salon-service-description.html',
})
export class SalonServiceDescription {
mydata;
v=false;
leads
title
cost
time
description
addservice:FormGroup
employee_name
minedata
printdata
valid:boolean=true;
  constructor(private dataservice :DataService,public navCtrl: NavController,
             public navParams: NavParams,public formBuilder: FormBuilder,
             private alertCtrl: AlertController,
           	public loadingCtrl: LoadingController) {
  	          this.mydata= this.navParams.get('data')
              this.title   =this.mydata.title
              this.cost =this.mydata.cost
              this.time= this.mydata.time
              this.description =this.mydata.description
              this.employee_name=this.mydata.employee_name
              let numberregex=/^\d+$/;
              let name= /^([a-zA-Z ]){2,30}$/;
              let namevalidation=/^[^-\s][a-zA-Z_\s-]+$/;
              let descrptionregex=/^[^-\s][a-zA-Z0-9_\s-]+$/;
              this.addservice = formBuilder.group({
                title: ['', Validators.compose([Validators.pattern(namevalidation),Validators.required])],
                cost: ['', Validators.compose([Validators.pattern(numberregex), Validators.required])],
                time : ['', Validators.compose([Validators.required])],
                description : ['', Validators.compose([Validators.pattern(descrptionregex),Validators.required])]
              });
  }
  check(){
    if(this.time.split(':')[0]=='01'){
      if(parseInt(this.time.split(':')[1])<15){
        this.valid=false;
        // let alert = this.alertCtrl.create({
        //   title: 'Please select minimum 15 Minutes',
        //   buttons: ['Dismiss']
        // });
        // alert.present();
      }else{this.valid=true}
    }else{this.valid=true}
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SalonServiceDescription');
  }
  editprofile(){
    this.v=!this.v
  }
  submit(){
    if(this.addservice.controls['cost'].value==0){  
      let alert = this.alertCtrl.create({
      title: 'Service Cost Cannot be Zero',
      buttons: ['Dismiss']
      });
      alert.present();
    }else if(this.valid==false){
      let alert = this.alertCtrl.create({
        title: 'Duration Cannot be less then 15 Minutes',
        buttons: ['Dismiss']
      });
      alert.present();
    }else{
      let loading = this.loadingCtrl.create({content: 'Loading..'});
      Observable.fromPromise(loading.present())
      .flatMap(data => this.dataservice.edit_service(this.addservice.controls['title'].value,
          this.addservice.controls['cost'].value,
          this.addservice.controls['time'].value,
          this.addservice.controls['description'].value,this.mydata.id))
      .subscribe(data =>loading.dismiss().then(() =>{ 
          this.leads = data
          if(this.leads.message=="your data updated successfully"){
            let alert = this.alertCtrl.create({
            title: 'Service Description Updated Successfully',

            buttons: ['Dismiss']
            });
            alert.present();      
            this.navCtrl.pop()
          }
      }),error =>loading.dismiss().then(() => {}));
    }
  }
}