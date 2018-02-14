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
import { Http } from '@angular/http';
import 'rxjs/Rx';
/**
 * Generated class for the CustomerEmployeePreviousWorkImages page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CustomerEmployeePreviousWorkImages = /** @class */ (function () {
    function CustomerEmployeePreviousWorkImages(navCtrl, loadingCtrl, navParams, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.employeeid = this.navParams.get('employeeid');
        this.http = http;
        this.abc = false;
    }
    CustomerEmployeePreviousWorkImages.prototype.ngOnInit = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        var link = 'http://gagandeepsethi.com/salonDirectory/WebServices/employeePreviousWorkImageShow.json';
        var data = JSON.stringify({
            employee_id: this.employeeid
        });
        this.http.post(link, data)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            loader.dismiss();
            _this.viewimage = data;
            console.log(JSON.stringify(_this.viewimage));
            _this.uploadpics = _this.viewimage.image;
            if (_this.viewimage.status == 0) {
                _this.abc = true;
            }
            (function (error) {
                var alert = _this.alertCtrl.create({
                    title: 'SERVER ERROR',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                alert.present();
            });
        });
    };
    CustomerEmployeePreviousWorkImages = __decorate([
        IonicPage(),
        Component({
            selector: 'page-customer-employee-previous-work-images',
            templateUrl: 'customer-employee-previous-work-images.html',
        }),
        __metadata("design:paramtypes", [NavController, LoadingController,
            NavParams, Http, AlertController])
    ], CustomerEmployeePreviousWorkImages);
    return CustomerEmployeePreviousWorkImages;
}());
export { CustomerEmployeePreviousWorkImages };
//# sourceMappingURL=customer-employee-previous-work-images.js.map