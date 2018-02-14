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
import { DataService } from '../../providers/data-service';
/**
 * Generated class for the CustomerAddServices page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CustomerAddServices = /** @class */ (function () {
    function CustomerAddServices(navCtrl, navParams, viewCtrl, dataservice, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.dataservice = dataservice;
        this.loadingCtrl = loadingCtrl;
        this.data = this.dataservice.value.services;
        this.bigdata = this.navParams.get('bigdata');
        console.log('data get' + JSON.stringify(this.bigdata));
        console.log("hello model" + JSON.stringify(this.data));
        // this.data=this.dataservice.customerSideSalonServices;
    }
    CustomerAddServices.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomerAddServices');
    };
    CustomerAddServices.prototype.dismiss = function () {
        // let data = { 'foo': 'bar' };
        this.viewCtrl.dismiss();
    };
    CustomerAddServices.prototype.list = function (serviceid, title, cost, time, fulldata) {
        this.viewCtrl.dismiss(fulldata);
    };
    CustomerAddServices = __decorate([
        IonicPage(),
        Component({
            selector: 'page-customer-add-services',
            templateUrl: 'customer-add-services.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams, ViewController,
            DataService, LoadingController])
    ], CustomerAddServices);
    return CustomerAddServices;
}());
export { CustomerAddServices };
//# sourceMappingURL=customer-add-services.js.map