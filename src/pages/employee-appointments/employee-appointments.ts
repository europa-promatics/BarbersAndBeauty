import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController} from 'ionic-angular';
import {DataService}  from '../../providers/data-service';
import { Observable} from "rxjs/Rx";
import { ModalController } from 'ionic-angular';	
/**
 * Generated class for the EmployeeAppointments page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-employee-appointments',
  templateUrl: 'employee-appointments.html',
})
export class EmployeeAppointments {
bookings;
appoint
bookingdata
upcomingdata
pastdata
currentdata
past
up
  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public navParams: NavParams,
  	public loadingCtrl:LoadingController,public alertCtrl:AlertController,
   private dataservice:DataService) {
  		this.bookings="upcoming";
  		 this.past='false'
        this.up='false'
  	
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeAppointments');
  }
  cancelbooking(d){
   let loading = this.loadingCtrl.create({content: 'Please Wait...'});
    let dataa={booking_id:d.booking_id,booking_cancel_status:2}
    Observable.fromPromise(loading.present())
     .flatMap(data => this.dataservice.cancelbooking(dataa))
     .subscribe(data  =>{
       loading.dismiss()
       let alert=this.alertCtrl.create({
              title:'Booking status',
              subTitle:'Cancel Successfully',
              buttons:['Ok']
            })         
            alert.present()
            alert.onDidDismiss(()=>{
              this.ngOnInit();
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
  
ngOnInit(){
     
     let loading = this.loadingCtrl.create({content: 'Please Wait...'});
         Observable.fromPromise(loading.present())
         .flatMap(data => this.dataservice.EmployeebookingList())
         .subscribe(data =>
                    loading.dismiss().then(() =>{ 
                this.bookingdata = data
                this.upcomingdata= this.bookingdata.upcominginfo;
                this.pastdata=this.bookingdata.pastinfo; 
                this.currentdata=this.bookingdata.currentinfo; 
                    // if(this.pastdata==''){
                    //    // alert("no past info")

                    //    this.past='true';
                    //   }
                    // else if (this.currentdata=='')
                    //  {
                    //       alert("no current data")
                    // }   


                    if(this.pastdata=='' && this.upcomingdata==''){
                       // alert("no past info")

                       this.past='true'
                       this.up='true'

                      }
                    else if (this.pastdata=='')
                     {
                           this.past='true'
                          
                    }  
                    else if(this.upcomingdata==''){
                      this.up='true'
                    }    
                                               }),
                      error =>
                      loading.dismiss().then(() => {
                           let alert = this.alertCtrl.create({
                      title: 'ALERT!',
                      subTitle: 'Something Went Wrong',
                      buttons: ['ok']
                          });
                    alert.present(); 
                      })
                    ); 

  }
  
   newAppointment(){
	   let modal = this.modalCtrl.create('SaloonCreateNewAppointmentPage');
    modal.present();
	modal.onDidDismiss(formdata => {
	 //alert(JSON.stringify(data));
   let loading = this.loadingCtrl.create({content: 'Loading...'});
        Observable.fromPromise(loading.present())
        .flatMap(data => this.dataservice.add_appointment(formdata.service_id,formdata.starttime,formdata.salon_id,formdata.salon_id,formdata.customer_id,formdata.selecteddate))
        .subscribe(data =>
             loading.dismiss().then(() => {
                let alert=this.alertCtrl.create({
                  title:'Success!',
                  subTitle:'New Appointment Added Successfully!',
                  buttons:['OK']
                })
                loading.dismiss();
                alert.present()
				
            }),error =>
              loading.dismiss().then(() => {
                let alert=this.alertCtrl.create({
                  title:'Timeout',
                  subTitle:'Please Try Again',
                  buttons:['Ok']
                })
                loading.dismiss();
                alert.present()
              })
        
	)})
   }

}
