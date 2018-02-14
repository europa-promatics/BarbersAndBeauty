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
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ViewController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { Observable } from "rxjs/Rx";
var CustomerAddReviewModel = /** @class */ (function () {
    function CustomerAddReviewModel(navCtrl, navParams, alertCtrl, viewCtrl, loadingCtrl, dataservice) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.dataservice = dataservice;
        this.salonname = this.navParams.get('salonname');
        this.salonid = this.navParams.get('salonid');
    }
    CustomerAddReviewModel.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomerAddReviewModel');
    };
    CustomerAddReviewModel.prototype.onModelChange = function (event) {
        // alert(event)
    };
    CustomerAddReviewModel.prototype.tap = function (id) {
        if (id == 1) {
            this.starid = 1;
            var x1 = document.getElementById('star1');
            x1.style.color = "orange";
            var x2 = document.getElementById('star2');
            x2.style.color = "grey";
            var x3 = document.getElementById('star3');
            x3.style.color = "grey";
            var x4 = document.getElementById('star4');
            x4.style.color = "grey";
            var x5 = document.getElementById('star5');
            x5.style.color = "grey";
        }
        else if (id == 2) {
            this.starid = 2;
            var x1 = document.getElementById('star1');
            x1.style.color = "orange";
            var x2 = document.getElementById('star2');
            x2.style.color = "orange";
            var x3 = document.getElementById('star3');
            x3.style.color = "grey";
            var x4 = document.getElementById('star4');
            x4.style.color = "grey";
            var x5 = document.getElementById('star5');
            x5.style.color = "grey";
        }
        else if (id == 3) {
            this.starid = 3;
            var x1 = document.getElementById('star1');
            x1.style.color = "orange";
            var x2 = document.getElementById('star2');
            x2.style.color = "orange";
            var x3 = document.getElementById('star3');
            x3.style.color = "orange";
            var x4 = document.getElementById('star4');
            x4.style.color = "grey";
            var x5 = document.getElementById('star5');
            x5.style.color = "grey";
        }
        else if (id == 4) {
            this.starid = 4;
            var x1 = document.getElementById('star1');
            x1.style.color = "orange";
            var x2 = document.getElementById('star2');
            x2.style.color = "orange";
            var x3 = document.getElementById('star3');
            x3.style.color = "orange";
            var x4 = document.getElementById('star4');
            x4.style.color = "orange";
            var x5 = document.getElementById('star5');
            x5.style.color = "grey";
        }
        else if (id == 5) {
            this.starid = 5;
            var x1 = document.getElementById('star1');
            x1.style.color = "orange";
            var x2 = document.getElementById('star2');
            x2.style.color = "orange";
            var x3 = document.getElementById('star3');
            x3.style.color = "orange";
            var x4 = document.getElementById('star4');
            x4.style.color = "orange";
            var x5 = document.getElementById('star5');
            x5.style.color = "orange";
        }
    };
    CustomerAddReviewModel.prototype.Review = function () {
        var _this = this;
        // alert(this.starid)
        if (localStorage['auth'] != 'true') {
            var alert_1 = this.alertCtrl.create({
                title: 'Alert!',
                subTitle: 'You Must Login to Add Review',
                buttons: ['ok']
            });
            alert_1.present();
        }
        else {
            if (this.starid == undefined) {
                var alert_2 = this.alertCtrl.create({
                    title: 'Alert!',
                    subTitle: 'Please Rate',
                    buttons: ['ok']
                });
                alert_2.present();
            }
            else if (this.message == undefined || this.message == 'undefined') {
                var alert_3 = this.alertCtrl.create({
                    title: 'Alert!',
                    subTitle: 'Please write Review',
                    buttons: ['ok']
                });
                alert_3.present();
            }
            else {
                var loading_1 = this.loadingCtrl.create({ content: 'Please Wait...' });
                Observable.fromPromise(loading_1.present())
                    .flatMap(function (data) { return _this.dataservice.Customeraddreview(_this.salonid, _this.message, _this.starid); })
                    .subscribe(function (data) {
                    return loading_1.dismiss().then(function () {
                        _this.reviewres = data;
                        if (_this.reviewres.status == 1) {
                            var alert_4 = _this.alertCtrl.create({
                                title: 'Thank You',
                                subTitle: 'Your Review added Successfully',
                                buttons: ['ok']
                            });
                            alert_4.present();
                            _this.viewCtrl.dismiss();
                            _this.message = '';
                            _this.rate = '';
                        }
                    });
                }, function (error) {
                    return loading_1.dismiss().then(function () {
                        var alert = _this.alertCtrl.create({
                            title: 'Something Went Wrong',
                            subTitle: 'Please Try Again',
                            buttons: ['Ok']
                        });
                        alert.present();
                    });
                });
            }
        }
    };
    CustomerAddReviewModel.prototype.dismiss = function () {
        // let data = { 'foo': 'bar' };
        this.viewCtrl.dismiss();
    };
    CustomerAddReviewModel = __decorate([
        IonicPage(),
        Component({
            selector: 'page-customer-add-review-model',
            templateUrl: 'customer-add-review-model.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            AlertController, ViewController,
            LoadingController, DataService])
    ], CustomerAddReviewModel);
    return CustomerAddReviewModel;
}());
export { CustomerAddReviewModel };
//# sourceMappingURL=customer-add-review-model.js.map