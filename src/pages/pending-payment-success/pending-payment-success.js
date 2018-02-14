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
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
/**
 * Generated class for the PendingPaymentSuccessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PendingPaymentSuccessPage = /** @class */ (function () {
    function PendingPaymentSuccessPage(navCtrl, navParams, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.orderid = this.navParams.get('orderid');
        this.transactionid = this.navParams.get('transactionid');
        this.paymentdate = this.navParams.get('paymentdate');
        this.paymenttime = this.navParams.get('paymenttime');
        this.totalamount = this.navParams.get('totalamount');
        this.salonname = this.navParams.get('salonname');
        this.salonid = this.navParams.get('salonid');
    }
    PendingPaymentSuccessPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PendingPaymentSuccessPage');
    };
    PendingPaymentSuccessPage.prototype.viewbooking = function () {
        this.navCtrl.setRoot('CustomerPayments');
    };
    PendingPaymentSuccessPage.prototype.givereview = function () {
        var profileModal = this.modalCtrl.create('CustomerAddReviewModel', { salonname: this.salonname, salonid: this.salonid });
        profileModal.onDidDismiss(function (data) {
            console.log(data);
        });
        profileModal.present();
    };
    PendingPaymentSuccessPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-pending-payment-success',
            templateUrl: 'pending-payment-success.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            ModalController])
    ], PendingPaymentSuccessPage);
    return PendingPaymentSuccessPage;
}());
export { PendingPaymentSuccessPage };
//# sourceMappingURL=pending-payment-success.js.map