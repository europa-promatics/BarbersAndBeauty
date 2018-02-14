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
 * Generated class for the CustomerWithoutPaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CustomerWithoutPaymentPage = /** @class */ (function () {
    function CustomerWithoutPaymentPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.salonname = this.navParams.get('salonname');
    }
    CustomerWithoutPaymentPage.prototype.viewbooking = function () {
        this.navCtrl.setRoot('CustomerPayments');
    };
    CustomerWithoutPaymentPage.prototype.viewsearchpage = function () {
        this.navCtrl.popTo(this.navCtrl.getByIndex(1));
    };
    CustomerWithoutPaymentPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-customer-without-payment',
            templateUrl: 'customer-without-payment.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], CustomerWithoutPaymentPage);
    return CustomerWithoutPaymentPage;
}());
export { CustomerWithoutPaymentPage };
//# sourceMappingURL=customer-without-payment.js.map