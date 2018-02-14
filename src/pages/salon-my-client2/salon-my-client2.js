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
 * Generated class for the SalonMyClient2 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalonMyClient2 = /** @class */ (function () {
    function SalonMyClient2(navCtrl, navParams, dataservice, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataservice = dataservice;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.past = false;
        this.unique_client_array = [];
    }
    SalonMyClient2.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalonMyClient2');
    };
    SalonMyClient2.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.myclient(); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.minedata = data;
                console.log(JSON.stringify(_this.minedata));
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
    SalonMyClient2.prototype.client_page2 = function (m) {
        this.navCtrl.push('SalonMyClient3', { data: m });
    };
    SalonMyClient2 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-my-client2',
            templateUrl: 'salon-my-client2.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, DataService, LoadingController, AlertController])
    ], SalonMyClient2);
    return SalonMyClient2;
}());
export { SalonMyClient2 };
//# sourceMappingURL=salon-my-client2.js.map