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
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
/**
 * Generated class for the AddService page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddService = /** @class */ (function () {
    function AddService(navCtrl, formBuilder, navParams, viewCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        // let emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        this.employee_data = this.navParams.get('data');
        this.my_employee_data = this.employee_data.employeeinfo;
        this.owner_name = this.employee_data.salonowner.full_name;
        var name = /^([a-zA-Z ]){1,30}$/;
        var namevalidation = /^[^-\s][a-zA-Z_\s-]+$/;
        var numberregex = /^\d+$/;
        var descrptionregex = /^[^-\s][a-zA-Z0-9_\s-]+$/;
        this.addservice = formBuilder.group({
            name: ['', Validators.compose([Validators.pattern(namevalidation), Validators.required])],
            cost: ['', Validators.compose([Validators.pattern("[0-9]*"), Validators.required])],
            time: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.pattern(descrptionregex), Validators.required])]
        });
    }
    AddService.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddService');
    };
    AddService.prototype.save = function () {
        this.viewCtrl.dismiss({ a: this.addservice.controls['name'].value, b: this.addservice.controls['cost'].value, c: this.addservice.controls['time'].value, d: this.addservice.controls['description'].value, e: this.selected_service });
    };
    AddService.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    AddService = __decorate([
        IonicPage(),
        Component({
            selector: 'page-add-service',
            templateUrl: 'add-service.html',
        }),
        __metadata("design:paramtypes", [NavController, FormBuilder, NavParams, ViewController, AlertController])
    ], AddService);
    return AddService;
}());
export { AddService };
//   if(this.name=='undefined'||this.cost=='undefined'||this.time=='undefined'||this.description=='undefined')
// {
//    // let alert = this.alertCtrl.create({
//    //       title: 'Please Fill All Fields',
//    //      buttons: ['Dismiss']
//    //      });
//    //      alert.present();
// }
//# sourceMappingURL=add-service.js.map