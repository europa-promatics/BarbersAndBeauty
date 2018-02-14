import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@IonicPage()
@Component({
selector: 'page-add-service',
templateUrl: 'add-service.html',
})
export class AddService {
  name
  cost
  time
  description
  addservice:FormGroup
  employee_data
  my_employee_data
  owner_name
  selected_service
  data=[];
  constructor(public navCtrl: NavController,public formBuilder: FormBuilder, public navParams: NavParams, public viewCtrl: ViewController,public alertCtrl:AlertController) {
    // let emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.employee_data =this.navParams.get('data')
    this.my_employee_data=this.employee_data.employeeinfo
    this.owner_name=this.employee_data.salonowner.full_name
    this.data.push({id:this.employee_data.salonowner.employee_id,name:this.employee_data.salonowner.full_name})
    for(let a of this.my_employee_data){
      this.data.push({id:a.employee_id,name:a.full_name});
    }
    let name= /^([a-zA-Z ]){1,30}$/;
    let namevalidation=/^[^-\s][a-zA-Z_\s-]+$/
    let numberregex=/^\d+$/;
    let descrptionregex=/^[^-\s][a-zA-Z0-9_\s-]+$/
    this.addservice = formBuilder.group({
        name: ['',Validators.compose([Validators.pattern(namevalidation),Validators.required])],
        cost: ['',Validators.compose([Validators.pattern("[0-9]*"),Validators.required])],
        time : ['',Validators.compose([Validators.required])],
        description : ['', Validators.compose([Validators.pattern(descrptionregex),Validators.required])]
        });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddService');
  }
  save(){
    this.viewCtrl.dismiss({a:this.addservice.controls['name'].value,b:this.addservice.controls['cost'].value,c:this.addservice.controls['time'].value,d:this.addservice.controls['description'].value,e:this.selected_service});
  }
  cancel(){
    this.viewCtrl.dismiss();
  }
}
//   if(this.name=='undefined'||this.cost=='undefined'||this.time=='undefined'||this.description=='undefined')
// {

//    // let alert = this.alertCtrl.create({
//    //       title: 'Please Fill All Fields',

//    //      buttons: ['Dismiss']
//    //      });
//    //      alert.present();


// }
