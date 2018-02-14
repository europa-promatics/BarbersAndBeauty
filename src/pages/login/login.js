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
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Device } from 'ionic-native';
import 'rxjs/Rx';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
var Login = /** @class */ (function () {
    function Login(navCtrl, alertCtrl, loadingCtrl, events, menu, device, formBuilder, navParams, http) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.device = device;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        // this.uuid=device.uuid;
        this.menu = menu;
        this.menu.enable(false, 'myMenu');
        this.http = http;
        this.data = {};
        this.email = localStorage['email'];
        this.password = localStorage['password'];
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        this.loginform = formBuilder.group({
            emailaddress: ['', Validators.compose([Validators.maxLength(50),
                    Validators.pattern(emailRegex), Validators.required])],
            pass: ['', Validators.compose([Validators.maxLength(12),
                    Validators.minLength(3), Validators.pattern(''), Validators.required])],
        });
    }
    Login.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Login');
    };
    Login.prototype.create = function () {
        this.navCtrl.push('Createaccount');
    };
    Login.prototype.forget = function () {
        this.navCtrl.push('ForgetPassword');
    };
    Login.prototype.login = function () {
        var _this = this;
        // alert("token"+JSON.stringify(localStorage['token']))
        // alert("uuid"+JSON.stringify(this.uuid))
        this.uuid = 'ba9953d9f793a39c';
        localStorage['token'] = 'dLdZO4z1vdc:APA91bHhXB4cpzGFrfoYWORXZjkawNCrEowlFTqeBgmmpMsB87Zm4UUa6J_JDT2f5yONefJVb5NV4RvRG2S8ZeroVHJ7QfD_mcAsCDj28FMsFOaJG3FD8mECL4fqucbcvOCTsChpWzv_';
        var loading = this.loadingCtrl.create({ content: 'Please wait...' });
        loading.present();
        var link = 'http://gagandeepsethi.com/salonDirectory/WebServices/login.json';
        var data = JSON.stringify({
            email: this.email,
            password: this.password
            // device_id:this.uuid,
            //   device_token:localStorage['token']
        });
        this.http.post(link, data)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            _this.data = data;
            //alert("response"+JSON.stringify(this.data.message));
            // console.log("data"+JSON.stringify(this.data.data.status));
            if (_this.data.message == 'login successfully') {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Login Successful.',
                    buttons: ['ok']
                });
                alert_1.present();
                localStorage['directory'] = false;
                localStorage['usertype'] = _this.data.data.usertype;
                localStorage['customerid'] = _this.data.data.cusotmer_id;
                localStorage['username'] = _this.data.data.full_name;
                localStorage['salonid'] = _this.data.data.salon_id;
                localStorage['customerpic'] = _this.data.data.profile_image;
                localStorage['employeeid'] = _this.data.data.employee_id;
                localStorage['useremail'] = _this.data.data.email;
                localStorage['customernumber'] = _this.data.data.contact_number;
                _this.customerpic = _this.data.data.profile_image;
                _this.salonownerpic = _this.data.data.profile_image;
                _this.employeepic = _this.data.data.profile_image;
                console.log("hello pic checking" + _this.customerpic);
                console.log("hello salonid" + localStorage['salonid']);
                console.log("data" + JSON.stringify(_this.data.data.usertype));
                if (_this.savepass == 'true' || _this.savepass == true) {
                    localStorage['email'] = _this.data.data.email;
                    localStorage['password'] = _this.password;
                }
                if (localStorage['usertype'] == 1) {
                    localStorage['auth'] = 'true';
                    localStorage['authenticate'] = 'Salonside';
                    _this.navCtrl.setRoot('MySalonHome');
                    if (_this.salonownerpic == null || _this.salonownerpic == 'null') {
                        localStorage['img'] = 'img/logo-image.png';
                    }
                    else {
                        var a = _this.salonownerpic.includes("http");
                        if (a == true || a == 'true') {
                            localStorage['img'] = _this.salonownerpic;
                        }
                        else {
                            localStorage['img'] = 'http://gagandeepsethi.com/salonDirectory/img/salonownerprofileimage/' + _this.salonownerpic;
                        }
                    }
                    _this.events.publish('user:created', localStorage['usertype'], localStorage['auth'] = 'true', localStorage['username'], localStorage['img']);
                }
                else if (localStorage['usertype'] == 0) {
                    localStorage['auth'] = 'true';
                    localStorage['authenticate'] = 'Customerside';
                    _this.navCtrl.setRoot('CustomerCategories');
                    if (_this.customerpic == null || _this.customerpic == 'null') {
                        localStorage['img'] = 'assets/img/user.jpg';
                    }
                    else {
                        var a = _this.customerpic.includes("http");
                        if (a == true || a == 'true') {
                            localStorage['img'] = _this.customerpic;
                        }
                        else {
                            localStorage['img'] = 'http://gagandeepsethi.com/salonDirectory/img/customerprofileimage/' + _this.customerpic;
                        }
                    }
                    _this.events.publish('user:created', localStorage['usertype'], localStorage['auth'] = 'true', localStorage['username'], localStorage['img']);
                }
                else if (localStorage['usertype'] == 2) {
                    console.log("hello barber");
                    localStorage['auth'] = 'true';
                    localStorage['authenticate'] = 'Employeeside';
                    _this.navCtrl.setRoot('EmployeeHome');
                    if (_this.employeepic == null || _this.employeepic == 'null') {
                        localStorage['img'] = 'assets/img/backpic.jpg';
                    }
                    else {
                        // localStorage['img']='assets/img/new.png';
                        localStorage['img'] = 'http://gagandeepsethi.com/salonDirectory/img/employeeprofileimage/' + _this.employeepic;
                    }
                    _this.events.publish('user:created', localStorage['usertype'], localStorage['auth'] = 'true', localStorage['username'], localStorage['img']);
                }
            }
            else if (_this.data.message == 'Please first verify your account then login') {
                var alert_2 = _this.alertCtrl.create({
                    title: 'ALERT!',
                    subTitle: 'Please Verify your Account',
                    buttons: ['ok']
                });
                alert_2.present();
            }
            else if (_this.data.message == 'This email does not exit') {
                var alert_3 = _this.alertCtrl.create({
                    title: 'ALERT!',
                    subTitle: 'Entered email is not registered',
                    buttons: ['ok']
                });
                alert_3.present();
            }
            else if (_this.data.message == 'Invalid Password') {
                var alert_4 = _this.alertCtrl.create({
                    title: 'ALERT!',
                    subTitle: 'Either E-mail or Password is incorrect',
                    buttons: ['ok']
                });
                alert_4.present();
            }
        }), function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'SERVER ERROR',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                loading.dismiss();
                alert.present();
            });
        };
    };
    Login = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController,
            AlertController,
            LoadingController,
            Events,
            MenuController,
            Device,
            FormBuilder,
            NavParams, Http])
    ], Login);
    return Login;
}());
export { Login };
//# sourceMappingURL=login.js.map