import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import {DataService}  from '../../providers/data-service';
import { Observable} from "rxjs/Rx";

/**
 * Generated class for the EmployeeNotification page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-employee-notification',
  templateUrl: 'employee-notification.html',
})
export class EmployeeNotification {
   notification;
   notificationdata;
   Notiseg
   declined
   nodata
   hide1
   canceldata
   cancelstatus
   confirmdata
   confirmstatus
   data
   color_status
   mypayment_id
   admin_messages
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private dataservice:DataService,public alertCtrl:AlertController,
    public loadingCtrl: LoadingController) {
     this.Notiseg="accepted";
     this.nodata='false'
     this.hide1='false'
     this.data={}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeNotification');
  }
//   selectedtime(i,payment_id){
//        this.mypayment_id=payment_id
//    // var v = 'var_' + i;
//    //  var x = document.getElementById(v);
//    //  x.style.background = "#FFFFFF";
//    //   x.style.color = "#222222";
 

// let loading = this.loadingCtrl.create({content: 'Please Wait...'});
//        Observable.fromPromise(loading.present())
//       .flatMap(data => this.dataservice.employe_side_notification_color_change(this.mypayment_id))
//       .subscribe(data =>
//                loading.dismiss().then(() =>{ 
//                    this.notification = data;

// }))

// }
 ngOnInit(){
     
     let loading = this.loadingCtrl.create({content: 'Please Wait...'});
         Observable.fromPromise(loading.present())
         .flatMap(data => this.dataservice.EmployeeNotification())
         .subscribe(data =>
                    loading.dismiss().then(() =>{ 
                        this.notification = data;
                        if(this.notification.Data){
                        this.notificationdata=this.notification.Data.reverse();
                        this.declined=this.notification.cancel.reverse();
                        this.admin_messages=this.notification.message_data.reverse();

                console.log("hello ga abc"+JSON.stringify(this.declined))
     // alert("hello data check"+this.notification.Data)

                     if(this.notification.Data==''){

                        this.hide1='true'
                           
                     }
               
               }
                

                             }),
                      error =>
                      loading.dismiss().then(() => {
                        let alert = this.alertCtrl.create({
                      title: 'SERVER ERROR',
                      subTitle: 'Something Went Wrong',
                      buttons: ['ok']
                          });
                    alert.present(); 
                      })
                    ); 

  }

confirm(paymentid,paystatus,index,status_change){
  let loading = this.loadingCtrl.create({content: 'Loading'});
  Observable.of(loading).flatMap(loading => loading.present())
  .flatMap(data => Observable.forkJoin(this.dataservice.EmployeeConfirmBooking(paymentid,paystatus,status_change),this.dataservice.employe_side_notification_color_change(paymentid)))
  .subscribe(data =>
    loading.dismiss().then(() =>{ 
      this.confirmdata=data[0];
      this.notification=data[1]
      this.confirmstatus=this.confirmdata.status
      if(this.confirmstatus==1){
        const alert = this.alertCtrl.create({
                                            title: 'Thank You!',
                                            subTitle: 'Booking Accepted Successfully',
                                            buttons: [{
                                                      text: 'Ok',
                                                      role: 'cancel',
                                                      handler: () => {
                                                                    console.log('Cancel clicked');
                                                                    this.ngOnInit();
                                                                    }
                                                      }]
        });
        alert.present();
      }else if(this.confirmstatus==0){
      const alert = this.alertCtrl.create({
      title: 'Thank You!',
      subTitle: 'Booking Already Accepted Successfully',
      buttons: [{
      text: 'OK',
      role: 'cancel',
      handler: () => {
      console.log('Cancel clicked');
      this.ngOnInit();
      }
      },]
      });
      alert.present();
      }else if(this.confirmstatus==2){
        const alert = this.alertCtrl.create({
                                            title: 'Sorry!',
                                            subTitle: 'The time slot is already booked!',
                                            buttons: [{text: 'Ok'}]
        });
        alert.present();
      }else if(this.confirmstatus==3){
        const alert = this.alertCtrl.create({
                                            title: 'Sorry!',
                                            subTitle: 'This booking can\'t be booked as you don\'t have requested service!',
                                            buttons: [{text: 'OK'}]
        });
        alert.present();
      }
    }),error =>
      loading.dismiss().then(() => {
        let alert=this.alertCtrl.create({
          title:'SERVER ERROR',
          subTitle:'Please Try Again',
          buttons:['Ok']
        })
        loading.dismiss();
        alert.present()
      })
  );
}

mark_msg(id, seen){
  
let loading = this.loadingCtrl.create({content: 'Loading'});
    Observable.fromPromise(loading.present())
         .flatMap(data => this.dataservice.MarkRead(id, seen))
     .subscribe(data =>
                loading.dismiss().then(() =>{ 
                 
                     
                            this.ngOnInit();
                        
                       }),
                        error =>
         loading.dismiss().then(() => {
    
                      })
                    );
                   
            }
mark_read(paymentid,paystatus,index,status_change){
  
let loading = this.loadingCtrl.create({content: 'Loading'});
    Observable.of(loading).flatMap(loading => loading.present())

     .flatMap(data => Observable.forkJoin(this.dataservice.EmployeeConfirmBooking(paymentid,paystatus,status_change),this.dataservice.employe_side_notification_color_change(paymentid)))
    

     .subscribe(data =>
                loading.dismiss().then(() =>{ 
                 this.confirmdata=data[0];
                    this.notification=data[1]
                        this.confirmstatus=this.notification.status
                                  if(this.confirmstatus==1){
                         
                          
                          const alert = this.alertCtrl.create({
                          title: 'Successfully Marked UnRead!',
                        
                          buttons: [{
                          text: 'Ok',
                          role: 'cancel',
                         handler: () => {
                           console.log('Cancel clicked');
                            this.ngOnInit();
                          }
                            },]
                       });
                  alert.present();
                          }
                  //         else
                  //           if
                  //               (this.confirmstatus==0){
                         
                          
                  //         const alert = this.alertCtrl.create({
                  //         title: 'Thank You!',
                  //         subTitle: 'Booking Already Accepted Successfully',
                  //         buttons: [{
                  //         text: 'Ok',
                  //         role: 'cancel',
                  //        handler: () => {
                  //          console.log('Cancel clicked');
                  //           this.ngOnInit();
                  //         }
                  //           },]
                  //      });
                  // alert.present();
                  //         }
                             }),
                        error =>
         loading.dismiss().then(() => {
         let alert=this.alertCtrl.create({
        title:'SERVER ERROR',
        subTitle:'Please Try Again',
        buttons:['Ok']
           })
         loading.dismiss();
         alert.present()


                      })
                    );
                   
            }







  //   var v = 'var_' + index;
  //   var x = document.getElementById(v);
  //   x.style.background = "#FFFFFF";
  //    x.style.color = "#222222";
  //    let loading = this.loadingCtrl.create({content: 'Please Wait...'});
  //        Observable.fromPromise(loading.present())
  //        .flatMap(data => this.dataservice.EmployeeConfirmBooking(paymentid,paystatus))
  //        .subscribe(data =>
  //                   loading.dismiss().then(() =>{ 
  //                       this.confirmdata=data;
  //                       this.confirmstatus=this.confirmdata.status

  //                         if(this.confirmstatus==1){
                         
                          
  //                         const alert = this.alertCtrl.create({
  //                         title: 'Thank You!',
  //                         subTitle: 'Booking Accepted Successfully',
  //                         buttons: [{
  //                         text: 'Ok',
  //                         role: 'cancel',
  //                        handler: () => {
  //                          console.log('Cancel clicked');
  //                           this.ngOnInit();
  //                         }
  //                           },]
  //                      });
  //                 alert.present();
  //                         }
  //                            }),
  //                       error =>
  //        loading.dismiss().then(() => {
  //        let alert=this.alertCtrl.create({
  //       title:'SERVER ERROR',
  //       subTitle:'Please Try Again',
  //       buttons:['Ok']
  //          })
  //        loading.dismiss();
  //        alert.present()


  //                     })
  //                   );
   
  // }
cancelbooking(payment_id,paystatus,index,status_change){
        
         var v = 'var_' + index;
    var x = document.getElementById(v);
    x.style.background = "#FFFFFF";
     x.style.color = "#222222";
     const alert = this.alertCtrl.create({
    title: 'Confirm Cancel',
    message: 'Do you want to Cancel this Booking?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.cancel(payment_id,paystatus,status_change)
        }
      }
    ]
  });
  alert.present();
}
  cancel(paymentid,paystatus,status_change){
     // alert(paymentid)
let loading = this.loadingCtrl.create({content: 'Loading'});
    Observable.of(loading).flatMap(loading => loading.present())

     .flatMap(data => Observable.forkJoin(this.dataservice.EmployeeCancelBooking(paymentid,paystatus,status_change),this.dataservice.employe_side_notification_color_change(paymentid)))
    

     .subscribe(data =>
                loading.dismiss().then(() =>{ 
                  if(data[0])
                 this.canceldata=data[0];
                this.cancelstatus=this.canceldata.status

                      if(this.cancelstatus==1){
                          const alert = this.alertCtrl.create({
                          title: 'Alert!',
                          subTitle: 'Booking Cancelled Successfully',
                          buttons: [{
                          text: 'Ok',
                          role: 'cancel',
                         handler: () => {
                           console.log('Cancel clicked');
                            this.ngOnInit();
                          }
                            },]
                       });
                  alert.present();
                          }
                      }
                       )),
                        error =>
         loading.dismiss().then(() => {
         let alert=this.alertCtrl.create({
        title:'SERVER ERROR',
        subTitle:'Please Try Again',
        buttons:['Ok']
           })
         loading.dismiss();
         alert.present()


                      })
                    ;
   
  }








  //     let loading = this.loadingCtrl.create({content: 'Please Wait...'});
  //        Observable.fromPromise(loading.present())
  //        .flatMap(data => this.dataservice.EmployeeCancelBooking(paymentid,paystatus))
  //        .subscribe(data =>
  //                   loading.dismiss().then(() =>{ 
  //                     if(data){
  //                       this.canceldata=data;
  //                       this.cancelstatus=this.canceldata.status

  //                           if(this.cancelstatus==1){
  //                         const alert = this.alertCtrl.create({
  //                         title: 'Alert!',
  //                         subTitle: 'Booking Cancelled Successfully',
  //                         buttons: [{
  //                         text: 'Ok',
  //                         role: 'cancel',
  //                        handler: () => {
  //                          console.log('Cancel clicked');
  //                           this.ngOnInit();
  //                         }
  //                           },]
  //                      });
  //                 alert.present();
  //                         }
  //                     }
                        

                 
  //                            }),
  //                       error =>
  //        loading.dismiss().then(() => {
  //        let alert=this.alertCtrl.create({
  //       title:'SERVER ERROR',
  //       subTitle:'Please Try Again',
  //       buttons:['Ok']
  //          })
  //        loading.dismiss();
  //        alert.present()


  //                     })
  //                   );
   
  // }

segment_change(){
if(this.Notiseg=='accepted'){

  this.ngOnInit()

}


}
}