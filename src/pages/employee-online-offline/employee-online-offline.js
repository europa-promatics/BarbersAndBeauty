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
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { Observable } from "rxjs/Rx";
var EmployeeOnlineOffline = /** @class */ (function () {
    function EmployeeOnlineOffline(navCtrl, alertCtrl, navParams, dataservice, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.dataservice = dataservice;
        this.loadingCtrl = loadingCtrl;
    }
    EmployeeOnlineOffline.prototype.ngOnInit = function () {
        this.checkstatus();
    };
    EmployeeOnlineOffline.prototype.Status = function () {
        var _this = this;
        if (this.status == true) {
            var Status_active = 1;
            var alert_1 = this.alertCtrl.create({
                title: 'Confirm Status',
                message: 'Are you sure you want to be on duty?',
                buttons: [
                    {
                        text: 'No',
                        role: 'cancel',
                        handler: function () {
                            console.log('No clicked');
                            _this.status_text = 'Off Duty';
                            _this.status = 'false';
                        }
                    },
                    {
                        text: 'Yes',
                        handler: function () {
                            console.log('Yes clicked');
                            _this.status_text = 'On Duty';
                            _this.dataservice.employeestatus(Status_active)
                                .subscribe(function (data) {
                                _this.employeeStatusdata = data;
                                if (_this.employeeStatusdata.message == "employee status active saved suceessfully") {
                                    console.log("active");
                                    _this.status = 'true';
                                    var alert_2 = _this.alertCtrl.create({
                                        subTitle: 'Status Updated successfully ',
                                        buttons: ['OK']
                                    });
                                    alert_2.present();
                                }
                                console.log('data' + JSON.stringify(_this.employeeStatusdata.message));
                            }),
                                function (error) { };
                        }
                    }
                ]
            });
            alert_1.present();
        }
        else if (this.status == false) {
            var Status_active = 0;
            var alert_3 = this.alertCtrl.create({
                title: 'Confirm Status',
                message: 'Are you sure you want to be off duty?',
                buttons: [
                    {
                        text: 'No',
                        role: 'cancel',
                        handler: function () {
                            console.log('No clicked');
                            _this.status_text = 'On Duty';
                            _this.status = 'true';
                        }
                    },
                    {
                        text: 'Yes',
                        handler: function () {
                            console.log('Yes clicked');
                            _this.status_text = 'Off Duty';
                            _this.dataservice.employeestatus(Status_active)
                                .subscribe(function (data) {
                                _this.employeeStatusdata = data;
                                console.log('data' + JSON.stringify(_this.employeeStatusdata.message));
                                if (_this.employeeStatusdata.message == "employee status inactive saved successfully") {
                                    console.log("Inactive");
                                    _this.status = 'false';
                                    var alert_4 = _this.alertCtrl.create({
                                        subTitle: 'Status Updated successfully ',
                                        buttons: ['OK']
                                    });
                                    alert_4.present();
                                }
                            }),
                                function (error) { };
                        }
                    }
                ]
            });
            alert_3.present();
        }
    };
    EmployeeOnlineOffline.prototype.checkstatus = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.employeestatusstatuscheck(); })
            .subscribe(function (data) {
            loading.dismiss();
            _this.checkdatastatus = data;
            console.log(JSON.stringify(_this.checkstatus));
            console.log(JSON.stringify(_this.checkstatus['employee_online_status']));
            console.log(JSON.stringify(data.employee_online_status));
            _this.status_employee = _this.checkdatastatus.employee_online_status;
            if (_this.status_employee == "1") {
                _this.status = 'true';
                _this.status_text = 'On Duty';
            }
            else if (_this.status_employee == "0") {
                _this.status = 'false';
                _this.status_text = 'Off Duty';
            }
            // console.log(JSON.stringify("status"+this.checkstatus.employee_online_status));
        }),
            function (error) { };
    };
    EmployeeOnlineOffline = __decorate([
        IonicPage(),
        Component({
            selector: 'page-employee-online-offline',
            templateUrl: 'employee-online-offline.html',
        }),
        __metadata("design:paramtypes", [NavController, AlertController,
            NavParams, DataService,
            LoadingController])
    ], EmployeeOnlineOffline);
    return EmployeeOnlineOffline;
}());
export { EmployeeOnlineOffline };
//# sourceMappingURL=employee-online-offline.js.map