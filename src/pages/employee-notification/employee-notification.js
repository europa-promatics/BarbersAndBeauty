var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { Observable } from "rxjs/Rx";
/**
 * Generated class for the EmployeeNotification page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EmployeeNotification = /** @class */ (function () {
    function EmployeeNotification(navCtrl, navParams, dataservice, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataservice = dataservice;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.Notiseg = "accepted";
        this.nodata = 'false';
        this.hide1 = 'false';
        this.data = {};
    }
    EmployeeNotification.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EmployeeNotification');
    };
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
    EmployeeNotification.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.EmployeeNotification(); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.notification = data;
                if (_this.notification.Data) {
                    _this.notificationdata = _this.notification.Data.reverse();
                    _this.declined = _this.notification.cancel.reverse();
                    console.log("hello ga abc" + JSON.stringify(_this.declined));
                    // alert("hello data check"+this.notification.Data)
                    if (_this.notification.Data == '') {
                        _this.hide1 = 'true';
                    }
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'SERVER ERROR',
                    subTitle: 'Something Went Wrong',
                    buttons: ['ok']
                });
                alert.present();
            });
        });
    };
    EmployeeNotification.prototype.confirm = function (paymentid, paystatus, index, status_change) {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading' });
        Observable.of(loading).flatMap(function (loading) { return loading.present(); })
            .flatMap(function (data) { return Observable.forkJoin(_this.dataservice.EmployeeConfirmBooking(paymentid, paystatus, status_change), _this.dataservice.employe_side_notification_color_change(paymentid)); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.confirmdata = data[0];
                _this.notification = data[1];
                _this.confirmstatus = _this.confirmdata.status;
                if (_this.confirmstatus == 1) {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Thank You!',
                        subTitle: 'Booking Accepted Successfully',
                        buttons: [{
                                text: 'Ok',
                                role: 'cancel',
                                handler: function () {
                                    console.log('Cancel clicked');
                                    _this.ngOnInit();
                                }
                            }]
                    });
                    alert_1.present();
                }
                else if (_this.confirmstatus == 0) {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'Thank You!',
                        subTitle: 'Booking Already Accepted Successfully',
                        buttons: [{
                                text: 'Ok',
                                role: 'cancel',
                                handler: function () {
                                    console.log('Cancel clicked');
                                    _this.ngOnInit();
                                }
                            },]
                    });
                    alert_2.present();
                }
                else if (_this.confirmstatus == 2) {
                    var alert_3 = _this.alertCtrl.create({
                        title: 'Sorry!',
                        subTitle: 'Time Slot already booked',
                        buttons: [{ text: 'Ok' }]
                    });
                    alert_3.present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'SERVER ERROR',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                loading.dismiss();
                alert.present();
            });
        });
    };
    EmployeeNotification.prototype.mark_read = function (paymentid, paystatus, index, status_change) {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading' });
        Observable.of(loading).flatMap(function (loading) { return loading.present(); })
            .flatMap(function (data) { return Observable.forkJoin(_this.dataservice.EmployeeConfirmBooking(paymentid, paystatus, status_change), _this.dataservice.employe_side_notification_color_change(paymentid)); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.confirmdata = data[0];
                _this.notification = data[1];
                _this.confirmstatus = _this.notification.status;
                if (_this.confirmstatus == 1) {
                    var alert_4 = _this.alertCtrl.create({
                        title: 'Successfully Marked UnRead!',
                        buttons: [{
                                text: 'Ok',
                                role: 'cancel',
                                handler: function () {
                                    console.log('Cancel clicked');
                                    _this.ngOnInit();
                                }
                            },]
                    });
                    alert_4.present();
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
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'SERVER ERROR',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                loading.dismiss();
                alert.present();
            });
        });
    };
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
    EmployeeNotification.prototype.cancelbooking = function (payment_id, paystatus, index, status_change) {
        var _this = this;
        var v = 'var_' + index;
        var x = document.getElementById(v);
        x.style.background = "#FFFFFF";
        x.style.color = "#222222";
        var alert = this.alertCtrl.create({
            title: 'Confirm Cancel',
            message: 'Do you want to Cancel this Booking?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.cancel(payment_id, paystatus, status_change);
                    }
                }
            ]
        });
        alert.present();
    };
    EmployeeNotification.prototype.cancel = function (paymentid, paystatus, status_change) {
        var _this = this;
        // alert(paymentid)
        var loading = this.loadingCtrl.create({ content: 'Loading' });
        Observable.of(loading).flatMap(function (loading) { return loading.present(); })
            .flatMap(function (data) { return Observable.forkJoin(_this.dataservice.EmployeeCancelBooking(paymentid, paystatus, status_change), _this.dataservice.employe_side_notification_color_change(paymentid)); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                if (data[0])
                    _this.canceldata = data[0];
                _this.cancelstatus = _this.canceldata.status;
                if (_this.cancelstatus == 1) {
                    var alert_5 = _this.alertCtrl.create({
                        title: 'Alert!',
                        subTitle: 'Booking Cancelled Successfully',
                        buttons: [{
                                text: 'Ok',
                                role: 'cancel',
                                handler: function () {
                                    console.log('Cancel clicked');
                                    _this.ngOnInit();
                                }
                            },]
                    });
                    alert_5.present();
                }
            });
        }),
            function (error) {
                return loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        title: 'SERVER ERROR',
                        subTitle: 'Please Try Again',
                        buttons: ['Ok']
                    });
                    loading.dismiss();
                    alert.present();
                });
            };
    };
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
    EmployeeNotification.prototype.segment_change = function () {
        if (this.Notiseg == 'accepted') {
            this.ngOnInit();
        }
    };
    EmployeeNotification = __decorate([
        IonicPage(),
        Component({
            selector: 'page-employee-notification',
            templateUrl: 'employee-notification.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            DataService, AlertController,
            LoadingController])
    ], EmployeeNotification);
    return EmployeeNotification;
}());
export { EmployeeNotification };
//# sourceMappingURL=employee-notification.js.map