import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import {DataService}  from '../../providers/data-service';
import { Observable} from "rxjs/Rx";
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-customer-employee-view-profile',
  templateUrl: 'customer-employee-view-profile.html',
})
export class CustomerEmployeeViewProfile {

employeeid;
http;
data;
employeeinfo;
employeedetails;
employeename;
employeemail;
employeenumber;
employeepic;
services;
employeecategory
directory
salonownerimage
salonownerid
salonownername
salonownernumber
salonownercategory
salonowneremail
salonownerbook
salonposition
employeestatus
salonstatus
mydata
show
status
salonduty
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public loadingCtrl: LoadingController,http:Http,public dataservice:DataService, public alertCtrl:AlertController) {
         //alert(localStorage['directory'])
         this.directory=localStorage['directory'];
         this.http=http;
         this.data={}
         this.employeeid=this.navParams.get('employee_id')
         this.employeename=this.navParams.get('employeename')
         this.employeenumber=this.navParams.get('employeenumber')
         this.employeecategory=this.navParams.get('employeecategory')
         this.employeepic=this.navParams.get('employeeimage')
         this.employeemail=this.navParams.get('email')
         this.employeestatus=this.navParams.get('status')
         this.salonstatus=this.navParams.get('Salonstatus')
		// alert(this.employeecategory);

             if(this.salonstatus==1){
                  
                  this.salonduty='ON DUTY'
             }

             if(this.salonstatus==0){
                this.salonduty='OFF DUTY'   

             }
     
            if(this.employeestatus==1){
             
             this.status='ON DUTY'
              }

             if(this.employeestatus==0){
               this.status='OFF DUTY'   
               }

             if(this.salonownercategory==null){
              this.salonownercategory='No Category'
             }

         this.salonownercategory=this.navParams.get('salonownercategory')
         this.salonownerid=this.navParams.get('salonowner_id')
         this.salonownernumber=this.navParams.get('salonownernumber')
         this.salonowneremail=this.navParams.get('salonowneremail')
         this.salonownerimage=this.navParams.get('salonownerimage')
         this.salonownerbook=this.navParams.get('ownerbook')
         this.salonposition=this.navParams.get('position')
         this.salonownername=this.navParams.get('salonownername')
          
         
  }
  

employeebook(){
/*

    if(this.employeestatus==0){
           let alert=this.alertCtrl.create({
               title:'Sorry!',
               subTitle:'This Employee is OFF DUTY you can not Book',
                buttons:['Ok']
      })
      
      alert.present()

    }
    else{
     var employeebook=1
    this.navCtrl.push('CustomerCheckAvailability',{employeename: this.employeename,pic:this.employeepic,employeeid:this.employeeid,employeebook:employeebook})  
    }
	
*/

          
 let loading = this.loadingCtrl.create({content:'Please Wait ...'
          });
         Observable.fromPromise(loading.present())
          .flatMap(data => this.dataservice.CheckService(this.navParams.get('service'),this.employeeid, 1))
               .subscribe(data =>
        loading.dismiss().then(() => {
          this.mydata = data
                        this.show=data.status
             if(this.show=="true"){
                 var employeebook=1
    this.navCtrl.push('CustomerCheckAvailability',{employeename: this.employeename,pic:this.employeepic,employeeid:this.employeeid,employeebook:employeebook})  
                             }
                       else {

    
    let alert = this.alertCtrl.create({
               title: 'Operation Aborted!',
               subTitle: 'This employee do not provide this service',
               buttons: ['OK']
             });
        alert.present();
      //  this.navCtrl.pop()
		}


}
),
   error =>
             loading.dismiss().then(() => {
let alert=this.alertCtrl.create({
        title:'Timeout',
        subTitle:'Please Try Again',
        buttons:['Ok']
      })
      loading.dismiss();
      alert.present()

})



        )
	
}

employeeimg(){
  this.navCtrl.push('CustomerEmployeePreviousWorkImages',{employeeid:this.employeeid})
}

ownerbook(){

  /* if(this.salonstatus==0){
       let alert=this.alertCtrl.create({
               title:'Sorry!',
               subTitle:'This Salon Owner is OFF DUTY you can not Book',
               buttons:['Ok']
      })
      
      alert.present() 
    }

   else{
     var salonbook=1
 this.navCtrl.push('CustomerCheckAvailability',{salonownername:this.salonownername,salonownerpic:this.salonownerimage,salonownerid:this.salonownerid,salonbook:salonbook}) 
    }*/
	
	let loading = this.loadingCtrl.create({content:'Please Wait ...'
          });
         Observable.fromPromise(loading.present())
          .flatMap(data => this.dataservice.CheckService(this.navParams.get('service'),this.salonownerid, 0))
               .subscribe(data =>
        loading.dismiss().then(() => {
          this.mydata = data
                        this.show=data.status
             if(this.show=="true"){
   if(this.salonstatus==0){
       let alert=this.alertCtrl.create({
               title:'Sorry!',
               subTitle:'This Salon Owner is OFF DUTY you can not Book',
               buttons:['Ok']
      })
      
      alert.present() 
    }

   else{
     var salonbook=1
 this.navCtrl.push('CustomerCheckAvailability',{salonownername:this.salonownername,salonownerpic:this.salonownerimage,salonownerid:this.salonownerid,salonbook:salonbook}) 
    }
}else{

  let alert = this.alertCtrl.create({
               title: 'Operation Aborted!',
               subTitle: 'The owner do not provide this service',
               buttons: ['OK']
             });
        alert.present();

}
}))


}//  ENDS OWNER BOOK
}
