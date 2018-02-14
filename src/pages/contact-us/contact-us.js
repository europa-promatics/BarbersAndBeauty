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
import { FormBuilder, Validators } from '@angular/forms';
/**
 * Generated class for the ContactUs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ContactUs = /** @class */ (function () {
    function ContactUs(navCtrl, navParams, formBuilder, dataservice, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.dataservice = dataservice;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var name = /^([a-zA-Z ]){1,30}$/;
        var numberregex = /^\d+$/;
        var namevalidation = /^[^-\s][a-zA-Z_\s-]+$/;
        var messagevalid = /^[^-\s][a-zA-Z0-9_\s-]+$/;
        this.contactus = formBuilder.group({
            username: ['', Validators.compose([Validators.pattern(namevalidation), Validators.required])],
            // countrycode: ['', Validators.compose([Validators.pattern(numberregex),Validators.required])],
            useremail: ['', Validators.compose([
                    Validators.pattern(emailRegex), Validators.required
                ])],
            usernumber: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(15), Validators.pattern(numberregex), Validators.required])],
            usermessage: ['', Validators.compose([Validators.pattern(messagevalid), Validators.required])]
        });
    }
    ContactUs.prototype.Contact = function () {
        // alert(this.usernumber)
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.ContactUs(_this.name, _this.email, _this.number, _this.message); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.res = data;
                if (_this.res.usertype == 0) {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Thank You ',
                        subTitle: 'We will Contact you Soon',
                        buttons: [{
                                text: 'OK',
                                handler: function (data) {
                                    _this.navCtrl.setRoot('CustomerCategories');
                                }
                            }]
                    });
                    alert_1.present();
                }
                if (_this.res.usertype == 1) {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'Thank You ',
                        subTitle: 'We will Contact you Soon',
                        buttons: [{
                                text: 'OK',
                                handler: function (data) {
                                    _this.navCtrl.setRoot('MySalonHome');
                                }
                            }]
                    });
                    alert_2.present();
                }
                if (_this.res.usertype == 2) {
                    var alert_3 = _this.alertCtrl.create({
                        title: 'Thank You ',
                        subTitle: 'We will Contact you Soon',
                        buttons: [{
                                text: 'OK',
                                handler: function (data) {
                                    _this.navCtrl.setRoot('EmployeeHome');
                                }
                            }]
                    });
                    alert_3.present();
                }
                if (_this.res.usertype == 3) {
                    var alert_4 = _this.alertCtrl.create({
                        title: 'Thank You ',
                        subTitle: 'We will Contact you Soon',
                        buttons: [{
                                text: 'OK',
                                handler: function (data) {
                                    _this.navCtrl.setRoot('CustomerCategories');
                                }
                            }]
                    });
                    alert_4.present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'SERVER ERROR',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                alert.present();
            });
        });
    };
    ContactUs = __decorate([
        IonicPage(),
        Component({
            selector: 'page-contact-us',
            templateUrl: 'contact-us.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            FormBuilder,
            DataService, LoadingController,
            AlertController])
    ], ContactUs);
    return ContactUs;
}());
export { ContactUs };
//# sourceMappingURL=contact-us.js.map