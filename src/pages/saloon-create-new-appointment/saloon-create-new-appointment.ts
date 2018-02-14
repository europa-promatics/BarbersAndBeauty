import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,LoadingController } from 'ionic-angular';
import {DataService } from "../../providers/data-service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable} from "rxjs/Rx";
@IonicPage()
/**
 * Generated class for the SaloonCreateNewAppointmentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-saloon-create-new-appointment',
  templateUrl: 'saloon-create-new-appointment.html',
})
export class SaloonCreateNewAppointmentPage {

  name
  cost
  time
  description
  addservice:FormGroup
  employee_data
  eid
  my_employee_data
  employeeinfo
  owner_name
  clientData=[]
  serviceData=[]
  service_name
  client_name
  selected_service
  start_time
  end_time
  notes
  date
  selecteddate
  customer_id
  salon_id
  endtime
  employee_id
  starttime
  minedata=[];
  data=[];
  service_id
  total_amount
  constructor(public navCtrl: NavController,private dataservice :DataService,public formBuilder: FormBuilder, public navParams: NavParams, public viewCtrl: ViewController,public alertCtrl:AlertController,public loadingCtrl: LoadingController) {

    // let emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let name= /^([a-zA-Z ]){1,30}$/;
    let namevalidation=/^[^-\s][a-zA-Z_\s-]+$/
    let numberregex=/^\d+$/;
    let descrptionregex=/^[^-\s][a-zA-Z0-9_\s-]+$/
    this.addservice = formBuilder.group({
        service_name: ['',Validators.compose([Validators.required])],
		client_name:['',Validators.compose([Validators.required])],
        start_time : ['',Validators.compose([Validators.required])],
        notes : ['',Validators.compose([Validators.required])],
		employee_id: localStorage['employeeid'],
		date : ['',Validators.compose([Validators.required])],
		salon_id: localStorage['salonid']
		
		
        });
  }
  ngOnInit(){
	 if(localStorage['usertype']==2){	
		 this.eid=localStorage['employeeid']
		 //alert(this.eid)
	 }else{
		 this.eid=localStorage['salonid']
		// alert(this.eid)
	 }
    let loading = this.loadingCtrl.create({content: 'Loading'});
    Observable.of(loading).flatMap(loading => loading.present())
    .flatMap(data => Observable.forkJoin(this.dataservice.myclient(),this.dataservice.getSpecificService(this.eid)))
    .subscribe(data =>
      loading.dismiss().then(() =>{ 
        this.clientData=data[0].customerappointment
        this.serviceData=data[1].data
      }),error=>{
        let alert=this.alertCtrl.create({
          title:'Timeout',
          buttons:['Ok']
        })
        loading.dismiss();
        alert.present()
      }
    )
                     
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddService');
  }
  save(){
    this.viewCtrl.dismiss({service_id:this.addservice.controls['service_name'].value,
	 starttime:this.addservice.controls['start_time'].value,
	 employee_id:localStorage['employeeid'],
	 salon_id:localStorage['salonid'],
	 customer_id:this.addservice.controls['client_name'].value,
	 selecteddate:this.addservice.controls['date'].value,
	})
 }
  cancel(){
    this.viewCtrl.dismiss();
  }

}
