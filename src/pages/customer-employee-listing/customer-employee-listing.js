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
/**
 * Generated class for the CustomerEmployeeListing page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CustomerEmployeeListing = /** @class */ (function () {
    function CustomerEmployeeListing(navCtrl, alertCtrl, navParams, dataservice, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.dataservice = dataservice;
        this.loadingCtrl = loadingCtrl;
        this.salonid = this.navParams.get('salonid');
    }
    CustomerEmployeeListing.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.EmployeeListing(_this.salonid); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.lists = data;
                _this.itemss = _this.lists.employeeinfo;
                _this.salonowner = _this.lists.salonowner.full_name;
                _this.salonempid = _this.lists.salonowner.employee_id;
                _this.salonowneremail = _this.lists.salonowner.email;
                _this.salonaddress = _this.lists.salonowner.email;
                _this.saloncontact = _this.lists.salonowner.contact_number;
                _this.ownerpic = _this.lists.salonowner.profile_image;
                _this.saloncategory = _this.lists.salonowner.category;
                _this.position = _this.lists.salonowner.position;
                _this.salonstatus = _this.lists.salonowner.salon_online_status;
                console.log("position" + _this.position);
                for (var _i = 0, _a = _this.lists.employeeinfo; _i < _a.length; _i++) {
                    var data_1 = _a[_i];
                    console.log("image check" + data_1.profile_image);
                    if (data_1.profile_image == null) {
                        console.log("images null hai");
                        _this.imagedata = 0;
                    }
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'SERVER ERROR',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                loading.dismiss();
                alert.present();
            });
        });
    };
    CustomerEmployeeListing.prototype.view = function (employeeid, name, number, category, image, email, status) {
        if (localStorage['auth'] == 'false') {
            var alert_1 = this.alertCtrl.create({
                title: 'ALERT!',
                subTitle: 'You must Login to Continue',
                buttons: ['ok']
            });
            alert_1.present();
            this.navCtrl.setRoot('Login');
        }
        else {
            // alert(email)
            this.ownerbook = false;
            this.navCtrl.push('CustomerEmployeeViewProfile', { employee_id: employeeid,
                employeename: name, employeenumber: number, employeecategory: category,
                employeeimage: image, email: email, ownerbook: this.ownerbook, status: status });
        }
    };
    CustomerEmployeeListing.prototype.owner = function () {
        if (localStorage['auth'] == 'false') {
            var alert_2 = this.alertCtrl.create({
                title: 'ALERT!',
                subTitle: 'You must Login to Continue',
                buttons: ['ok']
            });
            alert_2.present();
            this.navCtrl.setRoot('Login');
        }
        else {
            // alert(email)
            this.ownerbook = true;
            this.navCtrl.push('CustomerEmployeeViewProfile', { salonowner_id: this.salonempid,
                salonownername: this.salonowner, salonownernumber: this.saloncontact, salonownercategory: this.saloncategory,
                salonownerimage: this.ownerpic, salonowneremail: this.salonowneremail, ownerbook: this.ownerbook, position: this.position, Salonstatus: this.salonstatus });
        }
    };
    CustomerEmployeeListing = __decorate([
        IonicPage(),
        Component({
            selector: 'page-customer-employee-listing',
            templateUrl: 'customer-employee-listing.html',
        }),
        __metadata("design:paramtypes", [NavController, AlertController,
            NavParams, DataService,
            LoadingController])
    ], CustomerEmployeeListing);
    return CustomerEmployeeListing;
}());
export { CustomerEmployeeListing };
//# sourceMappingURL=customer-employee-listing.js.map