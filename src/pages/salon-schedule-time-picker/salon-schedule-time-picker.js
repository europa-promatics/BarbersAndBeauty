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
var v;
var f;
/**
 * Generated class for the SalonScheduleTimePicker page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalonScheduleTimePicker = /** @class */ (function () {
    function SalonScheduleTimePicker(navCtrl, navParams, viewctrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewctrl = viewctrl;
        this.alertCtrl = alertCtrl;
        this.array2 = [];
        this.array1 = [];
        this.array3 = [];
        this.array4 = [];
        this.time1 = [
            { time: "10:00", value: 1 },
            { time: "10:30", value: 2 },
            { time: "11:00", value: 3 },
            { time: "11:30", value: 4 },
            { time: "12:00", value: 5 },
            { time: "12:30", value: 6 },
            { time: "13:00", value: 7 },
            { time: "13:30", value: 8 },
            { time: "14:00", value: 9 },
            { time: "14:30", value: 10 },
            { time: "15:00", value: 11 },
            { time: "15:30", value: 12 },
            { time: "16:00", value: 13 },
            { time: "16:30", value: 14 },
            { time: "17:00", value: 15 },
            { time: "17:30", value: 16 },
            { time: "18:00", value: 17 },
            { time: "18:30", value: 18 },
            { time: "19:00", value: 19 },
            { time: "19:30", value: 20 },
            { time: "20:00", value: 21 },
            { time: "20:30", value: 22 },
            { time: "21:00", value: 23 },
            { time: "21:30", value: 24 },
            { time: "22:00", value: 25 },
            { time: "22:30", value: 26 },
            { time: "23:00", value: 27 },
        ];
        this.time2 = [
            { time: "10:30", value: 2 },
            { time: "11:00", value: 3 },
            { time: "11:30", value: 4 },
            { time: "12:00", value: 5 },
            { time: "12:30", value: 6 },
            { time: "13:00", value: 7 },
            { time: "13:30", value: 8 },
            { time: "14:00", value: 9 },
            { time: "14:30", value: 10 },
            { time: "15:00", value: 11 },
            { time: "15:30", value: 12 },
            { time: "16:00", value: 13 },
            { time: "16:30", value: 14 },
            { time: "17:00", value: 15 },
            { time: "17:30", value: 16 },
            { time: "18:00", value: 17 },
            { time: "18:30", value: 18 },
            { time: "19:00", value: 19 },
            { time: "19:30", value: 20 },
            { time: "20:00", value: 21 },
            { time: "20:30", value: 22 },
            { time: "21:00", value: 23 },
            { time: "21:30", value: 24 },
            { time: "22:00", value: 25 },
            { time: "22:30", value: 26 },
            { time: "23:00", value: 27 },
            { time: "23:30", value: 28 },
        ];
        this.monday = this.navParams.get('day1');
        this.tuesday = this.navParams.get('day2');
        this.wednesday = this.navParams.get('day3');
        this.thursday = this.navParams.get('day4');
        this.friday = this.navParams.get('day5');
        this.saturday = this.navParams.get('day6');
        this.sunday = this.navParams.get('day7');
    }
    SalonScheduleTimePicker.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalonScheduleTimePicker');
    };
    SalonScheduleTimePicker.prototype.cancel = function (data) {
        if (data == undefined)
            this.viewctrl.dismiss();
    };
    //   time_pick_start(start_time,index){
    //        this.mytime=start_time
    //        v = 'var_'+ index;
    //           this.array1.push(v)
    //     for(var k=0;k<this.array1.length;k++){
    //       this.array2.push(this.array1[k])
    //     }
    //     // alert('green valai ka index'+v)
    //     var x = document.getElementById(v);
    //     x.style.background = "#009900";
    //       for (var j = 0; j<this.array2.length; j++) {
    //     for( var i=0;i<this.array2.length;i++){
    //       // alert('actyual'+this.array2.length)
    //     if(v==this.array2[i]){
    //       // alert(v)
    //       // alert('aray elmnt'+this.array2[i])
    //     this.array2[i]=this.array2[i+1]
    // }
    // }
    // this.array2.length=this.array2.length-1
    // }
    // alert(JSON.stringify(this.array2))
    //  alert('after -1 '+this.array2.length)
    // for(var j=0;j<this.array2.length;j++){
    //  var y = document.getElementById(this.array2[j]);
    // alert('white valai index'+this.array2[j])
    //    y.style.background = "#fff"
    // }
    // this.array2=[]
    // // alert(this.array2.length)
    //   }
    SalonScheduleTimePicker.prototype.time_pick_start = function (start_time, index) {
        this.mytime = start_time;
        v = 'var_' + index;
        this.array1.push(v);
        for (var k = 0; k < this.array1.length; k++) {
            this.array2.push(this.array1[k]);
            // alert(JSON.stringify(this.array2))
        }
        // alert('green valai ka index'+v)
        var x = document.getElementById(v);
        x.style.background = "#009900";
        // for (var j = 0; j<this.array2.length; j++) {
        for (var i = 0; i < this.array2.length; i++) {
            // alert('actyual'+this.array2.length)
            if (v == this.array2[i]) {
                // alert(v)
                // alert('aray elmnt'+this.array2[i])
                this.array2[i] = this.array2[i + 1];
            }
        }
        this.array2.length = this.array2.length - 1;
        // alert(JSON.stringify(this.array2))
        //  alert('after -1 '+this.array2.length)
        for (var j = 0; j < this.array2.length; j++) {
            var y = document.getElementById(this.array2[j]);
            // alert('white valai index'+this.array2[j])
            y.style.background = "#fff";
        }
        this.array2 = [];
        // alert(this.array2.length)
    };
    SalonScheduleTimePicker.prototype.time_pick_end = function (end_time, index) {
        // alert(index)
        this.mytime2 = end_time;
        f = 'var_' + index;
        // alert(f)
        this.array3.push(f);
        for (var k = 0; k < this.array3.length; k++) {
            this.array4.push(this.array3[k]);
            // alert(JSON.stringify(this.array4))
        }
        // alert('green valai ka index'+f)
        var x = document.getElementById(f);
        x.style.background = "#009900";
        for (var i = 0; i < this.array4.length; i++) {
            // alert('actyual'+this.array2.length)
            if (v == this.array4[i]) {
                // alert(v)
                // alert('aray elmnt'+this.array2[i])
                this.array4[i] = this.array4[i + 1];
            }
        }
        this.array4.length = this.array4.length - 1;
        // alert(JSON.stringify(this.array2))
        //  alert('after -1 '+this.array2.length)
        for (var j = 0; j < this.array4.length; j++) {
            var y = document.getElementById(this.array4[j]);
            // alert('white valai index'+this.array2[j])
            y.style.background = "#fff";
        }
        this.array4 = [];
        // alert(this.array2.length)
    };
    SalonScheduleTimePicker.prototype.save = function () {
        this.first_time_index = this.mytime.replace(':', "");
        this.second_time_index = this.mytime2.replace(':', "");
        // alert(this.first_time_index[1])
        // alert(this.second_time_index[1])
        this.myend_time = parseInt(this.first_time_index);
        this.myend_time2 = parseInt(this.second_time_index);
        console.log("In savwe" + this.mytime);
        console.log("In savwe" + this.mytime2);
        var partial = {
            starting_time_index0: this.first_time_index[0],
            starting_time_index1: this.myend_time,
            ending_time_index0: this.second_time_index[0],
            ending_time_index1: this.myend_time2,
            selected_start_time: this.mytime,
            selected_end_time: this.mytime2
        };
        var mandatory = [];
        // alert("array"+partial.starting_time_index1)
        // alert("array"+partial.ending_time_index1)
        if ((partial.starting_time_index1 >= partial.ending_time_index1)) {
            mandatory.push('Please Select Valid Time Field');
            // code...
        }
        if (partial.selected_start_time == undefined || partial.selected_end_time == undefined) {
            mandatory.push('Please Select Both Time Field');
        }
        if (mandatory.length > 0) {
            this.alertCtrl
                .create({ title: 'Sorry', message: mandatory.join(', '), buttons: ['OK'] })
                .present();
            return;
        }
        else {
            this.viewctrl.dismiss({ our_start_time: this.mytime, our_end_time: this.mytime2 });
        }
    };
    SalonScheduleTimePicker = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-schedule-time-picker',
            templateUrl: 'salon-schedule-time-picker.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController, AlertController])
    ], SalonScheduleTimePicker);
    return SalonScheduleTimePicker;
}());
export { SalonScheduleTimePicker };
//# sourceMappingURL=salon-schedule-time-picker.js.map