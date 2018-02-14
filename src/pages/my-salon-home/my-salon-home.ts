import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import {DataService } from "../../providers/data-service"
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable} from "rxjs/Rx";
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-my-salon-home',
  templateUrl: 'my-salon-home.html',
  providers:[DataService]
})
export class MySalonHome {
  minedata
  myimage
  user_id
  menu
  userprofilepic
  notiydata
  notification_count
  count_response 
  mycount
  mydata
  username
  mystatus
  profileVisible
  imagePath
  usertype
  auth
  ourdata
  mynotication_data
  cancel_notication_data
  notifiy_count
  zero_count
  noti
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,private dataservice:DataService,public events: Events,menu:MenuController,public alertCtrl:AlertController) {
    this.userprofilepic=localStorage['img']
    this.username=localStorage['username'];
    this.menu=menu
    this.menu.enable(true,'myMenu')
    events.subscribe('user:created', (user,authinfo,username,userpic,optional?) => {
      if(optional){
        this.userprofilepic=optional                    
      }
      else{
        this.userprofilepic=userpic;      
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MySalonHome');
  }
  myapointments(){
    // this.navCtrl.push('SalonAppointment')
    this.navCtrl.push('SalonClientBooking')
  }
  onlinebooking(){
    this.navCtrl.push('SalonOnlineBooking')
  }
  businessinfo(){
    this.navCtrl.push('SalonBuisnessInfo')
  }
  myservicelist(){
    this.navCtrl.push('SalonServiceList')
  }
  notification(){
    this.navCtrl.push('SalonNotification',{notfication_all_data:this.minedata})
  }
  addemploye(){
    this.navCtrl.push('MyEmployees')
  }
  upload_myimages(){
    this.navCtrl.push('MySalonImageUpload')
  }
  subscription_plans(){
    this.navCtrl.push('MySalonSubscrptionPage1')
  }
  paymentstatus(){
    this.navCtrl.push('SalonPaymentPage')
  }
  myclients(){
    this.navCtrl.push('SalonMyClient2')
  }
  mylocation()
  {
    localStorage['directory']=true;
    this.navCtrl.push('CustomerCategories')
  }
  get_count(){
    this.dataservice.MySalonNotification().subscribe(data=>{
      this.minedata = data
      this.notification_count=this.minedata.bookingcount+this.minedata.message_count
      this.zero_count=this.minedata.status
    },err=>{
    })
  }
  ionViewWillLeave(){
    clearInterval(this.noti)
  }
  ionViewWillEnter(){
    this.get_count()
    this.noti=setInterval(()=>{
      this.get_count()
    },10000)
    // let loading = this.loadingCtrl.create({content: 'Loading...'});
    // Observable.fromPromise(loading.present())
    // .flatMap(data => this.dataservice.MySalonNotification())
    // .subscribe(data =>{
    // loading.dismiss()
    //   this.minedata = data
    //   this.notification_count=this.minedata.bookingcount
    //   this.zero_count=this.minedata.status
    // },error=>{
    //   loading.dismiss()
    //   let alert=this.alertCtrl.create({
    //   title:'Timeout',
    //   subTitle:'Please Try Again',
    //   buttons:['Ok']
    //   })
    //   loading.dismiss();
    //   alert.present()
    // })
  }
}
        // this.mynotication_data = this.minedata.bookinginfo
        //           this.cancel_notication_data = this.minedata.cancelinfo
        //  this.mystatus=this.minedata.status            
        // alert(this.notification_count)
        // alert(this.zero_count)
        // localStorage['count']=  this.notifiy_count