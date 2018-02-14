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
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the SalonCategory page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalonCategory = /** @class */ (function () {
    function SalonCategory(navCtrl, navParams, viewctrl, loadingCtrl, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewctrl = viewctrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.cbArr = [];
        this.cbChecked = [];
        this.submitted = false;
        this.cbArr = [
            { name: 'BARBER', id: 1 }, { name: 'HAIR STYLIST', id: 2 }, { name: 'WEAVE AND EXTENSIONS SPECIALIST', id: 3 }, { name: 'MAKE UP ARTIST', id: 4 },
            { name: 'NAIL MANICURE AND PEDICURE', id: 5 }, { name: 'TATOO ARTIST', id: 6 }, { name: 'MASSAGE THERAPIST', id: 7 }, { name: 'OTHER SERVICES', id: 8 }
        ];
        this.cbChecked = [];
        this.data = {};
        this.http = http;
        this.salon_name = this.navParams.get('salon_name'),
            this.address = this.navParams.get('address'),
            this.full_name = this.navParams.get('full_name'),
            this.email = this.navParams.get('email'),
            this.password = this.navParams.get('password'),
            this.confirm_password = this.navParams.get('confirm_password'),
            this.contact_number = this.navParams.get('contact_number'),
            this.salon_description = this.navParams.get('salon_description'),
            this.latitude = this.navParams.get('latitude'),
            this.longitude = this.navParams.get('longitude');
    }
    SalonCategory.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalonCategory');
    };
    SalonCategory.prototype.updateCheckedOptions = function (chBox, event) {
        var cbIdx = this.cbChecked.indexOf(chBox);
        if (event.target.checked) {
            if (cbIdx < 0) {
                this.cbChecked.push(chBox);
                console.log(chBox);
            }
        }
        else {
            if (cbIdx >= 0) {
                this.cbChecked.splice(cbIdx, 1);
                console.log(cbIdx);
            }
        }
    };
    SalonCategory.prototype.updateOptions = function () {
        var _this = this;
        if (this.cbChecked.length == 0) {
            var alert_1 = this.alertCtrl.create({
                title: 'Oops!',
                subTitle: 'No category Selected',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            // console.log("is"+this.cbChecked)
            // this.viewctrl.dismiss({services:this.cbChecked});
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading_1.present();
            var link = 'http://gagandeepsethi.com/salonDirectory/WebServices/salonRegistration.json';
            var data = JSON.stringify({
                salon_name: this.salon_name,
                address: this.address,
                full_name: this.full_name,
                email: this.email,
                password: this.password,
                confirm_password: this.confirm_password,
                contact_number: this.contact_number,
                salon_description: this.salon_description,
                usertype: 1,
                latitude: this.latitude,
                longitude: this.longitude,
                category: this.cbChecked
            });
            this.http.post(link, data)
                .map(function (response) { return response.json(); })
                .subscribe(function (data) {
                loading_1.dismiss();
                _this.data = data;
                console.log("response" + JSON.stringify(_this.data));
                if (_this.data.status == 1) {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'THANK YOU!',
                        subTitle: 'Registration Successful.Please Check Your Inbox To Verify Your Account ',
                        buttons: ['ok']
                    });
                    alert_2.present();
                    _this.navCtrl.setRoot('Login');
                }
                else if (_this.data.message == 'Entered email address or username is already registered with us.') {
                    var alert_3 = _this.alertCtrl.create({
                        title: 'Alert',
                        subTitle: 'Entered E-mail is already registered',
                        buttons: ['ok']
                    });
                    alert_3.present();
                }
            });
        }
    };
    /////////////////////////////
    SalonCategory.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    SalonCategory = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-category',
            templateUrl: 'salon-category.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController, LoadingController, Http,
            AlertController])
    ], SalonCategory);
    return SalonCategory;
}());
export { SalonCategory };
//# sourceMappingURL=salon-category.js.map