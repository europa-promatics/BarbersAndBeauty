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
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { LoadingController } from 'ionic-angular';
var CustomerEmployeeViewProfile = /** @class */ (function () {
    function CustomerEmployeeViewProfile(navCtrl, navParams, loadingCtrl, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        // alert(localStorage['directory'])
        this.directory = localStorage['directory'];
        this.http = http;
        this.data = {};
        this.employeeid = this.navParams.get('employee_id');
        this.employeename = this.navParams.get('employeename');
        this.employeenumber = this.navParams.get('employeenumber');
        this.employeecategory = this.navParams.get('employeecategory');
        this.employeepic = this.navParams.get('employeeimage');
        this.employeemail = this.navParams.get('email');
        this.employeestatus = this.navParams.get('status');
        this.salonstatus = this.navParams.get('Salonstatus');
        if (this.salonstatus == 1) {
            this.salonduty = 'ON DUTY';
        }
        if (this.salonstatus == 0) {
            this.salonduty = 'OFF DUTY';
        }
        if (this.employeestatus == 1) {
            this.status = 'ON DUTY';
        }
        if (this.employeestatus == 0) {
            this.status = 'OFF DUTY';
        }
        if (this.salonownercategory == null) {
            this.salonownercategory = 'No Category';
        }
        this.salonownercategory = this.navParams.get('salonownercategory');
        this.salonownerid = this.navParams.get('salonowner_id');
        this.salonownernumber = this.navParams.get('salonownernumber');
        this.salonowneremail = this.navParams.get('salonowneremail');
        this.salonownerimage = this.navParams.get('salonownerimage');
        this.salonownerbook = this.navParams.get('ownerbook');
        this.salonposition = this.navParams.get('position');
        this.salonownername = this.navParams.get('salonownername');
    }
    CustomerEmployeeViewProfile.prototype.employeebook = function () {
        if (this.employeestatus == 0) {
            var alert_1 = this.alertCtrl.create({
                title: 'Sorry!',
                subTitle: 'This Employee is OFF DUTY you can not Book',
                buttons: ['Ok']
            });
            alert_1.present();
        }
        else {
            var employeebook = 1;
            this.navCtrl.push('CustomerCheckAvailability', { employeename: this.employeename, pic: this.employeepic, employeeid: this.employeeid, employeebook: employeebook });
        }
    };
    CustomerEmployeeViewProfile.prototype.employeeimg = function () {
        this.navCtrl.push('CustomerEmployeePreviousWorkImages', { employeeid: this.employeeid });
    };
    CustomerEmployeeViewProfile.prototype.ownerbook = function () {
        if (this.salonstatus == 0) {
            var alert_2 = this.alertCtrl.create({
                title: 'Sorry!',
                subTitle: 'This Salon Owner is OFF DUTY you can not Book',
                buttons: ['Ok']
            });
            alert_2.present();
        }
        else {
            var salonbook = 1;
            this.navCtrl.push('CustomerCheckAvailability', { salonownername: this.salonownername, salonownerpic: this.salonownerimage, salonownerid: this.salonownerid, salonbook: salonbook });
        }
    };
    CustomerEmployeeViewProfile = __decorate([
        IonicPage(),
        Component({
            selector: 'page-customer-employee-view-profile',
            templateUrl: 'customer-employee-view-profile.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            LoadingController, Http, AlertController])
    ], CustomerEmployeeViewProfile);
    return CustomerEmployeeViewProfile;
}());
export { CustomerEmployeeViewProfile };
//# sourceMappingURL=customer-employee-view-profile.js.map