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
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { Observable } from "rxjs/Rx";
import { DataService } from '../../providers/data-service';
/**
 * Generated class for the SalonEditCategoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalonEditCategoryPage = /** @class */ (function () {
    function SalonEditCategoryPage(navCtrl, navParams, viewctrl, loadingCtrl, dataservice, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewctrl = viewctrl;
        this.loadingCtrl = loadingCtrl;
        this.dataservice = dataservice;
        this.alertCtrl = alertCtrl;
        this.cbArr = [];
        this.cbChecked = [];
        this.category_data = [];
        this.submitted = false;
        this.cbArr = [
            { name: 'BARBER', id: 1 }, { name: 'HAIR STYLIST', id: 2 }, { name: 'WEAVE AND EXTENSIONS SPECIALIST', id: 3 }, { name: 'MAKE UP ARTIST', id: 4 },
            { name: 'NAIL MANICURE AND PEDICURE', id: 5 }, { name: 'TATOO ARTIST', id: 6 }, { name: 'MASSAGE THERAPIST', id: 7 }, { name: 'OTHER SERVICES', id: 8 }
        ];
    }
    SalonEditCategoryPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait ...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.get_salon_category(); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.mydata = data;
                _this.ourdata = _this.mydata.data.category;
                for (var i = 0; i < _this.ourdata.length; i++) {
                    if (_this.ourdata.length > 0) {
                        _this.cbChecked.push(_this.ourdata[i].name);
                        _this.category_data.push(_this.ourdata[i]);
                    }
                }
            });
        });
    };
    SalonEditCategoryPage.prototype.updateCheckedOptions = function (chBox, event) {
        var cbIdx = this.cbChecked.indexOf(chBox.name);
        // alert(chBox.name)
        if (event.target.checked) {
            if (cbIdx < 0) {
                this.category_data.push(chBox);
                this.cbChecked.push(chBox.name);
                console.log(chBox);
            }
        }
        else {
            if (cbIdx >= 0) {
                // alert(cbIdx)
                this.category_data.splice(cbIdx, 1);
                this.cbChecked.splice(cbIdx, 1);
                console.log(cbIdx);
            }
        }
    };
    SalonEditCategoryPage.prototype.updateOptions = function () {
        var _this = this;
        if (this.category_data.length > 0) {
            var loading_1 = this.loadingCtrl.create({ content: 'Please Wait ..' });
            Observable.fromPromise(loading_1.present())
                .flatMap(function (data) { return _this.dataservice.edit_salon_category(_this.category_data); })
                .subscribe(function (data) {
                return loading_1.dismiss().then(function () {
                    _this.mydata = data;
                    if (_this.mydata.status == 1) {
                        var alert_1 = _this.alertCtrl.create({
                            title: ' Categories Updated Successfully',
                            buttons: ['Dismiss']
                        });
                        alert_1.present();
                    }
                });
            });
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: 'Please Select a Category Value',
                buttons: ['Dismiss']
            });
            alert_2.present();
        }
    };
    SalonEditCategoryPage.prototype.cancel = function () {
        this.navCtrl.setRoot('MySalonHome');
    };
    SalonEditCategoryPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-edit-category',
            templateUrl: 'salon-edit-category.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController, LoadingController, DataService, AlertController])
    ], SalonEditCategoryPage);
    return SalonEditCategoryPage;
}());
export { SalonEditCategoryPage };
//# sourceMappingURL=salon-edit-category.js.map