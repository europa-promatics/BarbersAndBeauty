var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Observable } from "rxjs/Rx";
import { DataService } from '../../providers/data-service';
var v;
// promatics.asif@gmail.com
/**
* Generated class for the SalonNotification page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
var SalonNotification = /** @class */ (function () {
    function SalonNotification(navCtrl, navParams, loadingCtrl, dataservice, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.dataservice = dataservice;
        this.alertCtrl = alertCtrl;
        this.index_array = [];
        this.all_index_array = [];
        this.notication_data = this.navParams.get('notfication_all_data');
        // this.mynotication_data = this.notication_data.bookinginfo
        //    this.cancel_notication_data = this.notication_data.cancelinfo
        // this.notification_count=this.notication_data.bookingcount
        this.segment = "booking_request";
    }
    SalonNotification.prototype.ionViewDidLoad = function () {
        console.log(this.ourId);
    };
    SalonNotification.prototype.opennotification = function (m, index) {
        var _this = this;
        v = 'var_' + index;
        this.array_index = v;
        var x = document.getElementById(v);
        this.all_index_array.push(v);
        x.style.background = "#fff";
        this.navCtrl.push('SalonAcceptRequest', { nextpagedata: m });
        this.array_length = this.index_array.length;
        var loading = this.loadingCtrl.create({ content: 'Please Wait ...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.ResetCount(m.payment_id, _this.array_index); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.mydata = data;
                _this.printdata = _this.mydata.bookinginfo;
            });
        });
    };
    SalonNotification.prototype.opennotification2 = function (m, index) {
        v = 'var_' + index;
        this.array_index = v;
        var x = document.getElementById(v);
        x.style.background = "#fff";
        this.navCtrl.push('Saloncancelbookings', { nextpagedata: m });
        this.array_length = this.index_array.length;
    };
    SalonNotification.prototype.ionViewWillEnter = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.MySalonNotification(); })
            .subscribe(function (data) {
            loading.dismiss();
            if (data.status == 1) {
                _this.minedata = data;
                _this.mynotication_data = _this.minedata.bookinginfo.reverse();
                _this.my_id = _this.minedata.bookinginfo[0].transaction_id;
                _this.cancel_notication_data = _this.minedata.cancelinfo;
                _this.notifiy_count = _this.minedata.bookingcount;
                _this.status = _this.minedata.status;
                localStorage['count'] = _this.notifiy_count;
            }
            else {
            }
            // if(this.minedata.status==1){
            // }
            //             this.mystatus=this.minedata.status            
            // this.notifiy_count=this.minedata.bookingcount
        }, function (error) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Timeout',
                subTitle: 'Please Try Again',
                buttons: ['Ok']
            });
            loading.dismiss();
            alert.present();
        });
    };
    __decorate([
        ViewChild('#myId'),
        __metadata("design:type", Object)
    ], SalonNotification.prototype, "ourId", void 0);
    SalonNotification = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-notification',
            templateUrl: 'salon-notification.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, LoadingController, DataService, AlertController])
    ], SalonNotification);
    return SalonNotification;
}());
export { SalonNotification };
// ngOnInit(){
//   this.storage.get('myStore').then((data) => {
//       this.items = data;
//     // alert("1st"+JSON.stringify(this.items))
//      if(this.items.length!=null){
//           // alert(this.items.length) 
//              for(var i=0;i<this.items.length;i++){
//                 var y =document.getElementById(this.items[i]);
//                     y.style.background="#fff"
//              }}   
//     })
// }
// color_Change(event){
//    if(event=="cancel_bookings"){
//    this.storage.get('myStore2').then((data) => {
//                  this.item = data;
//                  if(this.item.length!=null){  
//              for(var i=0;i<this.item.length;i++){
//                 var x =document.getElementById(this.item[i]);
//                     x.style.background="#fff"
//              }   }
//     })
// }
// else if(event=="booking_request"){
// this.ngOnInit();
// }
// }
//       this.storage.get('myCount').then((data)=>{
//   alert("@@"+data)
//      this.OurCount=6
//      this.OurCount--
//      alert(this.OurCount)
// })
// this.storage.set('myCount',this.OurCount);
//       this.storage.get('myStore').then((data) => {
//    if(data != null)
//    {
//      data.push(v);
//      this.storage.set('myStore', data);
//    }
//    else
//    {
//      let array = [];
//      array.push(v);
//      this.storage.set('myStore', array);
//    }}); 
//# sourceMappingURL=salon-notification.js.map