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
import { ModalController } from 'ionic-angular';
import { DataService } from "../../providers/data-service";
import { Observable } from "rxjs/Rx";
/**
 * Generated class for the SalonOnlineBooking page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalonOnlineBooking = /** @class */ (function () {
    function SalonOnlineBooking(navCtrl, navParams, modalCtrl, dataservice, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.dataservice = dataservice;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
    }
    SalonOnlineBooking.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalonOnlineBooking');
    };
    SalonOnlineBooking.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.get_account_settings(); })
            .subscribe(function (data) {
            // schedule_appointment":15,"hours_notice_for_online_booking"
            // :30,"hours_notice_for_cancel_booking
            return loading.dismiss().then(function () {
                _this.mydata = data;
                _this.payment_value = _this.mydata.data.online_booking;
                _this.available_value = _this.mydata.data.my_availability;
                _this.salon_visible_value = _this.mydata.data.salon_visibility;
                _this.selected_value2 = _this.mydata.data.schedule_appointment;
                _this.selected_value4 = _this.mydata.data.hours_notice_for_online_booking;
                _this.selected_value5 = _this.mydata.data.hours_notice_for_cancel_booking;
                _this.selected_value6 = _this.mydata.data.paypal_merchant_signature;
                _this.selected_value2 = "On" + " " + _this.selected_value2 + " " + "Min";
                if (_this.selected_value4 == 30) {
                    _this.selected_value4 = _this.selected_value4 + " " + "Min";
                }
                else {
                    _this.selected_value4 = _this.selected_value4 + " " + "Hour";
                }
                if (_this.selected_value5 == 30) {
                    _this.selected_value5 = _this.selected_value5 + " " + "Min";
                }
                else {
                    _this.selected_value5 = _this.selected_value5 + " " + "Hour";
                }
                if (_this.payment_value == 1) {
                    _this.payment_value = true;
                }
                else {
                    _this.payment_value = false;
                }
                if (_this.salon_visible_value == 'enable') {
                    _this.salon_visible_value = true;
                }
                else {
                    _this.salon_visible_value = false;
                }
                if (_this.available_value == "on dutty") {
                    _this.my_availability = true;
                }
                else {
                    _this.my_availability = false;
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'Timeout',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                loading.dismiss();
                alert.present();
            });
        });
    };
    SalonOnlineBooking.prototype.presentModal1 = function () {
        var _this = this;
        var modal = this.modalCtrl.create('OnlineConfirmation');
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data.value == undefined) {
                _this.selected_value1 = "";
            }
            else {
                _this.selected_value1 = data.value;
            }
        });
    };
    //    presentModal2() {
    //   let modal = this.modalCtrl.create('TimeSlots');
    //   modal.present();
    //      modal.onDidDismiss(data =>{
    //       this.selected_value2=data.value
    //      })
    // }
    SalonOnlineBooking.prototype.presentModal2 = function () {
        var _this = this;
        var modal = this.modalCtrl.create('TimeZone');
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data.value == undefined) {
                _this.selected_value2 = " ";
            }
            else {
                _this.selected_value2 = data.value;
            }
        });
    };
    //         presentModal3() {
    //   let modal = this.modalCtrl.create('SalonMultiServiceBooking');
    //   modal.present();
    //      modal.onDidDismiss(data =>{
    //       this.selected_value3=data.value
    //      })
    // }
    SalonOnlineBooking.prototype.presentModal4 = function () {
        var _this = this;
        var modal = this.modalCtrl.create('TimeNotice');
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data.value == undefined) {
                _this.selected_value4 = " ";
            }
            else {
                _this.selected_value4 = data.value;
            }
        });
    };
    SalonOnlineBooking.prototype.presentModal5 = function () {
        var _this = this;
        var modal = this.modalCtrl.create('SalonCancelHours');
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data.value == undefined) {
                _this.selected_value5 = " ";
            }
            else {
                _this.selected_value5 = data.value;
            }
        });
    };
    SalonOnlineBooking.prototype.paypal_settings = function () {
        var _this = this;
        var modal = this.modalCtrl.create('SalonPaypalSettingsPage');
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.mydata = data;
            if (_this.mydata == undefined) {
                _this.selected_value6 = 'not_empty';
            }
            else {
                _this.selected_value6 = _this.mydata;
            }
        });
    };
    SalonOnlineBooking.prototype.status = function () {
        if (this.payment_value == true) {
            var alert_1 = this.alertCtrl.create({
                title: 'Online Payment Enabled',
                buttons: ['Dismiss']
            });
            alert_1.present();
        }
        else {
            if (this.payment_value == false) {
                var alert_2 = this.alertCtrl.create({
                    title: 'Online Payment Disabled',
                    buttons: ['Dismiss']
                });
                alert_2.present();
            }
        }
    };
    SalonOnlineBooking.prototype.status_visible = function () {
        if (this.salon_visible_value == true) {
            var alert_3 = this.alertCtrl.create({
                title: ' Your Salon Visibility is now Turned On ',
                buttons: ['Dismiss']
            });
            alert_3.present();
        }
        else {
            if (this.salon_visible_value == false) {
                var alert_4 = this.alertCtrl.create({
                    title: 'Your Salon Visibility is now Turned Off',
                    buttons: ['Dismiss']
                });
                alert_4.present();
            }
        }
    };
    SalonOnlineBooking.prototype.status_available = function () {
        if (this.my_availability == true) {
            var alert_5 = this.alertCtrl.create({
                title: ' My Availability is now Turned On ',
                buttons: ['Dismiss']
            });
            alert_5.present();
        }
        else {
            if (this.my_availability == false) {
                var alert_6 = this.alertCtrl.create({
                    title: 'My Availability is now Turned Off',
                    buttons: ['Dismiss']
                });
                alert_6.present();
            }
        }
    };
    SalonOnlineBooking.prototype.Save = function () {
        var _this = this;
        var splited1 = this.selected_value2.split(" ");
        this.schedule_appointment = splited1[1];
        var splited2 = this.selected_value4.split(" ");
        this.online_notice = splited2[0];
        var splited3 = this.selected_value5.split(" ");
        this.online_cancel = splited3[0];
        if (this.payment_value == true) {
            this.payment_value2 = 'enable';
        }
        else if (this.payment_value == false) {
            this.payment_value2 = 'disable';
        }
        if (this.salon_visible_value == true) {
            this.available_value2 = 'enable';
        }
        else if (this.salon_visible_value == false) {
            this.available_value2 = 'disable';
        }
        if (this.my_availability == true) {
            this.my_availability2 = 'on_dutty';
        }
        else if (this.my_availability == false) {
            this.my_availability2 = 'off_dutty';
        }
        // if(this.my_availability2!="" ||this.online_notice!=" "|| this.online_cancel!= ""){
        var loading = this.loadingCtrl.create({ content: 'Loading...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.account_settings(_this.payment_value2, _this.schedule_appointment, _this.available_value2, _this.my_availability2, _this.online_notice, _this.online_cancel, _this.selected_value6); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                if (data.status == 1) {
                    var alert_7 = _this.alertCtrl.create({
                        title: 'SAVED SUCCESSFULLY',
                        buttons: ['Dismiss']
                    });
                    alert_7.present();
                }
                else if (data.status == 0) {
                    var alert_8 = _this.alertCtrl.create({
                        title: 'PLEASE FILL ALL FIELDS',
                        buttons: ['Dismiss']
                    });
                    alert_8.present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'Timeout',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                loading.dismiss();
                alert.present();
            });
        });
        // }
        // else {
        //   alert('ho')
        // }
    };
    SalonOnlineBooking.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    SalonOnlineBooking = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-online-booking',
            templateUrl: 'salon-online-booking.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ModalController, DataService, LoadingController, AlertController])
    ], SalonOnlineBooking);
    return SalonOnlineBooking;
}());
export { SalonOnlineBooking };
//# sourceMappingURL=salon-online-booking.js.map