import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Device} from 'ionic-native';
import { FCM } from '@ionic-native/fcm';
import 'rxjs/Rx';
import { Observable} from "rxjs/Rx";
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
   email;
   password;
   http;
   data;
   menu;
   savepass;
   customerpic;
   salonownerpic;
   employeepic;
   uuid;
   loginform:FormGroup;
   constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
	private fcm: FCM,
  	public loadingCtrl: LoadingController,
    public events: Events, 
    menu :MenuController ,
    private device: Device,
    public formBuilder: FormBuilder,
    public navParams: NavParams,http:Http,
	private uniqueDeviceID: UniqueDeviceID) {

	this.uniqueDeviceID.get()
	.then((uuid: any)=>{
	localStorage['uid']=uuid;
	},function(reason) {
		  //alert(JSON.stringify(reason));
	})
  
    // this.uuid=device.uuid;
    this.menu = menu;
    this.menu.enable(false, 'myMenu')
  	this.http=http;
  	this.data={}
    this.email=localStorage['email'];
    this.password=localStorage['password'];
    let emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	this.loginform = formBuilder.group({
        
       emailaddress: ['', Validators.compose([Validators.maxLength(50), 
         Validators.pattern(emailRegex), Validators.required])],

     pass:['', Validators.compose( [Validators.maxLength(12)
        ,Validators.minLength(3),Validators.pattern(''), Validators.required])],
      


    });
  
  }
  
  registerDevice(){
	  this.fcm.getToken().then(token=>{
			//alert(token);
			localStorage['token']=token;
			localStorage['fcmtoken']=token;
			
		  //backend.registerToken(token);
		},function(reason) {
		 // alert(JSON.stringify(reason));
		});
		this.fcm.onNotification().subscribe(data=>{
		  if(data.wasTapped){
		  
			console.log("Received in background");
		  } else {
		   let a = this.alertCtrl.create({
               title:data.title,
               message:data.body,
               buttons:['ok']
             })
           a.present();
			console.log("Received in foreground");
		  };
		})

		this.fcm.onTokenRefresh().subscribe(token=>{
			//alert(token);
			localStorage['token']=token;
			localStorage['fcmtoken']=token;
		})

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
create(){
	this.navCtrl.push('Createaccount')
}
forget(){
	this.navCtrl.push('ForgetPassword')
}
login(){
  // alert("token"+JSON.stringify(localStorage['token']))
  //alert("uuid"+JSON.stringify(this.uuid))
  //this.uuid='ba9953d9f793a39c';
  //localStorage['token']='dLdZO4z1vdc:APA91bHhXB4cpzGFrfoYWORXZjkawNCrEowlFTqeBgmmpMsB87Zm4UUa6J_JDT2f5yONefJVb5NV4RvRG2S8ZeroVHJ7QfD_mcAsCDj28FMsFOaJG3FD8mECL4fqucbcvOCTsChpWzv_'

  this.registerDevice();

  let loading = this.loadingCtrl.create({content: 'Please wait...'});
    
  loading.present();
	
	var link='http://gagandeepsethi.com/salonDirectory/WebServices/login.json';
	var data=JSON.stringify({
		
		email:this.email,
		password:this.password,
		device_id:   localStorage['uid'],
		device_token:localStorage['fcmtoken'],
		type: localStorage['deviceType']
	})

	
    this.http.post(link,data)
  .map(response => response.json())
     .subscribe(data=>{

          loading.dismiss();
       this.data = data;
         //alert("response"+JSON.stringify(this.data.message));
         // console.log("data"+JSON.stringify(this.data.data.status));
            




           if(this.data.message=='login successfully'){
			this.registerDevice();
           	 	let alert = this.alertCtrl.create({
						    title: 'Login Successful.',
						   
						    buttons: ['ok']
						  });
						  alert.present();
              localStorage['directory']=false;
            localStorage['usertype']=this.data.data.usertype;
            localStorage['customerid']=this.data.data.cusotmer_id;
            localStorage['username']=this.data.data.full_name;
            localStorage['salonid']=this.data.data.salon_id;
            localStorage['customerpic']=this.data.data.profile_image;
            localStorage['employeeid']=this.data.data.employee_id;
            localStorage['useremail']=this.data.data.email;
            localStorage['customernumber']=this.data.data.contact_number;
			if(this.data.data.noti_status==1){
			localStorage['noti_status']=true;
			}else{
			localStorage['noti_status']=false;
			}

       this.customerpic=this.data.data.profile_image;
       this.salonownerpic=this.data.data.profile_image;
       this.employeepic=this.data.data.profile_image;
        
       // console.log("hello pic checking"+this.customerpic)
     
      //  console.log("hello salonid"+ localStorage['salonid'])

           console.log("data"+JSON.stringify(this.data.data.usertype)); 
           if( this.savepass=='true'||this.savepass==true){

              localStorage['email']=this.data.data.email;
              localStorage['password']=this.password;

           }    
           if(localStorage['usertype']==1){
             localStorage['auth']='true'
             localStorage['authenticate']='Salonside'
              this.navCtrl.setRoot('MySalonHome') 

               if(this.salonownerpic==null || this.salonownerpic=='null'){
                
                  localStorage['img']='img/logo-image.png'
             

               }

               else {
                        var a=this.salonownerpic.includes("http")
                         if(a==true || a=='true'){
                         localStorage['img']=this.salonownerpic;
                         }

                    else{
                     
             localStorage['img']='http://gagandeepsethi.com/salonDirectory/img/salonownerprofileimage/'+this.salonownerpic;
                         }
               }

              this.events.publish('user:created', localStorage['usertype'], localStorage['auth']='true', localStorage['username'], localStorage['img'])
           } 
           else if(localStorage['usertype']==0){
              localStorage['auth']='true'
              localStorage['authenticate']='Customerside'
              this.navCtrl.setRoot('CustomerCategories')

              if(this.customerpic==null || this.customerpic=='null'){
                localStorage['img']='assets/img/user.jpg';

              }
              else{
                       var a=this.customerpic.includes("http")
                     if(a==true|| a=='true'){
                     localStorage['img']=this.customerpic;
                     }

                     else{
                       localStorage['img']='http://gagandeepsethi.com/salonDirectory/img/customerprofileimage/'+this.customerpic;
                     }
              }
              this.events.publish('user:created', localStorage['usertype'], localStorage['auth']='true', localStorage['username'], localStorage['img'])
              
           } 

           else if(localStorage['usertype']==2){
                
              console.log("hello barber")
              localStorage['auth']='true'
               localStorage['authenticate']='Employeeside'
              this.navCtrl.setRoot('EmployeeHome')
              if(this.employeepic==null || this.employeepic=='null'){
                localStorage['img']='assets/img/backpic.jpg';
              }   

              else {
                // localStorage['img']='assets/img/new.png';
                localStorage['img']='http://gagandeepsethi.com/salonDirectory/img/employeeprofileimage/'+this.employeepic;
              }         
         this.events.publish('user:created', localStorage['usertype'], localStorage['auth']='true', localStorage['username'],localStorage['img'])      

           }



           } 
           else if(this.data.message=='Please first verify your account then login'){
             let alert = this.alertCtrl.create({
                title: 'Account Activation!',
                subTitle: 'You have not verified your email address or your account is temporarly inactive.',
                buttons: ['ok']
              });
              alert.present();
                      
           }


           else if(this.data.message=='This email does not exit'){
             let alert = this.alertCtrl.create({
                title: 'ALERT!',
                subTitle: 'Entered email is not registered',
                buttons: ['ok']
              });
              alert.present();
                      
           }
           else if(this.data.message=='Invalid Password'){
             let alert = this.alertCtrl.create({
                title: 'ALERT!',
                subTitle: 'Either E-mail or Password is incorrect',
                buttons: ['ok']
              });
              alert.present();
                      
           }
       
     }),   error =>
             loading.dismiss().then(() => {
         let alert=this.alertCtrl.create({
        title:'SERVER ERROR',
        subTitle:'Please Try Again',
        buttons:['Ok']
      })
      loading.dismiss();
      alert.present()


                      });

 }
}
