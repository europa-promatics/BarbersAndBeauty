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
import { Login } from '../login/login';
/**
 * Generated class for the ForgetPassword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ForgetPassword = /** @class */ (function () {
    function ForgetPassword(navCtrl, navParams, alertCtrl, formBuilder, dataservice, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.dataservice = dataservice;
        this.loadingCtrl = loadingCtrl;
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        this.forgetform = formBuilder.group({
            useremail: ['', Validators.compose([
                    Validators.pattern(emailRegex), Validators.required
                ])],
        });
    }
    ForgetPassword.prototype.forget = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.forgetpassword(_this.email); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.info = data;
                if (_this.info.status == 1) {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'ALERT!',
                        subTitle: 'Check your mail inbox and follow the procedure to reset your passowrd',
                        buttons: ['ok']
                    });
                    alert_1.present();
                    _this.navCtrl.pop(Login);
                }
                else if (_this.info.status == 0) {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'ALERT!',
                        subTitle: 'Invalid E-Mail',
                        buttons: ['ok']
                    });
                    alert_2.present();
                }
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
    ForgetPassword = __decorate([
        IonicPage(),
        Component({
            selector: 'page-forget-password',
            templateUrl: 'forget-password.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            AlertController, FormBuilder,
            DataService, LoadingController])
    ], ForgetPassword);
    return ForgetPassword;
}());
export { ForgetPassword };
//# sourceMappingURL=forget-password.js.map