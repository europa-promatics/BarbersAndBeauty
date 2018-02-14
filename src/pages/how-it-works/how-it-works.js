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
 * Generated class for the HowItWorks page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var HowItWorks = /** @class */ (function () {
    function HowItWorks(navCtrl, navParams, dataservice, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataservice = dataservice;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    HowItWorks.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.Howitworks(); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.howworks = data;
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'Timeout',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                alert.present();
            });
        });
    };
    HowItWorks = __decorate([
        IonicPage(),
        Component({
            selector: 'page-how-it-works',
            templateUrl: 'how-it-works.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            DataService, AlertController,
            LoadingController])
    ], HowItWorks);
    return HowItWorks;
}());
export { HowItWorks };
//# sourceMappingURL=how-it-works.js.map