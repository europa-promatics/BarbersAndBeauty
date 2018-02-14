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
/**
 * Generated class for the EmployeeAppointments page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EmployeeAppointments = /** @class */ (function () {
    function EmployeeAppointments(navCtrl, navParams, loadingCtrl, alertCtrl, dataservice) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.dataservice = dataservice;
        this.bookings = "upcoming";
        this.past = 'false';
        this.up = 'false';
    }
    EmployeeAppointments.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EmployeeAppointments');
    };
    EmployeeAppointments.prototype.cancelbooking = function (d) {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        var dataa = { booking_id: d.booking_id, booking_cancel_status: 2 };
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.cancelbooking(dataa); })
            .subscribe(function (data) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Booking status',
                subTitle: 'Cancel Successfully',
                buttons: ['Ok']
            });
            alert.present();
            alert.onDidDismiss(function () {
                _this.ngOnInit();
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
    EmployeeAppointments.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.EmployeebookingList(); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.bookingdata = data;
                _this.upcomingdata = _this.bookingdata.upcominginfo;
                _this.pastdata = _this.bookingdata.pastinfo;
                _this.currentdata = _this.bookingdata.currentinfo;
                // if(this.pastdata==''){
                //    // alert("no past info")
                //    this.past='true';
                //   }
                // else if (this.currentdata=='')
                //  {
                //       alert("no current data")
                // }   
                if (_this.pastdata == '' && _this.upcomingdata == '') {
                    // alert("no past info")
                    _this.past = 'true';
                    _this.up = 'true';
                }
                else if (_this.pastdata == '') {
                    _this.past = 'true';
                }
                else if (_this.upcomingdata == '') {
                    _this.up = 'true';
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'ALERT!',
                    subTitle: 'Something Went Wrong',
                    buttons: ['ok']
                });
                alert.present();
            });
        });
    };
    EmployeeAppointments = __decorate([
        IonicPage(),
        Component({
            selector: 'page-employee-appointments',
            templateUrl: 'employee-appointments.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            LoadingController, AlertController,
            DataService])
    ], EmployeeAppointments);
    return EmployeeAppointments;
}());
export { EmployeeAppointments };
//# sourceMappingURL=employee-appointments.js.map