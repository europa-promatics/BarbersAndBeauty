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
/**
 * Generated class for the SalonPaymentPage2 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalonPaymentPage2 = /** @class */ (function () {
    function SalonPaymentPage2(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.myservice = [];
        this.payment_data2 = this.navParams.get('mypayment_data');
        this.services = this.payment_data2.service;
        console.log(JSON.stringify(this.services));
        // for(var i=0;i>this.services.length;i++){
        //    this.myservice.push(this.services[i].title)
        // }
        // console.log(JSON.stringify(this.myservice))
    }
    SalonPaymentPage2.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalonPaymentPage2');
    };
    SalonPaymentPage2 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-payment-page2',
            templateUrl: 'salon-payment-page2.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], SalonPaymentPage2);
    return SalonPaymentPage2;
}());
export { SalonPaymentPage2 };
//# sourceMappingURL=salon-payment-page2.js.map