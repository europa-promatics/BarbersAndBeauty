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
import { DataService } from "../../providers/data-service";
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from "rxjs/Rx";
/**
 * Generated class for the SalonImageGallery page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalonImageGallery = /** @class */ (function () {
    function SalonImageGallery(navCtrl, dataservice, navParams, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.dataservice = dataservice;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.show = false;
    }
    SalonImageGallery.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalonImageGallery');
    };
    SalonImageGallery.prototype.ngOnInit = function () {
        // http://europa.promaticstechnologies.com/salonDirectory/img/salonimage
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading' });
        Observable.of(loading).flatMap(function (loading) { return loading.present(); })
            .flatMap(function (data) { return Observable.forkJoin(_this.dataservice.viewprofileinfo(_this.user_id), _this.dataservice.viewgalleryimage(_this.user_id)); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.minedata = data[0];
                _this.image = _this.minedata.saloninfo.salon_image;
                _this.myimage = data[1].galleryimage;
                _this.id = data[1].image_id;
            });
        }, function (error) {
            var alert = _this.alertCtrl.create({
                title: 'Timeout',
                buttons: ['Ok']
            });
            loading.dismiss();
            alert.present();
        });
    };
    SalonImageGallery.prototype.showConfirm = function (myimage_name) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Delete Image?',
            message: 'Are You Sure To Delete This Image?',
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
                        _this.delete_image(myimage_name);
                    }
                }
            ]
        });
        confirm.present();
    };
    SalonImageGallery.prototype.delete_image = function (image_name) {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.delete_gallery_image(image_name, _this.id); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.mydata = data;
                _this.mystatus = _this.mydata.status;
                if (_this.mystatus == 1) {
                    var alert_1 = _this.alertCtrl.create({
                        title: ' Deleted Successfully',
                        buttons: ['Dismiss']
                    });
                    alert_1.present();
                }
                _this.ngOnInit();
            });
        });
    };
    SalonImageGallery.prototype.show_hide_icon = function () {
        this.show = !this.show;
    };
    SalonImageGallery = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-image-gallery',
            templateUrl: 'salon-image-gallery.html',
        }),
        __metadata("design:paramtypes", [NavController, DataService,
            NavParams, AlertController,
            LoadingController])
    ], SalonImageGallery);
    return SalonImageGallery;
}());
export { SalonImageGallery };
//# sourceMappingURL=salon-image-gallery.js.map