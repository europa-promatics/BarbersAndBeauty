import { Component } from '@angular/core';
import { NavController,MenuController,ActionSheetController,AlertController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import {DataService}  from '../../providers/data-service';
import { Observable} from "rxjs/Rx";
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Events ,LoadingController} from 'ionic-angular';
// import { FCM } from '@ionic-native/fcm';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menu;
  token='n/a';
   FB_APP_ID: number =1002280713258991;
   item;
   items;
  constructor(public navCtrl: NavController,menu:MenuController,
    public events: Events,
    public loadingCtrl: LoadingController,
  	public actionSheetCtrl: ActionSheetController,
    private dataservice:DataService,
    private fb: Facebook,
    public alertCtrl:AlertController,
	private uniqueDeviceID: UniqueDeviceID/*,
    public fcm:FCM*/) {
	this.uniqueDeviceID.get()
	.then((uuid: any)=>{
	localStorage['uid']=uuid;
	},function(reason) {
		  //alert(JSON.stringify(reason));
	})
    this.fb.browserInit(this.FB_APP_ID, "v2.8");
    this.menu = menu;
    this.menu.enable(false, 'myMenu')
    this.token=localStorage['token']

    ////////////////notification////////////////////////
    // fcm.subscribeToTopic('notification');
    // fcm.getToken().then(token=>{
    //   alert(token);
    //   this.token=token;  
    // })
    ////////////////notification////////////////////////
  }
  login(){
    this.navCtrl.push('Login')
  }
  signme(){
    this.navCtrl.push('Createaccount')
  }
  fblogin(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Login with FACEBOOK',
      buttons: [{
        text: 'As a Customer',
        role: 'destructive',
        icon:'person',
        handler: () => {
          var usertype=0;
          this.CustomerFblog(usertype);
          console.log('Destructive clicked');
        }
        },{
        text: 'As a Business Owner',
        icon:'person',
        handler: () => {
          var usertype=1;
          this.CustomerFblog(usertype);
          console.log('Archive clicked');
        }
        },{
        text: 'Cancel',
        role: 'cancel',
        icon:'close-circle',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();
  }
  CustomerFblog(usertype){
    let loading = this.loadingCtrl.create({content: 'Please wait...'});
    let permissions = new Array();
    permissions = ["public_profile","email"];
    this.fb.login(permissions)
    .then((response)=>{
      loading.dismiss();
      let userId = response.authResponse.userID;
      let params = new Array();
      this.fb.api("/me?fields=name,gender,email,id", params)
      .then((user)=>{
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        this.facebook(user.email,user.name,userId,usertype,user.picture)
        // alert('type'+user.picture+''+user.name+''+user.email);
      })
    },(error)=>{
      let alert = this.alertCtrl.create({
        title: 'Alert!',
        subTitle: JSON.stringify(error),
        buttons: ['OK']
      });
      alert.present();
    }) 
  }
  facebook(email,username,fbid,usertype,img){
    // alert("inside fb222 block")
    // var email1='asif@gmail.com';
    // var username1='deepp';
    // var fbid1=124234234455;
    //  var usertype1=1;
    // var img1='https://graph.facebook.com/1168982779874130/picture?type=large';
    let loading = this.loadingCtrl.create({content: 'Loading...'});
    Observable.fromPromise(loading.present())
    .flatMap(data => this.dataservice.Facebook(email, username,fbid,usertype,img))
    .subscribe(data  =>{ 
      loading.dismiss();
      // alert('data'+JSON.stringify(data));
      // alert("service response"+JSON.stringify(this.item));
      this.item=data;
      this.items=this.item.data;
      if(usertype==this.items.usertype){
        let alert = this.alertCtrl.create({
          title: 'Thank You!',
          subTitle: 'Login successful.',
          buttons: ['OK']
        });
        alert.present();
        localStorage['usertype']=this.items.usertype;
        localStorage['username']=this.items.name;
        localStorage['salonid']=this.items.id;
        localStorage['employeeid']=this.items.id;
        localStorage['customerid']=this.items.id;
        localStorage['useremail']=this.items.email;
        localStorage['auth']='true'
        localStorage['customerpic']=this.items.profile_image;
        localStorage['directory']=false;
        this.events.publish('user:created', localStorage['usertype'],
        localStorage['auth']='true', localStorage['username'], 
        localStorage['customerpic'])
        if(this.items.usertype==0){
          localStorage['authenticate']='Customerside'
          this.navCtrl.setRoot('CustomerCategories');
        }
        else if(this.items.usertype==1){
          localStorage['authenticate']='Salonside'
          this.navCtrl.setRoot('MySalonHome');
        }
      }else{
        if(this.items.usertype==0){
          let alert = this.alertCtrl.create({
            title: 'Alert!',
            subTitle: 'Email id already exist as a customer',
            buttons: ['OK']
          });
          alert.present();
        }else if(this.items.usertype==1){
          let alert = this.alertCtrl.create({
            title: 'Alert!',
            subTitle: 'Email id already exist as a salon owner',
            buttons: ['OK']
          });
          alert.present();
        }
      }
    }),error  => {
      let alert = this.alertCtrl.create({
        title: 'Alert!',
        subTitle: 'Something went wrong',
        buttons: ['OK']
      });
      alert.present();
    }
  }
}
