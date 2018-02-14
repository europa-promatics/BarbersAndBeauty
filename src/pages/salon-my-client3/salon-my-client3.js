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
/**
 * Generated class for the SalonMyClient3 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalonMyClient3 = /** @class */ (function () {
    function SalonMyClient3(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.myclientdata = this.navParams.get('data');
        this.services = this.myclientdata.service;
        // alert(JSON.stringify(this.services))
    }
    SalonMyClient3.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalonMyClient3');
    };
    SalonMyClient3.prototype.details = function () {
        this.navCtrl.push('MySalonClientDetailsPage', { client_id_data: this.myclientdata, our_services: this.services });
    };
    SalonMyClient3 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-my-client3',
            templateUrl: 'salon-my-client3.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], SalonMyClient3);
    return SalonMyClient3;
}());
export { SalonMyClient3 };
//# sourceMappingURL=salon-my-client3.js.map