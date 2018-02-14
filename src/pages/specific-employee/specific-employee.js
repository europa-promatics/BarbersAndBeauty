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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from "rxjs/Rx";
import { DataService } from "../../providers/data-service";
/**
/**
 * Generated class for the SpecificEmployee page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SpecificEmployee = /** @class */ (function () {
    function SpecificEmployee(navCtrl, dataservice, navParams, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.dataservice = dataservice;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.mydata = this.navParams.get('profiledata');
        this.name = this.mydata.full_name;
        this.employee_id = this.mydata.employee_id;
        this.email = this.mydata.email;
        this.address = this.mydata.address;
        this.contact_number = this.mydata.contact_number;
        this.category = this.mydata.category;
        console.log("yeah" + JSON.stringify(this.category));
        this.myimage = this.mydata.profile_image;
        this.position = this.mydata.position;
        // alert(this.position)
        console.log(JSON.stringify(this.mydata));
    }
    SpecificEmployee.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SpecificEmployee');
    };
    SpecificEmployee.prototype.showConfirm = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Delete Staff?',
            message: 'Are You Sure To Delete This Staff Member?',
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
                        _this.delete_staff();
                    }
                }
            ]
        });
        confirm.present();
    };
    SpecificEmployee.prototype.delete_staff = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading..' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.delete_staff(_this.employee_id); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.status = data.status;
                if (_this.status == 1) {
                    _this.navCtrl.setRoot('MyEmployees');
                    var alert_1 = _this.alertCtrl.create({
                        title: ' Deleted Successfully',
                        buttons: ['Dismiss']
                    });
                    alert_1.present();
                }
            });
        });
    };
    SpecificEmployee = __decorate([
        IonicPage(),
        Component({
            selector: 'page-specific-employee',
            templateUrl: 'specific-employee.html',
        }),
        __metadata("design:paramtypes", [NavController, DataService,
            NavParams, AlertController,
            LoadingController])
    ], SpecificEmployee);
    return SpecificEmployee;
}());
export { SpecificEmployee };
//# sourceMappingURL=specific-employee.js.map