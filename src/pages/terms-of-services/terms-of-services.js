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
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { Observable } from "rxjs/Rx";
/**
 * Generated class for the TermsOfServices page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var TermsOfServices = /** @class */ (function () {
    function TermsOfServices(navCtrl, navParams, dataservice, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataservice = dataservice;
        this.loadingCtrl = loadingCtrl;
    }
    TermsOfServices.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TermsOfServices');
    };
    TermsOfServices.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.TermsandCondition(); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.terms = data;
                _this.termheading = _this.terms.termdata.heading;
                _this.termcontent = _this.terms.termdata.content;
                _this.policytitle = _this.terms.policydata.title;
                _this.policydesc = _this.terms.policydata.description;
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    TermsOfServices = __decorate([
        IonicPage(),
        Component({
            selector: 'page-terms-of-services',
            templateUrl: 'terms-of-services.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, DataService,
            LoadingController])
    ], TermsOfServices);
    return TermsOfServices;
}());
export { TermsOfServices };
//# sourceMappingURL=terms-of-services.js.map