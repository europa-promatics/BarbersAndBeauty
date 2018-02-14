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
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { DataService } from "../../providers/data-service";
import { Observable } from "rxjs/Rx";
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Validators, FormBuilder } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
var SalonBuisnessInfo = /** @class */ (function () {
    function SalonBuisnessInfo(navCtrl, dataservice, navParams, alertCtrl, locationAccuracy, geolocation, loadingCtrl, modalCtrl, formBuilder) {
        this.navCtrl = navCtrl;
        this.dataservice = dataservice;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.locationAccuracy = locationAccuracy;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.formBuilder = formBuilder;
        this.v = false;
        this.schedule_array = [];
        this.address = {
            place: '',
            set: false,
        };
        this.markers = [];
        var name = /^([a-zA-Z ]){2,30}$/;
        var emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
        var namevalidation = /^[^-\s][a-zA-Z0-9_\s-]+$/;
        this.form3 = formBuilder.group({
            mysalon_name: ['', Validators.compose([Validators.pattern(namevalidation), Validators.required])],
            fulladdress: ['', Validators.compose([Validators.required])],
            mycontact_number: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(10), Validators.pattern("[0-9]*"), Validators.required])],
            schedule_value: ['', Validators.compose([Validators.required])],
            mydescription: ['', Validators.compose([Validators.pattern(namevalidation), Validators.required])],
        });
        this.savebtn = 'false';
        this.id = localStorage['salonid'];
    }
    SalonBuisnessInfo.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalonBuisnessInfo');
    };
    SalonBuisnessInfo.prototype.editprofile = function () {
        this.v = !this.v;
        this.savebtn = 'true';
    };
    SalonBuisnessInfo.prototype.ngOnInit = function () {
        var _this = this;
        this.request();
        this.currentlocation();
        var loading = this.loadingCtrl.create({ content: 'Loading...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.viewbusinessinfo(_this.id); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.minedata = data;
                _this.mysalon_name = _this.minedata.saloninfo.salon_name;
                _this.fulladdress = _this.minedata.saloninfo.address;
                _this.district = _this.minedata.saloninfo.city;
                _this.postalcode = _this.minedata.saloninfo.post_code;
                _this.mydescription = _this.minedata.saloninfo.salon_description;
                _this.mycontact_number = _this.minedata.saloninfo.contact_number;
                _this.website = _this.minedata.saloninfo.website;
                _this.schedule_value = _this.minedata.saloninfo.schedule;
                _this.parking_value = _this.minedata.saloninfo.parking;
                _this.fb = _this.minedata.saloninfo.facebooklink;
                _this.insta = _this.minedata.saloninfo.instagramlink;
                _this.wheelchair = _this.minedata.saloninfo.wheelchair;
                _this.wifi = _this.minedata.saloninfo.wifi;
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'Timeout',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                loading.dismiss();
                alert.present();
            });
        });
    };
    SalonBuisnessInfo.prototype.save = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading..' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.postbusinessinfo(_this.userlat, _this.userlng, _this.mysalon_name, _this.fulladdress, _this.district, _this.postalcode, _this.mydescription, _this.mycontact_number, _this.website, _this.parking_value, _this.schedule_value, _this.id, _this.fb, _this.insta, _this.wheelchair, _this.wifi); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.leads = data;
                if (_this.leads.message == "your profile updated successfully") {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'BUSINESS INFORMATION UPDATED SUCCESSFULLY',
                        buttons: ['Dismiss']
                    });
                    alert_1.present();
                }
                _this.v = false;
                _this.navCtrl.pop();
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'Timeout',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                loading.dismiss();
                alert.present();
            });
        });
    };
    SalonBuisnessInfo.prototype.currentlocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            console.log("helo lat" + resp.coords.latitude);
            console.log("hello lng" + resp.coords.longitude);
            _this.userlat = resp.coords.latitude;
            _this.userlng = resp.coords.longitude;
        });
    };
    SalonBuisnessInfo.prototype.request = function () {
        var _this = this;
        this.locationAccuracy.canRequest().then(function (canRequest) {
            if (canRequest) {
                _this.locationAccuracy.request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function () {
                    console.log('Request successful.');
                }, function (error) {
                    console.log('Error requesting location permissions', error);
                    var alert = _this.alertCtrl.create({
                        title: 'Error!',
                        subTitle: 'Requesting location permissions',
                        buttons: ['ok']
                    });
                    alert.present();
                });
            }
        });
    };
    SalonBuisnessInfo.prototype.schedule_page = function () {
        var _this = this;
        var modal = this.modalCtrl.create('SalonSchedule');
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.ourdata = data;
            _this.mon = (_this.ourdata.mon);
            _this.tue = _this.ourdata.tue;
            console.log('hiii' + JSON.stringify(_this.tue));
            _this.wed = _this.ourdata.wed;
            _this.thurs = _this.ourdata.thu;
            _this.fri = _this.ourdata.fri;
            _this.sat = _this.ourdata.sat;
            _this.sun = _this.ourdata.sun;
            if (!_this.mon || _this.mon == "") {
                _this.mon = "";
            }
            else {
                _this.splitted1 = _this.mon.split("-");
                _this.mon = 'Monday' + ' ' + _this.splitted1[0] + '-' + _this.splitted1[1];
            }
            if (!_this.tue || _this.tue == "") {
                _this.tue = "";
            }
            else {
                _this.splitted2 = _this.tue.split("-");
                _this.tue = 'Tuesday' + ' ' + _this.splitted2[0] + '-' + _this.splitted2[1];
            }
            if (!_this.wed || _this.wed == "") {
                _this.wed = "";
            }
            else {
                _this.splitted3 = _this.wed.split("-");
                _this.wed = 'Wednesday' + ' ' + _this.splitted3[0] + '-' + _this.splitted3[1];
            }
            if (!_this.thurs || _this.thurs == "") {
                _this.thurs = "";
            }
            else {
                _this.splitted4 = _this.thurs.split("-");
                _this.thurs = 'Thursday' + ' ' + _this.splitted4[0] + '-' + _this.splitted4[1];
            }
            if (!_this.fri || _this.fri == "") {
                _this.fri = "";
            }
            else {
                _this.splitted5 = _this.fri.split("-");
                _this.fri = "Friday" + ' ' + _this.splitted5[0] + '-' + _this.splitted5[1];
            }
            if (!_this.sat || _this.sat == "") {
                _this.sat = "";
            }
            else {
                _this.splitted6 = _this.sat.split("-");
                _this.sat = "Saturday" + ' ' + _this.splitted6[0] + '-' + _this.splitted6[1];
            }
            if (!_this.sun || _this.sun == "") {
                _this.sun = "";
            }
            else {
                _this.splitted7 = _this.sun.split("-");
                _this.sun = "Sunday" + ' ' + _this.splitted7[0] + '-' + _this.splitted7[1];
            }
            _this.schedule_value = _this.mon + _this.tue +
                _this.wed + _this.thurs + _this.fri + _this.sat + _this.sun;
            _this.schedule_array.push(_this.ourdata.mon);
            _this.schedule_array.push(_this.ourdata.tue);
            _this.schedule_array.push(_this.ourdata.wed);
            _this.schedule_array.push(_this.ourdata.thu);
            _this.schedule_array.push(_this.ourdata.fri);
            _this.schedule_array.push(_this.ourdata.sat);
            _this.schedule_array.push(_this.ourdata.sun);
            console.log(JSON.stringify(_this.schedule_array));
        });
    };
    SalonBuisnessInfo.prototype.pickAddress = function () {
        var _this = this;
        var profileModal = this.modalCtrl.create('Clientlocation', {
            bidlat1: this.userlat,
            bidlng1: this.userlng
        });
        profileModal.onDidDismiss(function (data) {
            console.log("data" + JSON.stringify(data));
            _this.fulladdress = data.address;
            _this.userlat = data.lat;
            _this.userlng = data.lng;
        });
        profileModal.present();
    };
    SalonBuisnessInfo = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-buisness-info',
            templateUrl: 'salon-buisness-info.html',
        }),
        __metadata("design:paramtypes", [NavController,
            DataService,
            NavParams,
            AlertController,
            LocationAccuracy,
            Geolocation,
            LoadingController,
            ModalController, FormBuilder])
    ], SalonBuisnessInfo);
    return SalonBuisnessInfo;
}());
export { SalonBuisnessInfo };
//# sourceMappingURL=salon-buisness-info.js.map