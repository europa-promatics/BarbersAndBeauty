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
import { IonicPage, NavController, Events, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { Observable } from "rxjs/Rx";
import { DataService } from '../../providers/data-service';
/**
 * Generated class for the EmployeeHome page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EmployeeHome = /** @class */ (function () {
    function EmployeeHome(navCtrl, menu, events, loadingCtrl, dataservice, alertCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.dataservice = dataservice;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.imagePath = localStorage['img'];
        this.menu = menu;
        this.menu.enable(true, 'myMenu');
        // this.backimg = './assets/img/model-image.jpg';
        events.subscribe('user:created', function (user, authinfo, username, userpic, optional) {
            if (optional) {
                _this.imagePath = optional;
            }
            else {
                _this.imagePath = userpic;
            }
        });
    }
    EmployeeHome.prototype.directory = function () {
        localStorage['directory'] = true;
        this.navCtrl.push('CustomerCategories');
    };
    EmployeeHome.prototype.notification = function () {
        this.navCtrl.push('EmployeeNotification');
    };
    EmployeeHome.prototype.Profile = function () {
        this.navCtrl.push('EmployeeViewEditProfile');
    };
    EmployeeHome.prototype.client = function () {
        this.navCtrl.push('EmployeeClient');
    };
    EmployeeHome.prototype.Gallery = function () {
        this.navCtrl.push('EmployeeUploadImages');
    };
    EmployeeHome.prototype.APPOINTMENTS = function () {
        this.navCtrl.push('EmployeeAppointments');
    };
    EmployeeHome.prototype.FAQ = function () {
        this.navCtrl.push('Faq');
    };
    EmployeeHome.prototype.About = function () {
        this.navCtrl.push('AboutUs');
    };
    EmployeeHome.prototype.Contact = function () {
        this.navCtrl.push('ContactUs');
    };
    // ngOnInit(){
    //    this.notificationcount()
    // }
    EmployeeHome.prototype.ionViewWillEnter = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.EmployeeBookingCounts(); })
            .subscribe(function (data) {
            loading.dismiss().then(function () {
                _this.bookingcount = data;
                _this.count = _this.bookingcount.totalcount;
                console.log("salondetails info" + JSON.stringify(_this.bookingcount));
            }),
                function (error) {
                    return loading.dismiss().then(function () {
                        var alert = _this.alertCtrl.create({
                            title: 'SERVER ERROR',
                            subTitle: 'Something Went Wrong',
                            buttons: ['ok']
                        });
                        alert.present();
                    });
                };
            // setTimeout(() => {
            //    this.notificationcount();
            //   }, 10000);
        });
    };
    EmployeeHome = __decorate([
        IonicPage(),
        Component({
            selector: 'page-employee-home',
            templateUrl: 'employee-home.html',
        }),
        __metadata("design:paramtypes", [NavController, MenuController,
            Events, LoadingController,
            DataService, AlertController,
            NavParams])
    ], EmployeeHome);
    return EmployeeHome;
}());
export { EmployeeHome };
//# sourceMappingURL=employee-home.js.map