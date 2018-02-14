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
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { DataService } from "../../providers/data-service";
/**
 * Generated class for the SalonSchedule page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalonSchedule = /** @class */ (function () {
    function SalonSchedule(navCtrl, navParams, viewctrl, modalCtrl, dataservice, alertCtrl, loadingCtrl) {
        // alert(this.mon_start_time)
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewctrl = viewctrl;
        this.modalCtrl = modalCtrl;
        this.dataservice = dataservice;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.address = {
            place: '',
            set: false,
        };
        this.markers = [];
        this.time1 = [
            { time: "10:00", value: 1 },
            { time: "10:30 ", value: 2 },
            { time: "11:00 ", value: 3 },
            { time: "11:30 ", value: 4 },
            { time: "12:00 ", value: 5 },
            { time: "12:30 ", value: 6 },
            { time: "13:00", value: 7 },
            { time: "13:30 ", value: 8 },
            { time: "14:00 ", value: 9 },
            { time: "14:30 ", value: 10 },
            { time: "15:00 ", value: 11 },
            { time: "15:30 ", value: 12 },
            { time: "16:00 ", value: 13 },
            { time: "16:30 ", value: 14 },
            { time: "17:00 ", value: 15 },
            { time: "17:30 ", value: 16 },
            { time: "18:00 ", value: 17 },
            { time: "18:30 ", value: 18 },
            { time: "19:00 ", value: 19 },
            { time: "19:30 ", value: 20 },
            { time: "20:00 ", value: 21 },
            { time: "20:30 ", value: 22 },
            { time: "21:00 ", value: 23 },
            { time: "21:30 ", value: 24 },
            { time: "22:00 ", value: 25 },
            { time: "22:30 ", value: 26 },
            { time: "23:00 ", value: 27 },
            { time: "23:30 ", value: 28 },
        ];
        this.time2 = [
            { time: "10:30 ", value: 2 },
            { time: "11:00 ", value: 3 },
            { time: "11:30 ", value: 4 },
            { time: "12:00 ", value: 5 },
            { time: "12:30 ", value: 6 },
            { time: "13:00", value: 7 },
            { time: "13:30 ", value: 8 },
            { time: "14:00 ", value: 9 },
            { time: "14:30 ", value: 10 },
            { time: "15:00 ", value: 11 },
            { time: "15:30 ", value: 12 },
            { time: "16:00 ", value: 13 },
            { time: "16:30 ", value: 14 },
            { time: "17:00 ", value: 15 },
            { time: "17:30 ", value: 16 },
            { time: "18:00 ", value: 17 },
            { time: "18:30 ", value: 18 },
            { time: "19:00 ", value: 19 },
            { time: "19:30 ", value: 20 },
            { time: "20:00 ", value: 21 },
            { time: "20:30 ", value: 22 },
            { time: "21:00 ", value: 23 },
            { time: "21:30 ", value: 24 },
            { time: "22:00 ", value: 25 },
            { time: "22:30 ", value: 26 },
            { time: "23:00 ", value: 27 },
            { time: "23:30 ", value: 28 },
        ];
        this.days = [
            { day: "Monday" },
            { day: "Tuesday" },
            { day: "Wednesday" },
            { day: "Thursday" },
            { day: "Friday" },
            { day: "Saturday" },
            { day: "Sunday" }
        ];
    }
    SalonSchedule.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalonSchedule');
    };
    SalonSchedule.prototype.update1 = function () {
        this.myvalue1 = this.value1;
        this.mon_start_time = "";
        this.mon_end_time = "";
    };
    SalonSchedule.prototype.update2 = function () {
        this.myvalue2 = this.value2;
        this.tue_start_time = "";
        this.tue_end_time = "";
    };
    SalonSchedule.prototype.update3 = function () {
        this.myvalue3 = this.value3;
        this.wed_start_time = "";
        this.wed_end_time = "";
    };
    SalonSchedule.prototype.update4 = function () {
        this.myvalue4 = this.value4;
        this.thu_start_time = "";
        this.thu_end_time = "";
    };
    SalonSchedule.prototype.update5 = function () {
        this.myvalue5 = this.value5;
        this.fri_start_time = "";
        this.fri_end_time = "";
    };
    SalonSchedule.prototype.update6 = function () {
        this.myvalue6 = this.value6;
        this.sat_start_time = "";
        this.sat_end_time = "";
    };
    SalonSchedule.prototype.update7 = function () {
        this.myvalue7 = this.value7;
        this.sun_start_time = "";
        this.sun_end_time = "";
    };
    // cancel(){
    //   this.viewctrl.dismiss()   
    //   }
    SalonSchedule.prototype.timepicker1 = function (value1) {
        var _this = this;
        value1 = false;
        var modal = this.modalCtrl.create('SalonScheduleTimePicker', { day1: 'Monday' });
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.mon_start_time = data.our_start_time + '-';
            _this.mon_end_time = data.our_end_time + ' ';
        });
    };
    SalonSchedule.prototype.timepicker2 = function () {
        var _this = this;
        var modal = this.modalCtrl.create('SalonScheduleTimePicker', { day2: 'Tuesday' });
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.tue_start_time = data.our_start_time + '-';
            _this.tue_end_time = data.our_end_time + ' ';
        });
    };
    SalonSchedule.prototype.timepicker3 = function (value3) {
        var _this = this;
        value3 = false;
        var modal = this.modalCtrl.create('SalonScheduleTimePicker', { day3: 'Wednesday' });
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.wed_start_time = data.our_start_time + '-';
            _this.wed_end_time = data.our_end_time + ' ';
        });
    };
    SalonSchedule.prototype.timepicker4 = function (value4) {
        var _this = this;
        value4 = false;
        var modal = this.modalCtrl.create('SalonScheduleTimePicker', { day4: 'Thursday' });
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.thu_start_time = data.our_start_time + '-';
            _this.thu_end_time = data.our_end_time + ' ';
        });
    };
    SalonSchedule.prototype.timepicker5 = function (value5) {
        var _this = this;
        value5 = false;
        var modal = this.modalCtrl.create('SalonScheduleTimePicker', { day5: 'Friday' });
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.fri_start_time = data.our_start_time + '-';
            _this.fri_end_time = data.our_end_time + ' ';
        });
    };
    SalonSchedule.prototype.timepicker6 = function (value6) {
        var _this = this;
        value6 = false;
        var modal = this.modalCtrl.create('SalonScheduleTimePicker', { day6: 'Saturday' });
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.sat_start_time = data.our_start_time + '-';
            _this.sat_end_time = data.our_end_time + ' ';
        });
    };
    SalonSchedule.prototype.timepicker7 = function (value7) {
        var _this = this;
        value7 = false;
        var modal = this.modalCtrl.create('SalonScheduleTimePicker', { day7: 'Sunday' });
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.sun_start_time = data.our_start_time + '-';
            _this.sun_end_time = data.our_end_time;
        });
    };
    SalonSchedule.prototype.save = function () {
        this.viewctrl.dismiss({
            mon: this.mon_start_time + this.mon_end_time,
            tue: this.tue_start_time + this.tue_end_time,
            wed: this.wed_start_time + this.wed_end_time,
            thu: this.thu_start_time + this.thu_end_time,
            fri: this.fri_start_time + this.fri_end_time,
            sat: this.sat_start_time + this.sat_end_time,
            sun: this.sun_start_time + this.sun_end_time,
        });
    };
    // this.schedule_value= 'Monday'+' '+ this.mon+' ' + 'Tuesday'+ ' '+ this.tue+' ' +  'Wednesday'+' '+
    //       this.wed +'Thursday'+' '+ this.thurs+'Friday'+' '+ this.fri+'Saturday'+' '+this.sat+'Sunday'+' '+this.sun
    SalonSchedule.prototype.cancel = function () {
        this.viewctrl.dismiss();
    };
    SalonSchedule = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-schedule',
            templateUrl: 'salon-schedule.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController, ModalController, DataService,
            AlertController,
            LoadingController])
    ], SalonSchedule);
    return SalonSchedule;
}());
export { SalonSchedule };
//# sourceMappingURL=salon-schedule.js.map