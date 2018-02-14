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
 * Generated class for the Faq page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Faq = /** @class */ (function () {
    function Faq(navCtrl, dataservice, navParams, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.dataservice = dataservice;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.count = 0;
    }
    Faq.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Faq');
    };
    Faq.prototype.question = function (i) {
        this.count++;
        if (this.count % 2 != 0) {
            this.answer = i;
        }
        else {
            this.answer = 'p';
        }
    };
    Faq.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.Faq(); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.faqdata = data;
                _this.faqcontent = _this.faqdata.faqinfo;
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'Something Went Wrong',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                alert.present();
            });
        });
    };
    Faq = __decorate([
        IonicPage(),
        Component({
            selector: 'page-faq',
            templateUrl: 'faq.html',
        }),
        __metadata("design:paramtypes", [NavController, DataService,
            NavParams, LoadingController, AlertController])
    ], Faq);
    return Faq;
}());
export { Faq };
//# sourceMappingURL=faq.js.map