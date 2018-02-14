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
 * Generated class for the SalonPaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalonPaymentPage = /** @class */ (function () {
    function SalonPaymentPage(navCtrl, navParams, dataservice, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataservice = dataservice;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.past = false;
    }
    SalonPaymentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalonPaymentPage');
    };
    SalonPaymentPage.prototype.payment_page2 = function (m) {
        this.navCtrl.push('SalonPaymentPage2', { mypayment_data: m });
    };
    SalonPaymentPage.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.get_appointment_data(); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.minedata = data;
                // alert(this.minedata.status)
                if (_this.minedata.status == 0) {
                    _this.past = true;
                }
                _this.customer_name = _this.minedata.customerappointment;
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
    SalonPaymentPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-payment-page',
            templateUrl: 'salon-payment-page.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, DataService, LoadingController, AlertController])
    ], SalonPaymentPage);
    return SalonPaymentPage;
}());
export { SalonPaymentPage };
//# sourceMappingURL=salon-payment-page.js.map