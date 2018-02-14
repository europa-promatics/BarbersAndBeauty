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
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
/**
 * Generated class for the CustomerRegistration page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CustomerRegistration = /** @class */ (function () {
    function CustomerRegistration(navCtrl, formBuilder, alertCtrl, navParams, http, events, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.validationname = false;
        this.http = http;
        this.data = {};
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var name = /^([a-zA-Z ]){1,30}$/;
        var namevalidation = /^[^-\s][a-zA-Z_\s-]+$/;
        var numberregex = /^\d+$/;
        // let number=/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
        this.custregister = formBuilder.group({
            username: ['', Validators.compose([Validators.pattern(namevalidation), Validators.required])],
            useremail: ['', Validators.compose([Validators.pattern(emailRegex), Validators.required])],
            gender: ['', Validators.compose([])],
            pass: ['', Validators.compose([Validators.maxLength(12),
                    Validators.minLength(3), Validators.required])],
            cpass: ['', Validators.compose([Validators.maxLength(12),
                    Validators.minLength(3), Validators.required])],
            usernumber: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(15), Validators.pattern(numberregex), Validators.required])],
        });
    }
    CustomerRegistration.prototype.checkdata = function (a) {
        if (isNaN(parseInt(a[a.length - 1]))) {
            this.validationname = false;
        }
        else {
            this.validationname = true;
        }
    };
    CustomerRegistration.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomerRegistration');
    };
    CustomerRegistration.prototype.terms = function () {
        this.navCtrl.push('TermsOfServices');
    };
    CustomerRegistration.prototype.skip = function () {
        this.navCtrl.setRoot('CustomerCategories');
        localStorage['usertype'] = 3;
        localStorage['auth'] = 'false';
        localStorage['username'] = 'Guest';
        localStorage['image'] = 'false';
        localStorage['authenticate'] = 'Guest';
        this.events.publish('user:created', localStorage['usertype'], localStorage['auth'], localStorage['username'], localStorage['image']);
    };
    CustomerRegistration.prototype.reg = function () {
        var _this = this;
        if (this.custregister.controls["pass"].value != this.custregister.controls["cpass"].value) {
            var alert_1 = this.alertCtrl.create({
                title: 'Alert!',
                subTitle: 'Password or confirm password Must be Same.',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else if (this.check == 'true' || this.check == true) {
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading_1.present();
            var link = 'http://gagandeepsethi.com/salonDirectory/WebServices/register.json';
            var data = JSON.stringify({
                full_name: this.name,
                email: this.email,
                password: this.password,
                confirm_password: this.cpass,
                contact_number: this.number,
                usertype: 0
            });
            this.http.post(link, data)
                .map(function (response) { return response.json(); })
                .subscribe(function (data) {
                loading_1.dismiss().then(function () {
                    _this.data = data;
                    console.log("response" + JSON.stringify(_this.data));
                    console.log("response2" + JSON.stringify(_this.data.status));
                    if (_this.data.status == 1) {
                        var alert_2 = _this.alertCtrl.create({
                            title: 'Thank You',
                            subTitle: 'Registration Successful Please Verify your Account',
                            buttons: ['ok']
                        });
                        alert_2.present();
                        _this.navCtrl.push('Login');
                    }
                    else if (_this.data.status == 0) {
                        console.log("inside ");
                        var alert_3 = _this.alertCtrl.create({
                            title: 'Alert',
                            subTitle: 'Entered E-Mail is already registered with us',
                            buttons: ['ok']
                        });
                        alert_3.present();
                    }
                }),
                    function (error) {
                        return loading_1.dismiss().then(function () {
                            var alert = _this.alertCtrl.create({
                                title: 'SERVER ERROR',
                                subTitle: 'Please Try Again',
                                buttons: ['Ok']
                            });
                            alert.present();
                        });
                    };
            });
        }
        else {
            var alert_4 = this.alertCtrl.create({
                title: 'Alert!',
                subTitle: 'Please read and accept terms & conditions.',
                buttons: ['OK']
            });
            alert_4.present();
        }
    };
    CustomerRegistration = __decorate([
        IonicPage(),
        Component({
            selector: 'page-customer-registration',
            templateUrl: 'customer-registration.html',
        }),
        __metadata("design:paramtypes", [NavController,
            FormBuilder, AlertController,
            NavParams, Http, Events,
            LoadingController])
    ], CustomerRegistration);
    return CustomerRegistration;
}());
export { CustomerRegistration };
//# sourceMappingURL=customer-registration.js.map