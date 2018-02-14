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
 * Generated class for the MySalonSubscrptionPage3 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MySalonSubscrptionPage3 = /** @class */ (function () {
    function MySalonSubscrptionPage3(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // this.orderid=this.navParams.get('orderid');
        this.transactionid = this.navParams.get('transactionid');
        this.staff_member = this.navParams.get('total_member');
        // this.paymenttime=this.navParams.get('paymenttime');
        this.totalamount = this.navParams.get('totalamount');
    }
    MySalonSubscrptionPage3.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MySalonSubscrptionPage3');
    };
    MySalonSubscrptionPage3 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-my-salon-subscrption-page3',
            templateUrl: 'my-salon-subscrption-page3.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], MySalonSubscrptionPage3);
    return MySalonSubscrptionPage3;
}());
export { MySalonSubscrptionPage3 };
//# sourceMappingURL=my-salon-subscrption-page3.js.map