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
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DataService } from "../../providers/data-service";
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from "rxjs/Rx";
/**
 * Generated class for the MyEmployees page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MyEmployees = /** @class */ (function () {
    function MyEmployees(navCtrl, dataservice, navParams, alertCtrl, loadingCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.dataservice = dataservice;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.show = false;
        this.items = [
            { name: 'kary watson', img: 'assets/img/user.jpg', profile: 'Barber' },
            { name: 'Charlie', img: 'assets/img/user.jpg', profile: 'Barber' },
            { name: 'Ramy jackson', img: 'assets/img/user.jpg', profile: 'Barber' },
            { name: 'Shane Watson', img: 'assets/img/user.jpg', profile: 'Barber' },
            { name: 'Hamilton shobby', img: 'assets/img/user.jpg', profile: 'Barber' },
            { name: 'Paul Hariday ', img: 'assets/img/user.jpg', profile: 'Barber' },
            { name: 'Ramy ', img: 'assets/img/user.jpg', profile: 'Barber' },
            { name: 'Mohit', img: 'assets/img/user.jpg', profile: 'Barber' },
        ];
    }
    MyEmployees.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyEmployees');
    };
    MyEmployees.prototype.view = function (data) {
        // let profileModal = this.modalCtrl.create('SpecificEmployee',{profiledata:data});
        //             profileModal.present();
        //          profileModal.onDidDismiss(data => {
        this.navCtrl.push('SpecificEmployee', { profiledata: data });
    };
    MyEmployees.prototype.view2 = function (data) {
        // let profileModal = this.modalCtrl.create('SpecificEmployee',{profiledata:data});
        //             profileModal.present();
        //          profileModal.onDidDismiss(data => {
        this.navCtrl.push('SpecificEmployee2Page', { profiledata: data });
    };
    MyEmployees.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading..' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.view_employee_list(_this.id); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.minedata = data.employeeinfo;
                _this.owner_data = data.salonowner;
                _this.full_name = _this.owner_data.full_name;
                _this.profile_image = _this.owner_data.profile_image;
                console.log("staff" + data);
                if (_this.minedata == undefined) {
                    _this.show = true;
                }
                else {
                    _this.myimage = data.employeeinfo.profile_image;
                    _this.show = false;
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'Timeout',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                loading.dismiss();
                alert.present();
            });
        });
    };
    MyEmployees.prototype.ionViewDidLeave = function () {
        // alert("ohhggg Yeah")
    };
    MyEmployees.prototype.add_staff = function () {
        var _this = this;
        var profileModal = this.modalCtrl.create('SaloonAddEmployee');
        profileModal.present();
        profileModal.onDidDismiss(function (data) {
            _this.ourname = data.myname;
            _this.ouremail = data.myemail;
            _this.ourphone_number = data.my_number;
            _this.ourselected_service = data.my_service;
            var loading = _this.loadingCtrl.create({ content: 'Loading..' });
            Observable.fromPromise(loading.present())
                .flatMap(function (data) { return _this.dataservice.add_employee(_this.ourname, _this.ouremail, _this.ourphone_number, _this.salonid, _this.ourselected_service); })
                .subscribe(function (data) {
                return loading.dismiss().then(function () {
                    _this.leads = data;
                    if (_this.leads.status == 1) {
                        var alert_1 = _this.alertCtrl.create({
                            title: 'Registration Successful',
                            subTitle: 'Check your mail inbox  and  create a new password',
                            buttons: ['Dismiss']
                        });
                        alert_1.present();
                    }
                    else {
                        if (_this.leads.status == 0) {
                            var alert_2 = _this.alertCtrl.create({
                                title: 'Oops',
                                subTitle: 'Entered E-mail Already Exists',
                                buttons: ['Cancel']
                            });
                            alert_2.present();
                        }
                    }
                    // this.name="";
                    // this.email="";
                    // this.pasword="";
                    // this.phone_number="";
                    //  this.pikabu=""
                });
            }, function (error) {
                return loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        title: 'Timeout',
                        subTitle: 'Please Try Again',
                        buttons: ['Ok']
                    });
                    loading.dismiss();
                    alert.present();
                });
            });
        });
    };
    MyEmployees = __decorate([
        IonicPage(),
        Component({
            selector: 'page-my-employees',
            templateUrl: 'my-employees.html',
        }),
        __metadata("design:paramtypes", [NavController, DataService,
            NavParams, AlertController,
            LoadingController, ModalController])
    ], MyEmployees);
    return MyEmployees;
}());
export { MyEmployees };
//# sourceMappingURL=my-employees.js.map