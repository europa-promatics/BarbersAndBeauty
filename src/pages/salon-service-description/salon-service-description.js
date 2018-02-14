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
import { FormBuilder, Validators } from '@angular/forms';
var SalonServiceDescription = /** @class */ (function () {
    function SalonServiceDescription(dataservice, navCtrl, navParams, formBuilder, alertCtrl, loadingCtrl) {
        this.dataservice = dataservice;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.v = false;
        this.valid = true;
        this.mydata = this.navParams.get('data');
        this.title = this.mydata.title;
        this.cost = this.mydata.cost;
        this.time = this.mydata.time;
        this.description = this.mydata.description;
        this.employee_name = this.mydata.employee_name;
        var numberregex = /^\d+$/;
        var name = /^([a-zA-Z ]){2,30}$/;
        var namevalidation = /^[^-\s][a-zA-Z_\s-]+$/;
        var descrptionregex = /^[^-\s][a-zA-Z0-9_\s-]+$/;
        this.addservice = formBuilder.group({
            title: ['', Validators.compose([Validators.pattern(namevalidation), Validators.required])],
            cost: ['', Validators.compose([Validators.pattern(numberregex), Validators.required])],
            time: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.pattern(descrptionregex), Validators.required])]
        });
    }
    SalonServiceDescription.prototype.check = function () {
        if (this.time.split(':')[0] == '01') {
            if (parseInt(this.time.split(':')[1]) < 15) {
                this.valid = false;
                // let alert = this.alertCtrl.create({
                //   title: 'Please select minimum 15 Minutes',
                //   buttons: ['Dismiss']
                // });
                // alert.present();
            }
            else {
                this.valid = true;
            }
        }
        else {
            this.valid = true;
        }
    };
    SalonServiceDescription.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalonServiceDescription');
    };
    SalonServiceDescription.prototype.editprofile = function () {
        this.v = !this.v;
    };
    SalonServiceDescription.prototype.submit = function () {
        var _this = this;
        if (this.addservice.controls['cost'].value == 0) {
            var alert_1 = this.alertCtrl.create({
                title: 'Service Cost Cannot be Zero',
                buttons: ['Dismiss']
            });
            alert_1.present();
        }
        else if (this.valid == false) {
            var alert_2 = this.alertCtrl.create({
                title: 'Duration Cannot be less then 15 Minutes',
                buttons: ['Dismiss']
            });
            alert_2.present();
        }
        else {
            var loading_1 = this.loadingCtrl.create({ content: 'Loading..' });
            Observable.fromPromise(loading_1.present())
                .flatMap(function (data) { return _this.dataservice.edit_service(_this.addservice.controls['title'].value, _this.addservice.controls['cost'].value, _this.addservice.controls['time'].value, _this.addservice.controls['description'].value, _this.mydata.id); })
                .subscribe(function (data) { return loading_1.dismiss().then(function () {
                _this.leads = data;
                if (_this.leads.message == "your data updated successfully") {
                    var alert_3 = _this.alertCtrl.create({
                        title: 'Service Description Updated Successfully',
                        buttons: ['Dismiss']
                    });
                    alert_3.present();
                    _this.navCtrl.pop();
                }
            }); }, function (error) { return loading_1.dismiss().then(function () { }); });
        }
    };
    SalonServiceDescription = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-service-description',
            templateUrl: 'salon-service-description.html',
        }),
        __metadata("design:paramtypes", [DataService, NavController,
            NavParams, FormBuilder,
            AlertController,
            LoadingController])
    ], SalonServiceDescription);
    return SalonServiceDescription;
}());
export { SalonServiceDescription };
//# sourceMappingURL=salon-service-description.js.map