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
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ModalController, AlertController } from 'ionic-angular';
/**
 * Generated class for the SalonPaypalSettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalonPaypalSettingsPage = /** @class */ (function () {
    function SalonPaypalSettingsPage(navCtrl, viewCtrl, navParams, modalCtrl, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    SalonPaypalSettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalonPaypalSettingsPage');
    };
    SalonPaypalSettingsPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    SalonPaypalSettingsPage.prototype.save = function (price) {
        this.viewCtrl.dismiss(price);
    };
    SalonPaypalSettingsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-paypal-settings',
            templateUrl: 'salon-paypal-settings.html',
        }),
        __metadata("design:paramtypes", [NavController, ViewController, NavParams, ModalController, AlertController, LoadingController])
    ], SalonPaypalSettingsPage);
    return SalonPaypalSettingsPage;
}());
export { SalonPaypalSettingsPage };
//# sourceMappingURL=salon-paypal-settings.js.map