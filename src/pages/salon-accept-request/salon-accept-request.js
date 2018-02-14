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
import { Observable } from "rxjs/Rx";
import { DataService } from '../../providers/data-service';
/**
 * Generated class for the SalonAcceptRequest page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalonAcceptRequest = /** @class */ (function () {
    function SalonAcceptRequest(navCtrl, navParams, loadingCtrl, dataservice, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.dataservice = dataservice;
        this.alertCtrl = alertCtrl;
        this.service_selected = [];
        this.notification_data = this.navParams.get('nextpagedata');
        this.mynotifydata = this.notification_data.serviceinfo;
        this.image = this.notification_data.customer_image;
        // this.tabBarElement = document.querySelector('.tabbar.show-tabbar'); 
        for (var i = 0; i < this.mynotifydata.length; i++) {
            // alert(this.mynotifydata)
            this.service_selected.push(this.mynotifydata[i].title + ' ');
        }
    }
    SalonAcceptRequest.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalonAcceptRequest');
    };
    SalonAcceptRequest.prototype.accept = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait ...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.AcceptBooking(_this.notification_data.payment_id, 1); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.mydata = data;
                _this.show = data.status;
                if (_this.show == 0) {
                    var alert_1 = _this.alertCtrl.create({
                        subTitle: data.message,
                        buttons: ['OK']
                    });
                    alert_1.present();
                }
                else if (_this.mydata.message == "Your Booking Accepted By Salon Owner") {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'Done!',
                        subTitle: 'Booking is successfully accepted',
                        buttons: ['OK']
                    });
                    alert_2.present();
                    _this.navCtrl.pop();
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
    SalonAcceptRequest.prototype.takeMeback = function () {
        this.navCtrl.parent.select(0);
    };
    SalonAcceptRequest.prototype.decline = function (booking_id) {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait ...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.DeclineBooking(_this.notification_data.payment_id, 2); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.mydata = data;
                _this.show = _this.mydata.status;
                if (_this.show == 0) {
                    var alert_3 = _this.alertCtrl.create({
                        subTitle: data.message,
                        buttons: ['OK']
                    });
                    alert_3.present();
                }
                else 
                //      localStorage['mystatus']=this.mydata
                if (_this.mydata.message == 'Your Booking Declined By Salon Owner') {
                    var alert_4 = _this.alertCtrl.create({
                        title: 'Done!',
                        subTitle: 'Booking is successfully declined',
                        buttons: ['OK']
                    });
                    alert_4.present();
                    _this.navCtrl.pop();
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
    SalonAcceptRequest = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-accept-request',
            templateUrl: 'salon-accept-request.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, LoadingController, DataService, AlertController])
    ], SalonAcceptRequest);
    return SalonAcceptRequest;
}());
export { SalonAcceptRequest };
//# sourceMappingURL=salon-accept-request.js.map