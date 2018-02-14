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
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { Observable } from "rxjs/Rx";
/**
 * Generated class for the EmployeeClient page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EmployeeClient = /** @class */ (function () {
    function EmployeeClient(navCtrl, dataservice, alertCtrl, loadingCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.dataservice = dataservice;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.noclients = 1;
    }
    EmployeeClient.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.EmployeeClientListing(); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.lists = data;
                _this.clientinfo = _this.lists.customerappointment;
                console.log("client" + JSON.stringify(_this.clientinfo));
                if (_this.lists.status == 0) {
                    _this.noclients = 0;
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'ALERT!',
                    subTitle: 'Something Went Wrong',
                    buttons: ['ok']
                });
                alert.present();
            });
        });
    };
    EmployeeClient.prototype.View = function (name, pic, starttime, endtime, date, service, address, amount, email, note) {
        this.navCtrl.push('EmployeeCustomerInfo', { name: name, pic: pic,
            startime: starttime, endtime: endtime, date: date, services: service,
            address: address, total: amount, email: email, note: note });
    };
    EmployeeClient = __decorate([
        IonicPage(),
        Component({
            selector: 'page-employee-client',
            templateUrl: 'employee-client.html',
        }),
        __metadata("design:paramtypes", [NavController,
            DataService,
            AlertController,
            LoadingController,
            NavParams])
    ], EmployeeClient);
    return EmployeeClient;
}());
export { EmployeeClient };
//# sourceMappingURL=employee-client.js.map