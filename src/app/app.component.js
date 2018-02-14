var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { Events, AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { FCM } from '@ionic-native/fcm';
// import {
//   Push,
//   PushToken
// } from '@ionic/cloud-angular';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, alertCtrl, splashScreen, events, network, fcm) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.network = network;
        this.fcm = fcm;
        events.subscribe('user:created', function (user, authinfo, username, userpic, optional) {
            if (optional) {
                _this.userprofilepic = optional;
                _this.username = username;
                _this.usertype = user;
                _this.auth = authinfo;
            }
            else {
                _this.usertype = user;
                _this.auth = authinfo;
                _this.username = username;
                _this.userprofilepic = userpic;
                if (_this.userprofilepic == 'null') {
                    _this.userprofilepic = 'false';
                }
                else {
                    _this.userprofilepic = userpic;
                }
            }
        });
        this.pages = [
            { title: 'HOME', component: 'CustomerCategories', logo: 'assets/icon/icon8.png' },
            { title: 'MY ONLINE PAYMENTS', component: 'CustomerPayments', logo: 'assets/icon/payment.png' },
            { title: 'MY BOOKINGS', component: 'CustomerBookings', logo: 'assets/icon/icon11.png' },
            // { title: 'MY APPOINTMENTS', component:'CustomerCalendarAppointmentsPage', logo: 'assets/icon/icon11.png'},
            { title: 'NOTIFICATION', component: 'CustomerNotification', logo: 'assets/icon/icon30png.png' },
            { title: 'SHOPS NEAR BY', component: 'NearBySalon', logo: 'assets/icon/icon25.png' },
            { title: 'ABOUT US', component: 'AboutUs', logo: 'assets/icon/icon12.png' },
            { title: 'CONTACT US', component: 'ContactUs', logo: 'assets/icon/icon15.png' },
            { title: 'FAQ', component: 'Faq', logo: 'assets/icon/icon18.png' },
            { title: 'HOW IT WORKS', component: 'HowItWorks', logo: 'assets/icon/icon19.png' },
        ];
        this.salonside = [
            { title: 'HOME', component: 'MySalonHome', logo: 'assets/icon/icon8.png' },
            // { title: 'MY APPOINTMENTS', component:'SalonAppointment' , logo: 'assets/icon/payment.png'},
            { title: 'EDIT SALON CATEGORY', component: 'SalonEditCategoryPage', logo: 'assets/icon/icon11.png' },
            // { title: 'NOTIFICATION', component:'SalonNotification', logo: 'assets/icon/icon30png.png'},
            { title: 'MY GALLERY', component: 'SalonImageGallery', logo: 'assets/icon/icon.png' },
            { title: 'ABOUT US', component: 'AboutUs', logo: 'assets/icon/icon12.png' },
            { title: 'CONTACT US', component: 'ContactUs', logo: 'assets/icon/icon15.png' },
            { title: 'FAQ', component: 'Faq', logo: 'assets/icon/icon18.png' },
        ];
        this.employeeside = [
            { title: 'HOME', component: 'EmployeeHome', logo: 'assets/icon/icon8.png' },
            { title: 'MY APPOINTMENTS', component: 'EmployeeAppointments', logo: 'assets/icon/payment.png' },
            { title: 'MY AVAILABILITY', component: 'EmployeeOnlineOffline', logo: 'assets/icon/icon11.png' },
        ];
        this.guestside = [
            { title: 'HOME', component: HomePage, logo: 'assets/icon/icon8.png' },
            { title: 'LOGIN', component: 'Login', logo: 'assets/icon/icon8.png' },
            { title: 'SIGN UP', component: 'Createaccount', logo: 'assets/icon/payment.png' },
            { title: 'ABOUT US', component: 'AboutUs', logo: 'assets/icon/icon12.png' },
            { title: 'CONTACT US', component: 'ContactUs', logo: 'assets/icon/icon15.png' },
            { title: 'FAQ', component: 'Faq', logo: 'assets/icon/icon18.png' },
            { title: 'HOW IT WORKS', component: 'HowItWorks', logo: 'assets/icon/icon19.png' },
        ];
        if (localStorage['authenticate'] == 'Customerside') {
            this.usertype = 0;
            this.auth = 'true';
            this.rootPage = 'CustomerCategories';
            this.username = localStorage['username'];
            this.userprofilepic = localStorage['img'];
        }
        else if (localStorage['authenticate'] == 'Salonside') {
            this.usertype = 1;
            this.auth = 'true';
            this.rootPage = 'MySalonHome';
            this.username = localStorage['username'];
            this.userprofilepic = localStorage['img'];
        }
        else if (localStorage['authenticate'] == 'Employeeside') {
            this.usertype = 2;
            this.auth = 'true';
            this.rootPage = 'EmployeeHome';
            this.username = localStorage['username'];
            this.userprofilepic = localStorage['img'];
        }
        else if (localStorage['authenticate'] == 'Guest') {
            this.usertype = 3;
            this.auth = 'false';
            this.rootPage = 'CustomerCategories';
            this.username = localStorage['username'];
            this.userprofilepic = 'false';
        }
        else if (localStorage['authenticate'] != 'Customerside'
            || localStorage['authenticate'] != 'Salonside'
            || localStorage['authenticate'] != 'Employeeside'
            || localStorage['authenticate'] != 'Guest') {
            this.rootPage = HomePage;
        }
        platform.ready().then(function () {
        console.log(Device.platform);
            statusBar.overlaysWebView(false);
            splashScreen.hide();
            if(Device.platform=='Browser'){
            alert('hello');
            this.push.register().then((t: PushToken) => {
              return this.push.saveToken(t);
            }).then( (t: PushToken) => {
              console.log('Token Saved', t.token);
              localStorage['token']=t.token;
            alert("token"+JSON.stringify(localStorage['token']))
            }).catch( (err) => {
              console.log('Error Saving Token: ' , err);
            });
            this.push.rx.notification()
            .subscribe((msg) => {
            alert('I received awesome push: ' + JSON.stringify(msg));
            });
            }
              this.fcm.getToken().then(token=>{
                   alert('Token saved:'+token); 
                     })
            this.fcm.subscribeToTopic('ASIF');
            this.fcm.onNotification().subscribe(data=>{
              if(data.wasTapped){
                alert("Received in background"+JSON.stringify(data));
                // this.notification(data)
              } else {
                if(this.enable){
                  let a = this.alertCtrl.create({
                    title:data.title,
                    message:data.body,
                    buttons:['ok']
                  })
                  a.present();
                }
                alert("Received in foreground");
              };
            })
            var disconnectSub = network.onDisconnect().subscribe(function () {
                var alert = _this.alertCtrl.create({
                    title: 'ALERT',
                    subTitle: 'Please Turn Your Network On',
                    buttons: ['Ok']
                });
                alert.present();
            });
            var connectSub = network.onConnect().subscribe(function () {
                // alert('you are online');
            });
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // statusBar.styleDefault();
        });
    }
    MyApp.prototype.salonPage = function (page) {
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.EmployeePage = function (page) {
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.guest = function (page) {
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.logout = function () {
        var _this = this;
        delete localStorage['customerid'];
        var confirm = this.alertCtrl.create({
            title: 'Alert!',
            message: 'Are you sure want to Logout?',
            buttons: [
                {
                    text: 'Disagree',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Agree',
                    handler: function () {
                        localStorage['auth'] = 'false';
                        delete localStorage['authenticate'];
                        delete localStorage['usertype'];
                        _this.nav.push(HomePage);
                    }
                }
            ]
        });
        confirm.present();
    };
    MyApp.prototype.userprofile = function () {
        this.nav.push('CustomerAccount');
    };
    MyApp.prototype.salonownerprofile = function () {
        this.nav.push('SalonOwnerProfile2');
    };
    MyApp.prototype.Employeeprofile = function () {
        this.nav.push('EmployeeViewEditProfile');
    };
    MyApp.prototype.logsalonout = function () {
        this.nav.setRoot(HomePage);
    };
    MyApp.prototype.registerPush = function () {
        // Check that we are on a device
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform, StatusBar,
            AlertController,
            SplashScreen,
            Events,
            Network, FCM])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map