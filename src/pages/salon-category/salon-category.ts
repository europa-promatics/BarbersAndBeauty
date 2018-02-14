import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the SalonCategory page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-salon-category',
  templateUrl: 'salon-category.html',
})
export class SalonCategory {
    value1
    cbArr= [];
    cbChecked=[];
    salon_name
    address
    full_name
    email
    password
    confirm_password
    contact_number
    salon_description
    usertype
    latitude
    longitude
    submitted = false; 
    data      
       http;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewctrl:ViewController,public  loadingCtrl:LoadingController,http:Http,
 private alertCtrl: AlertController) {
  	 this.cbArr = [
     {name:'BARBER',id:1}, {name:'HAIR STYLIST',id:2}, {name:'WEAVE AND EXTENSIONS SPECIALIST',id:3},{name:'MAKE UP ARTIST',id:4},
{name:'NAIL MANICURE AND PEDICURE',id:5},{name:'TATOO ARTIST',id:6},{name:'MASSAGE THERAPIST',id:7},{name:'OTHER SERVICES',id:8}]
    this.cbChecked = [];
    this.data={}
    this.http=http;
             this.salon_name=this.navParams.get('salon_name') ,
            
            this.address=this.navParams.get('address') ,
           this.full_name=this.navParams.get('full_name') ,
            this.email=this.navParams.get('email') ,
            this.password=this.navParams.get('password') ,
            this.confirm_password=this.navParams.get('confirm_password') ,
            this.contact_number=this.navParams.get('contact_number') ,
           this.salon_description=this.navParams.get('salon_description') ,
           
            this.latitude=this.navParams.get('latitude') ,
            this.longitude=this.navParams.get('longitude') 



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalonCategory');
  }

updateCheckedOptions(chBox, event) {
      var cbIdx = this.cbChecked.indexOf(chBox);

      if(event.target.checked) {
          if(cbIdx < 0 ){
               this.cbChecked.push(chBox);
             console.log(chBox);
          }

      } else {
          if(cbIdx >= 0 ){
             this.cbChecked.splice(cbIdx,1);
              console.log(cbIdx);
          }

      }
    
  }
   updateOptions() {

   	if(this.cbChecked.length==0){
      let alert = this.alertCtrl.create({
            title: 'Oops!',
          subTitle: 'No category Selected',
          buttons: ['OK']
                    });
              alert.present();


   	}
   		else{
   	// console.log("is"+this.cbChecked)
    // this.viewctrl.dismiss({services:this.cbChecked});

let loading = this.loadingCtrl.create({
       content: 'Please wait...'
      });

       loading.present();
        var link='http://gagandeepsethi.com/salonDirectory/WebServices/salonRegistration.json';
        var data=JSON.stringify({
        salon_name:this.salon_name,
        address:this.address,
        full_name:this.full_name,
        email:this.email,
        password:this.password,
        confirm_password:this.confirm_password,
       contact_number:this.contact_number,
       salon_description:this.salon_description,
        usertype:1,
        latitude: this.latitude,
        longitude:this.longitude,
        category:this.cbChecked

        })

    this.http.post(link,data)
    .map(response => response.json())
     .subscribe(data=>{

           loading.dismiss();
       this.data = data;
         console.log("response"+JSON.stringify(this.data));
           if(this.data.status==1){
            
               let alert = this.alertCtrl.create({
                title: 'THANK YOU!',
                subTitle: 'Registration Successful.Please Check Your Inbox To Verify Your Account ',
                buttons: ['ok']
              });
              alert.present();
              this.navCtrl.setRoot('Login')
              
          }
  else if(this.data.message=='Entered email address or username is already registered with us.'){
              
               let alert = this.alertCtrl.create({
                title: 'Alert',
                subTitle: 'Entered E-mail is already registered',
                buttons: ['ok']
              });
              alert.present();
           }




  })}}
  /////////////////////////////

cancel(){
this.navCtrl.pop()

}
}



