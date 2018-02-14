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
import { NavController, MenuController, ActionSheetController, AlertController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { DataService } from '../../providers/data-service';
import { Observable } from "rxjs/Rx";
import { Events, LoadingController } from 'ionic-angular';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, menu, events, loadingCtrl, actionSheetCtrl, dataservice, fb, alertCtrl) {
        this.navCtrl = navCtrl;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.dataservice = dataservice;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.FB_APP_ID = 1931935820389211;
        this.fb.browserInit(this.FB_APP_ID, "v2.8");
        this.menu = menu;
        this.menu.enable(false, 'myMenu');
        this.token = localStorage['token'];
    }
    HomePage.prototype.login = function () {
        this.navCtrl.push('Login');
    };
    HomePage.prototype.signme = function () {
        this.navCtrl.push('Createaccount');
    };
    HomePage.prototype.fblogin = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Login with FACEBOOK',
            buttons: [
                {
                    text: 'As a Customer',
                    role: 'destructive',
                    icon: 'person',
                    handler: function () {
                        var usertype = 0;
                        _this.CustomerFblog(usertype);
                        console.log('Destructive clicked');
                    }
                },
                {
                    text: 'As a Business Owner',
                    icon: 'person',
                    handler: function () {
                        var usertype = 1;
                        _this.CustomerFblog(usertype);
                        console.log('Archive clicked');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: 'close-circle',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    HomePage.prototype.CustomerFblog = function (usertype) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        var permissions = new Array();
        permissions = ["public_profile", "email"];
        this.fb.login(permissions)
            .then(function (response) {
            loading.dismiss();
            var userId = response.authResponse.userID;
            var params = new Array();
            _this.fb.api("/me?fields=name,gender,email,id", params)
                .then(function (user) {
                user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                _this.facebook(user.email, user.name, userId, usertype, user.picture);
                // alert('type'+user.picture+''+user.name+''+user.email);
            });
        }, function (error) {
            var alert = _this.alertCtrl.create({
                title: 'Alert!',
                subTitle: 'Something went wrong.',
                buttons: ['OK']
            });
            alert.present();
        });
    };
    HomePage.prototype.facebook = function (email, username, fbid, usertype, img) {
        var _this = this;
        // alert("inside fb222 block")
        // var email1='asif@gmail.com';
        // var username1='deepp';
        // var fbid1=124234234455;
        //  var usertype1=1;
        // var img1='https://graph.facebook.com/1168982779874130/picture?type=large';
        var loading = this.loadingCtrl.create({ content: 'Loading...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.Facebook(email, username, fbid, usertype, img); })
            .subscribe(function (data) {
            loading.dismiss();
            // alert('data'+JSON.stringify(data));
            _this.item = data;
            // alert("service response"+JSON.stringify(this.item));
            _this.items = _this.item.data;
            if (usertype == _this.items.usertype) {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Thank You!',
                    subTitle: 'Login successful.',
                    buttons: ['OK']
                });
                alert_1.present();
                localStorage['usertype'] = _this.items.usertype;
                localStorage['username'] = _this.items.name;
                localStorage['salonid'] = _this.items.id;
                localStorage['employeeid'] = _this.items.id;
                localStorage['customerid'] = _this.items.id;
                localStorage['useremail'] = _this.items.email;
                localStorage['auth'] = 'true';
                localStorage['customerpic'] = _this.items.profile_image;
                localStorage['directory'] = false;
                _this.events.publish('user:created', localStorage['usertype'], localStorage['auth'] = 'true', localStorage['username'], localStorage['customerpic']);
                if (_this.items.usertype == 0) {
                    localStorage['authenticate'] = 'Customerside';
                    _this.navCtrl.setRoot('CustomerCategories');
                }
                else if (_this.items.usertype == 1) {
                    localStorage['authenticate'] = 'Salonside';
                    _this.navCtrl.setRoot('MySalonHome');
                }
            }
            else {
                if (_this.items.usertype == 0) {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'Alert!',
                        subTitle: 'Email id already exist as a customer',
                        buttons: ['OK']
                    });
                    alert_2.present();
                }
                else if (_this.items.usertype == 1) {
                    var alert_3 = _this.alertCtrl.create({
                        title: 'Alert!',
                        subTitle: 'Email id already exist as a salon owner',
                        buttons: ['OK']
                    });
                    alert_3.present();
                }
            }
        }),
            function (error) {
                var alert = _this.alertCtrl.create({
                    title: 'Alert!',
                    subTitle: 'Something went wrong',
                    buttons: ['OK']
                });
                alert.present();
            };
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, MenuController,
            Events,
            LoadingController,
            ActionSheetController,
            DataService,
            Facebook,
            AlertController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map