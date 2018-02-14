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
var SalonClientBooking = /** @class */ (function () {
    function SalonClientBooking(navCtrl, navParams, loadingCtrl, dataservice, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.dataservice = dataservice;
        this.alertCtrl = alertCtrl;
        this.events = [];
        this.calendar = { mode: 'month', currentDate: new Date() };
        this.showAppointments = false;
        this.markDisabled = function (date) {
            var current = new Date();
            current.setHours(0, 0, 0);
            return date < current;
        };
        this.segment = "booking_request";
    }
    SalonClientBooking.prototype.ionViewDidEnter = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.get_appointment_data(); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.minedata = data;
                _this.mydata = _this.minedata.customerappointment;
                _this.my_services = _this.minedata.customerappointment.service;
                _this.all_dates = _this.minedata.customerappointment;
                if (_this.minedata.customerappointment != undefined) {
                    _this.customer_name = _this.minedata.customerappointment[0].customer_name;
                }
                _this.loadEvents();
            });
        }, function (error) {
            loading.dismiss().then(function () {
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
    SalonClientBooking.prototype.openDetail = function (m) {
        console.log(m);
        this.navCtrl.push('CancelBooking', { data: m });
    };
    SalonClientBooking.prototype.loadEvents = function () {
        // this.eventSource = this.createRandomEvents();
        this.eventSource = this.dynamicEvents();
        this.showAppointments = true;
        /*alert(JSON.stringify(this.events))*/
    };
    SalonClientBooking.prototype.onViewTitleChanged = function (title) {
        this.viewTitle = title;
    };
    SalonClientBooking.prototype.onEventSelected = function (event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
        // this.navCtrl.push('AppointmentDetailPage',{data:event})
    };
    SalonClientBooking.prototype.changeMode = function (mode) {
        this.calendar.mode = mode;
    };
    SalonClientBooking.prototype.today = function () {
        this.calendar.currentDate = new Date();
        // alert("Current_date"+this.calendar.currentDate)
    };
    SalonClientBooking.prototype.onTimeSelected = function (ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
        this.date_change = ev.selectedTime;
        var someDate = new Date(this.date_change);
        // alert(someDate)
        var year = someDate.getFullYear();
        month = someDate.getMonth() + 1;
        day = someDate.getDate();
        if (month <= 9) {
            var month = "0" + month;
        }
        if (day <= 9) {
            var day = "0" + day;
        }
        var mydate = year + '-' + month + '-' + day;
        this.current_date = mydate;
    };
    SalonClientBooking.prototype.onCurrentDateChanged = function (event) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
        // alert( "Hope"+this.isToday)
    };
    SalonClientBooking.prototype.onRangeChanged = function (ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    };
    SalonClientBooking.prototype.dynamicEvents = function () {
        if (this.minedata.customerappointment == undefined) {
            var alert_1 = this.alertCtrl.create({
                title: 'Oops!',
                subTitle: 'No Appointment Exist !',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            // var date=new Date('2017-08-23T12:00:00')
            for (var i = 0; i < this.minedata.customerappointment.length; i++) {
                for (var j = 0; j < this.minedata.customerappointment[i].service.length; j++) {
                    if (this.minedata.customerappointment[i].service[j] != null) {
                        this.events.push({
                            startTime: new Date(this.minedata.customerappointment[i].date),
                            endTime: new Date(this.minedata.customerappointment[i].date)
                        });
                        // console.log('services'+this.minedata.customerappointment[i].service[j].title)
                    }
                }
                if (this.minedata.customerappointment.length == i + 1) {
                    return this.events;
                }
            }
        }
    };
    SalonClientBooking = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-client-booking',
            templateUrl: 'salon-client-booking.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, LoadingController, DataService, AlertController])
    ], SalonClientBooking);
    return SalonClientBooking;
}());
export { SalonClientBooking };
//# sourceMappingURL=salon-client-booking.js.map