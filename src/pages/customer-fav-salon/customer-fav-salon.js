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
var CustomerFavSalon = /** @class */ (function () {
    function CustomerFavSalon(navCtrl, navParams, loadingCtrl, alertCtrl, dataservice) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.dataservice = dataservice;
    }
    CustomerFavSalon.prototype.getItems = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.favlistdata = this.favlistdata.filter(function (p) {
                return (p.salon_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            this.favlistdata = this.updatedsalonlist;
        }
    };
    CustomerFavSalon.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.FavList(); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.favlist = data;
                _this.favlistdata = _this.favlist.favouritesalonlist;
                _this.updatedsalonlist = _this.favlist.favouritesalonlist;
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'SERVER ERROR',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                alert.present();
            });
        });
    };
    CustomerFavSalon.prototype.detail = function (id, salonimage) {
        //alert("hello salonid"+id)
        this.navCtrl.push('Customersalondetail', { salondetail: id, salonimg: salonimage });
    };
    CustomerFavSalon = __decorate([
        IonicPage(),
        Component({
            selector: 'page-customer-fav-salon',
            templateUrl: 'customer-fav-salon.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            LoadingController, AlertController,
            DataService])
    ], CustomerFavSalon);
    return CustomerFavSalon;
}());
export { CustomerFavSalon };
//# sourceMappingURL=customer-fav-salon.js.map