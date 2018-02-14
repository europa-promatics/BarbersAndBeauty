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
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { DataService } from "../../providers/data-service";
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from "rxjs/Rx";
import { Events } from 'ionic-angular';
var MySalonHome = /** @class */ (function () {
    function MySalonHome(navCtrl, navParams, loadingCtrl, dataservice, events, menu, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.dataservice = dataservice;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.userprofilepic = localStorage['img'];
        this.username = localStorage['username'];
        this.menu = menu;
        this.menu.enable(true, 'myMenu');
        events.subscribe('user:created', function (user, authinfo, username, userpic, optional) {
            if (optional) {
                _this.userprofilepic = optional;
            }
            else {
                _this.userprofilepic = userpic;
            }
        });
    }
    MySalonHome.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MySalonHome');
    };
    MySalonHome.prototype.myapointments = function () {
        // this.navCtrl.push('SalonAppointment')
        this.navCtrl.push('SalonClientBooking');
    };
    MySalonHome.prototype.onlinebooking = function () {
        this.navCtrl.push('SalonOnlineBooking');
    };
    MySalonHome.prototype.businessinfo = function () {
        this.navCtrl.push('SalonBuisnessInfo');
    };
    MySalonHome.prototype.myservicelist = function () {
        this.navCtrl.push('SalonServiceList');
    };
    MySalonHome.prototype.notification = function () {
        this.navCtrl.push('SalonNotification', { notfication_all_data: this.minedata });
    };
    MySalonHome.prototype.addemploye = function () {
        this.navCtrl.push('MyEmployees');
    };
    MySalonHome.prototype.upload_myimages = function () {
        this.navCtrl.push('MySalonImageUpload');
    };
    MySalonHome.prototype.subscription_plans = function () {
        this.navCtrl.push('MySalonSubscrptionPage1');
    };
    MySalonHome.prototype.paymentstatus = function () {
        this.navCtrl.push('SalonPaymentPage');
    };
    MySalonHome.prototype.myclients = function () {
        this.navCtrl.push('SalonMyClient2');
    };
    MySalonHome.prototype.mylocation = function () {
        localStorage['directory'] = true;
        this.navCtrl.push('CustomerCategories');
    };
    MySalonHome.prototype.ionViewWillEnter = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.MySalonNotification(); })
            .subscribe(function (data) {
            loading.dismiss();
            _this.minedata = data;
            _this.notification_count = _this.minedata.bookingcount;
            _this.zero_count = _this.minedata.status;
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
    MySalonHome = __decorate([
        IonicPage(),
        Component({
            selector: 'page-my-salon-home',
            templateUrl: 'my-salon-home.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, LoadingController, DataService, Events, MenuController, AlertController])
    ], MySalonHome);
    return MySalonHome;
}());
export { MySalonHome };
// this.mynotication_data = this.minedata.bookinginfo
//           this.cancel_notication_data = this.minedata.cancelinfo
//  this.mystatus=this.minedata.status            
// alert(this.notification_count)
// alert(this.zero_count)
// localStorage['count']=  this.notifiy_count 
//# sourceMappingURL=my-salon-home.js.map