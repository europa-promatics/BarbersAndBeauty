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
import { Observable } from "rxjs/Rx";
import { DataService } from '../../providers/data-service';
var CancelBooking = /** @class */ (function () {
    function CancelBooking(alertCtrl, dataService, loadingCtrl, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.dataService = dataService;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CancelBooking.prototype.ionViewWillEnter = function () {
        this.data = this.navParams.get('data');
    };
    CancelBooking.prototype.cancelbooking = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        var dataa = { booking_id: this.data.booking_id, booking_cancel_status: 1 };
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataService.cancelbooking(dataa); })
            .subscribe(function (data) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Booking status',
                subTitle: 'Cancel Successfully',
                buttons: ['Ok']
            });
            alert.present();
            alert.onDidDismiss(function () {
                _this.navCtrl.pop();
            });
        }, function (err) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Something Went Wrong',
                subTitle: 'Please Try Again',
                buttons: ['Ok']
            });
            alert.present();
        });
    };
    CancelBooking = __decorate([
        IonicPage(),
        Component({
            selector: 'page-cancel-booking',
            templateUrl: 'cancel-booking.html',
        }),
        __metadata("design:paramtypes", [AlertController, DataService, LoadingController, NavController, NavParams])
    ], CancelBooking);
    return CancelBooking;
}());
export { CancelBooking };
//# sourceMappingURL=cancel-booking.js.map