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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
/**
 * Generated class for the Createaccount page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Createaccount = /** @class */ (function () {
    function Createaccount(locationAccuracy, navCtrl, navParams) {
        this.locationAccuracy = locationAccuracy;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    Createaccount.prototype.ionViewDidLoad = function () {
        this.request();
    };
    Createaccount.prototype.Customer = function () {
        this.navCtrl.push('CustomerRegistration');
    };
    Createaccount.prototype.Owner = function () {
        this.navCtrl.push('SalonReg2');
    };
    Createaccount.prototype.request = function () {
        var _this = this;
        this.locationAccuracy.canRequest().then(function (canRequest) {
            if (canRequest) {
                _this.locationAccuracy.request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function () {
                    console.log('Request successful.');
                    // alert("request Success")
                }, function (error) {
                    console.log('Error requesting location permissions', error);
                    // alert("request fail")
                });
            }
        });
    };
    Createaccount = __decorate([
        IonicPage(),
        Component({
            selector: 'page-createaccount',
            templateUrl: 'createaccount.html',
        }),
        __metadata("design:paramtypes", [LocationAccuracy,
            NavController, NavParams])
    ], Createaccount);
    return Createaccount;
}());
export { Createaccount };
//# sourceMappingURL=createaccount.js.map