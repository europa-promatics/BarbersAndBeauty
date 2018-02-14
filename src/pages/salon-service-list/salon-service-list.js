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
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { DataService } from "../../providers/data-service";
import { Observable } from "rxjs/Rx";
import { AlertController, ViewController } from 'ionic-angular';
/**
 * Generated class for the SalonServiceList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalonServiceList = /** @class */ (function () {
    function SalonServiceList(navCtrl, navParams, modalCtrl, loadingCtrl, dataservice, alertCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.dataservice = dataservice;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
    }
    SalonServiceList.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalonServiceList');
    };
    SalonServiceList.prototype.myservicedescrptn = function (m) {
        this.navCtrl.push('SalonServiceDescription', { data: m });
    };
    SalonServiceList.prototype.add_service = function () {
        var _this = this;
        var profileModal = this.modalCtrl.create('AddService', { data: this.minedata });
        profileModal.present();
        profileModal.onDidDismiss(function (data) {
            _this.service_name = data.a;
            _this.cost = data.b;
            _this.time = data.c;
            _this.description = data.d;
            _this.emp_name = data.e;
            if (_this.cost > 0) {
                var loading_1 = _this.loadingCtrl.create({ content: 'Loading...' });
                Observable.fromPromise(loading_1.present())
                    .flatMap(function (data) { return _this.dataservice.add_service(_this.service_name, _this.cost, _this.time, _this.description, _this.id, _this.emp_name); })
                    .subscribe(function (data) {
                    return loading_1.dismiss().then(function () {
                        _this.leads = data;
                        if (_this.leads.message == "data saved successfully") {
                            _this.ionViewWillEnter();
                        }
                        else if (_this.leads.status == 0) {
                            var alert_1 = _this.alertCtrl.create({
                                title: 'Please Fill All Fields',
                                buttons: ['Dismiss']
                            });
                            alert_1.present();
                        }
                    });
                }, function (error) {
                    return loading_1.dismiss().then(function () {
                        var alert = _this.alertCtrl.create({
                            title: 'Timeout',
                            subTitle: 'Please Try Again',
                            buttons: ['Ok']
                        });
                        loading_1.dismiss();
                        alert.present();
                    });
                });
            }
            else {
                var alert_2 = _this.alertCtrl.create({
                    title: 'Cost Cannot Be 0 ',
                    buttons: ['Ok']
                });
                alert_2.present();
            }
        });
    };
    SalonServiceList.prototype.ionViewWillEnter = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading' });
        Observable.of(loading).flatMap(function (loading) { return loading.present(); })
            .flatMap(function (data) { return Observable.forkJoin(_this.dataservice.view_employee_list(_this.id), _this.dataservice.getmyservicedata(_this.salon_id)); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.minedata = data[0];
                _this.mydata = data[1];
                _this.printdata = _this.mydata.data;
            });
        }, function (error) {
            var alert = _this.alertCtrl.create({
                title: 'Timeout',
                buttons: ['Ok']
            });
            loading.dismiss();
            alert.present();
        });
        // let loading = this.loadingCtrl.create({content: 'Loading...'});
        //         Observable.fromPromise(loading.present())
        //             .flatMap(data => this.dataservice.getmyservicedata(this.salon_id))
        // .subscribe(data =>
        //                     loading.dismiss().then(() =>{ 
        //                    this.show=data.message               
        //                               this.mydata = data
        //                           	this.printdata = this.mydata.data
        //                     }),
        //                 error =>
        //                     loading.dismiss().then(() => {
        //                       let alert=this.alertCtrl.create({
        //         title:'Timeout',
        //         subTitle:'Please Try Again',
        //         buttons:['Ok']
        //       })
        //       loading.dismiss();
        //       alert.present()
        //                     })
        //      );
    };
    SalonServiceList.prototype.delete = function (m) {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading..' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.delete_service(m); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.leads = data;
                if (_this.leads.message == "Service deleted successfully") {
                    var alert_3 = _this.alertCtrl.create({
                        title: 'Service Deleted  Successfully',
                        buttons: ['Dismiss']
                    });
                    alert_3.present();
                    _this.navCtrl.pop();
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
    SalonServiceList = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-service-list',
            templateUrl: 'salon-service-list.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams, ModalController,
            LoadingController, DataService, AlertController, ViewController])
    ], SalonServiceList);
    return SalonServiceList;
}());
export { SalonServiceList };
//# sourceMappingURL=salon-service-list.js.map