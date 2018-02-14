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
 * Generated class for the CustomerPayments page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CustomerPayments = /** @class */ (function () {
    function CustomerPayments(navCtrl, navParams, dataservice, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataservice = dataservice;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.noinfo = 'false';
    }
    CustomerPayments.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomerPayments');
    };
    CustomerPayments.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.Paymentstatus(); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.payment = data;
                if (_this.payment.status == 1) {
                    _this.paymentinfo2 = _this.payment.customerpaymentdata.reverse();
                }
                if (_this.payment.status == 0) {
                    _this.noinfo = 'true';
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'SERVER ERROR',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                loading.dismiss();
                alert.present();
            });
        });
    };
    CustomerPayments = __decorate([
        IonicPage(),
        Component({
            selector: 'page-customer-payments',
            templateUrl: 'customer-payments.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            DataService, AlertController,
            LoadingController])
    ], CustomerPayments);
    return CustomerPayments;
}());
export { CustomerPayments };
//# sourceMappingURL=customer-payments.js.map