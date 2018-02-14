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
import { IonicPage, NavController, ToastController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { Observable } from "rxjs/Rx";
import { Http } from '@angular/http';
var CustomerCheckAvailability = /** @class */ (function () {
    function CustomerCheckAvailability(navCtrl, http, alertCtrl, dataservice, modalCtrl, navParams, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.dataservice = dataservice;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.calendar = {
            mode: 'month',
            currentDate: new Date()
        }; // these are the variable used by the calendar.
        this.datecolor = null;
        this.bigdata = [];
        this.bigdata1 = [];
        this.servicear = [];
        this.servicesname = [];
        this.secondarr = [];
        this.selectedcost = [];
        this.totalTime = 0;
        this.totalcost = 0;
        this.defaultcost = 0;
        this.month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.box = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        this.checkEnable = true;
        this.date_selected = null;
        this.http = http;
        this.timedata = [];
        this.slot = 0;
        this.color = 'without';
        this.employeepic = this.navParams.get('pic');
        this.employeename = this.navParams.get('employeename');
        this.employeeid = this.navParams.get('employeeid');
        this.employeebook = this.navParams.get('employeebook');
        this.salonownername = this.navParams.get('salonownername');
        this.salonownerpic = this.navParams.get('salonownerpic');
        this.salonownerid = this.navParams.get('salonownerid');
        this.salonownerbook = this.navParams.get('salonbook');
        this.model = this.dataservice.value2.selectedservices;
        var currenttime = new Date();
        console.log("currenttime" + currenttime);
        console.log("hours" + currenttime.getHours());
        console.log("minutes" + currenttime.getMinutes());
        this.currenthours = currenttime.getHours();
        if (this.model) {
            this.salonid = this.model.salon_id;
            this.selectedservicetitle = this.model.title;
            this.selectedservicehour = this.model.time.hr;
            this.selectedservicemin = this.model.time.min;
            this.selectedservicecost = this.model.cost;
            this.selectedsalonid = this.model.salon_id;
            this.selectedserviceid = this.model.service_id;
            this.servicear.push(this.selectedserviceid);
            this.servicesname.push(this.selectedservicetitle);
            this.selectedcost.push(this.selectedservicecost);
        }
        var m = new Date();
        var today = new Date();
        console.log(today.getDay());
        console.log(this.timeSlot_Wednesday);
        console.log(this.timeSlot_Friday);
        console.log(this.timeSlot_Sunday);
        console.log(this.timeSlot_Monday);
        console.log(this.timeSlot_Tuesday);
        console.log(this.timeSlot_Thursday);
        console.log(this.timeSlot_Saturday);
        this.Currentdate = today.getDate();
        this.Current_month_value = today.getMonth() + 1;
        this.Current_year_value = today.getFullYear();
        this.selectedYear = m.getFullYear();
        this.selectedMonth = m.getMonth();
        var month = this.selectedMonth + 1;
        this.selecteddate = this.selectedYear + '-' + month + '-' + this.Currentdate;
        this.calculate();
    }
    CustomerCheckAvailability.prototype.ngOnInit = function () {
        this.accountsetting_timeslots(new Date().getDay());
    };
    CustomerCheckAvailability.prototype.accountsetting_timeslots = function (value) {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please wait...' });
        loading.present();
        Observable.forkJoin(this.http.post('http://gagandeepsethi.com/salonDirectory/WebServices/accountSettingsGetBySalonId.json', { salon_id: this.salonid }).map(function (res) { return res.json(); }), this.http.post('http://gagandeepsethi.com/salonDirectory/WebServices/customerSideTimeSlot.json', { salon_id: this.salonid }).map(function (res) { return res.json(); }), this.http.post('http://gagandeepsethi.com/salonDirectory/WebServices/TimeSlot.json', { salon_id: this.salonid }).map(function (res) { return res.json(); })).subscribe(function (data) {
            loading.dismiss();
            _this.accountsetting = data[0];
            _this.onlinebooking = _this.accountsetting.data.online_booking;
            _this.scheduleappointment = _this.accountsetting.data.schedule_appointment;
            _this.allowmultiplebooking = _this.accountsetting.data.allow_multi_service_booking;
            _this.hournoticeforbooking = _this.accountsetting.data.hours_notice_for_online_booking;
            _this.hournoticeforCancel = _this.accountsetting.data.hours_notice_for_cancel_booking;
            _this.timeslotsavailable = data[1];
            var time_slots = data[2];
            for (var i = 0; i <= time_slots.slotdata.length - 1; i++) {
                if (time_slots.slotdata[i].Wednesday) {
                    _this.timeSlot_Wednesday = time_slots.slotdata[i].Wednesday;
                }
                if (value && value == 3) {
                    _this.timedata = _this.timeSlot_Wednesday;
                }
                else if (time_slots.slotdata[i].Friday) {
                    _this.timeSlot_Friday = time_slots.slotdata[i].Friday;
                }
                if (value && value == 5) {
                    _this.timedata = _this.timeSlot_Friday;
                }
                else if (time_slots.slotdata[i].Sunday) {
                    _this.timeSlot_Sunday = time_slots.slotdata[i].Sunday;
                }
                if (value && value == 0) {
                    _this.timedata = _this.timeSlot_Sunday;
                }
                else if (time_slots.slotdata[i].Monday) {
                    _this.timeSlot_Monday = time_slots.slotdata[i].Monday;
                }
                if (value && value == 1) {
                    _this.timedata = _this.timeSlot_Monday;
                }
                else if (time_slots.slotdata[i].Tuesday) {
                    _this.timeSlot_Tuesday = time_slots.slotdata[i].Tuesday;
                }
                if (value && value == 2) {
                    _this.timedata = _this.timeSlot_Tuesday;
                }
                else if (time_slots.slotdata[i].Thursday) {
                    _this.timeSlot_Thursday = time_slots.slotdata[i].Thursday;
                }
                if (value && value == 4) {
                    _this.timedata = _this.timeSlot_Thursday;
                }
                else if (time_slots.slotdata[i].Saturday) {
                    _this.timeSlot_Saturday = time_slots.slotdata[i].Saturday;
                }
                if (value && value == 6) {
                    _this.timedata = _this.timeSlot_Saturday;
                }
                else { }
            }
        }, function (err) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'SERVER ERROR',
                subTitle: 'Please Try Again',
                buttons: ['Ok']
            });
            alert.present();
            console.error(err);
        });
    };
    CustomerCheckAvailability.prototype.check = function (value) {
        if (value && value == 3) {
            this.timedata = this.timeSlot_Wednesday;
        }
        if (value && value == 5) {
            this.timedata = this.timeSlot_Friday;
        }
        if (value && value == 0) {
            this.timedata = this.timeSlot_Sunday;
        }
        if (value && value == 1) {
            this.timedata = this.timeSlot_Monday;
        }
        if (value && value == 2) {
            this.timedata = this.timeSlot_Tuesday;
            console.log(this.timedatathis.timedata);
        }
        if (value && value == 4) {
            this.timedata = this.timeSlot_Thursday;
        }
        if (value && value == 6) {
            this.timedata = this.timeSlot_Saturday;
        }
    };
    CustomerCheckAvailability.prototype.calculate = function () {
        if ((this.selectedYear % 4 == 0 && this.selectedYear % 100 != 0) || this.selectedYear % 400 == 0) {
            this.leapornot = 'leap';
            this.totaldays = 366;
            if (this.selectedMonth + 1 == 1 || this.selectedMonth + 1 == 3 || this.selectedMonth + 1 == 5 || this.selectedMonth + 1 == 7 || this.selectedMonth + 1 == 8 || this.selectedMonth + 1 == 10 || this.selectedMonth + 1 == 12) {
                this.daysinmonth = 31;
            }
            if (this.selectedMonth + 1 == 2) {
                this.daysinmonth = 29;
            }
            if (this.selectedMonth + 1 == 4 || this.selectedMonth + 1 == 6 || this.selectedMonth + 1 == 9 || this.selectedMonth + 1 == 11) {
                this.daysinmonth = 30;
            }
        }
        else {
            this.leapornot = 'not leap';
            this.totaldays = 365;
            if (this.selectedMonth + 1 == 1 || this.selectedMonth + 1 == 3 || this.selectedMonth + 1 == 5 || this.selectedMonth + 1 == 7 || this.selectedMonth + 1 == 8 || this.selectedMonth + 1 == 10 || this.selectedMonth + 1 == 12) {
                this.daysinmonth = 31;
            }
            if (this.selectedMonth + 1 == 2) {
                this.daysinmonth = 28;
            }
            if (this.selectedMonth + 1 == 4 || this.selectedMonth + 1 == 6 || this.selectedMonth + 1 == 9 || this.selectedMonth + 1 == 11) {
                this.daysinmonth = 30;
            }
        }
        this.calculatedays();
        var z = 1;
        for (var i = 0; i < this.box.length; i++) {
            if (i >= this.monthfirstday) {
                if (z <= this.daysinmonth) {
                    this.box[i] = z;
                    z++;
                }
                else {
                    this.box[i] = null;
                }
            }
            else {
                this.box[i] = null;
            }
        }
    };
    CustomerCheckAvailability.prototype.previousMonth = function () {
        if ((this.Current_month_value - 1) == this.selectedMonth && this.Current_year_value == this.selectedYear) {
        }
        else {
            document.getElementById(this.datecolor).style.background = '#fff';
            document.getElementById(this.datecolor).style.color = "#000";
            if (this.selectedMonth > 0) {
                this.selectedMonth = this.selectedMonth - 1;
            }
            else {
                this.selectedMonth = 11;
                this.selectedYear--;
            }
            if (this.date_selected != null) {
                this.selectm = this.selectedMonth + 1;
                this.selecteddate = this.selectedYear + '-' + this.selectm + '-' + this.date_selected;
            }
            this.checkEnable = true;
            this.calculate();
            this.timedata = [];
        }
    };
    CustomerCheckAvailability.prototype.nextMonth = function () {
        document.getElementById(this.datecolor).style.background = '#fff';
        document.getElementById(this.datecolor).style.color = "#000";
        if (this.selectedMonth < 11) {
            this.selectedMonth = this.selectedMonth + 1;
        }
        else {
            this.selectedMonth = 0;
            this.selectedYear++;
        }
        if (this.date_selected != null) {
            this.selectm = this.selectedMonth + 1;
            this.selecteddate = this.selectedYear + '-' + this.selectm + '-' + this.date_selected;
        }
        this.checkEnable = true;
        this.calculate();
        this.timedata = [];
    };
    CustomerCheckAvailability.prototype.calculatedays = function () {
        var d = 0;
        this.oddDays = this.selectedYear % 400;
        console.log(this.oddDays);
        for (var i = this.oddDays; i > 0; i--) {
            if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {
                d = d + 2;
                console.log('leap');
            }
            else {
                d = d + 1;
                console.log('not leap');
            }
        }
        if (d > 7) {
            d = d % 7;
        }
        var a = this.odddaysinmonth();
        console.log((a + d) % 7);
        this.monthfirstday = (a + d) % 7;
    };
    CustomerCheckAvailability.prototype.odddaysinmonth = function () {
        var d = 0;
        var m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        for (var i = 0; i < this.selectedMonth; i) {
            d = d + m[i];
            i++;
        }
        if ((this.selectedYear % 4 == 0 && this.selectedYear % 100 != 0) || this.selectedYear % 400 == 0) {
            d = d + 1;
        }
        return d;
    };
    CustomerCheckAvailability.prototype.pickDate = function (value, index) {
        if (index % 7 == 1) {
            console.log('Sun');
            this.timedata = this.timeSlot_Sunday;
        }
        else if (index % 7 == 2) {
            console.log('Mon');
            this.timedata = this.timeSlot_Monday;
        }
        else if (index % 7 == 3) {
            console.log('Tue');
            this.timedata = this.timeSlot_Tuesday;
            console.log(this.timeSlot_Tuesday);
            console.log(this.timedata);
        }
        else if (index % 7 == 4) {
            console.log('Wed');
            this.timedata = this.timeSlot_Wednesday;
        }
        else if (index % 7 == 5) {
            console.log('Thu');
            this.timedata = this.timeSlot_Thursday;
        }
        else if (index % 7 == 6) {
            console.log('Fri');
            this.timedata = this.timeSlot_Friday;
        }
        else if (index % 7 == 0) {
            console.log('Sat');
            this.timedata = this.timeSlot_Saturday;
        }
        this.selectedItem = null;
        this.checkEnable = true;
        if (value != null) {
            if (this.datecolor != null) {
                document.getElementById(this.datecolor).style.background = '#fff';
                document.getElementById(this.datecolor).style.color = "#000";
                this.datecolor = null;
                this.pickDate(value);
            }
            if (this.datecolor == null) {
                this.datecolor = value + 'datediv';
                document.getElementById(this.datecolor).style.background = '#FF0000';
                document.getElementById(this.datecolor).style.color = "white";
                this.selectm = this.selectedMonth + 1;
                // alert("picked date "+value+'-'+this.selectedMonth+'-'+this.selectedYear);
                this.selecteddate = this.selectedYear + '-' + this.selectm + '-' + value;
                this.date_selected = value;
                // alert("Selected Date 2"+this.selecteddate)
            }
        }
    };
    CustomerCheckAvailability.prototype.ngAfterViewInit = function () {
        this.datecolor = this.Currentdate + 'datediv';
        document.getElementById(this.datecolor).style.background = '#FF0000';
        document.getElementById(this.datecolor).style.color = "white";
    };
    CustomerCheckAvailability.prototype.openservicesmodel = function () {
        var _this = this;
        var profileModal = this.modalCtrl.create('CustomerAddServices', { bigdata: this.bigdata });
        profileModal.onDidDismiss(function (data) {
            console.log('hello dismissed data' + JSON.stringify(data));
            _this.noservices = 'false';
            _this.title = data.title;
            _this.cost = data.cost;
            _this.time = data.time;
            _this.serviceid = data.service_id;
            _this.bigdata.push({ title: _this.title, cost: _this.cost, time: _this.time, service_id: _this.serviceid });
        });
        profileModal.present();
    };
    CustomerCheckAvailability.prototype.selectedtime = function (data, timevalue, timemin) {
        this.slot = 1;
        this.defaulttime1 = timevalue;
        this.defaulttime2 = timemin;
        this.totalhour = this.defaulttime1 + this.selectedservicehour;
        this.totalmin = this.defaulttime2 + this.selectedservicemin;
        if (this.totalmin > 59) {
            this.totalmin = this.totalmin - 60;
            this.totalhour++;
        }
        this.selectedhour = timevalue;
        this.selectedmin = timemin;
        this.selectedItem = data;
        var a, b;
        if (timevalue.toString().length == 1) {
            a = '0' + timevalue.toString();
        }
        else {
            a = timevalue.toString();
        }
        if (timemin.toString().length == 1) {
            b = '0' + timemin.toString();
        }
        else {
            b = timemin.toString();
        }
        var c = this.selecteddate + 'T' + a + ':' + b + ':00.00Z';
        var h = new Date().getHours().toString().length == 1 ? '0' + new Date().getHours().toString() : new Date().getHours().toString();
        var m = new Date().getMinutes().toString().length == 1 ? '0' + new Date().getMinutes().toString() : new Date().getMinutes().toString();
        var s = new Date().getSeconds().toString().length == 1 ? '0' + new Date().getSeconds().toString() : new Date().getSeconds().toString();
        var currentTime = Date.parse(new Date().toISOString().toString().split('T')[0] + 'T' + h + ':' + m + ':' + s + '.00Z');
        var selectedTime = Date.parse(c);
        console.log(new Date().toISOString().toString().split('T')[0]);
        console.log(new Date().toISOString().toString().split('T')[0] + 'T' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + '.00Z');
        console.log(c);
        console.log(currentTime);
        console.log(selectedTime);
        console.log(currentTime < selectedTime);
        if (currentTime < selectedTime) {
            this.checkEnable = false;
        }
        else {
            this.checkEnable = true;
        }
    };
    CustomerCheckAvailability.prototype.appoint = function () {
        this.starttime3 = this.currentHr2 + ':' + this.currentMin2;
        // if(this.currentHr2==undefined && this.currentMin2==undefined)
        if (this.defaulttime1 == undefined && this.defaulttime2 == undefined) {
            var alert_1 = this.alertCtrl.create({
                title: 'Oops!',
                subTitle: 'Please Choose a Time Slot ',
                buttons: ['ok']
            });
            alert_1.present();
            //      this.sevicearray=this.selectedserviceid       
            //      this.starttime1=this.defaulttime1+':'+this.defaulttime2;
            //      this.starttime2=this.totalhour+':'+this.totalmin;
            //          this.endtime1=this.totalhour;
            //          this.endtime2=this.totalmin;
            // alert(this.starttime1)
            // alert(this.starttime2)
            // this.booking(this.newserviceid,this.selectedservicetitle,this.selectedservicecost)
        }
        else if (this.bigdata.length == 0) {
            this.endtime1 = this.totalhour;
            this.endtime2 = this.totalmin;
            this.sevicearray = this.selectedserviceid;
            this.starttime1 = this.defaulttime1 + ':' + this.defaulttime2;
            this.starttime2 = this.totalhour + ':' + this.totalmin;
            this.booking(this.sevicearray, this.selectedservicetitle, this.selectedservicecost);
        }
        if (this.bigdata.length > 0) {
            this.starttime1 = this.defaulttime1 + ':' + this.defaulttime2;
            this.starttime2 = this.currentHr2 + ':' + this.currentMin2;
            this.endtime1 = this.currentHr2;
            this.endtime2 = this.currentMin2;
            for (var i = 0; i < this.bigdata.length; i++) {
                console.log("id check" + JSON.stringify(this.bigdata[i].service_id));
                console.log("services name" + JSON.stringify(this.bigdata[i].title));
                this.servicear.push(this.bigdata[i].service_id);
                this.servicesname.push(this.bigdata[i].title);
                this.selectedcost.push(this.bigdata[i].cost);
                console.log("servicesname" + JSON.stringify(this.servicesname));
                console.log("servicesarray" + JSON.stringify(this.servicear));
                console.log("Cost array" + JSON.stringify(this.selectedcost));
                if (this.bigdata.length == i + 1) {
                    // alert("Repeated Array"+this.servicear);
                    var b = this.unique(this.servicear);
                    // alert("Filter Array id"+b)
                    var c = this.unique(this.servicesname);
                    // alert("Filter Array name"+c)
                    var d = this.unique(this.selectedcost);
                    // alert("Filter Array cost"+d)
                    this.booking(this.servicear, this.servicesname, this.selectedcost);
                }
            }
        }
    };
    CustomerCheckAvailability.prototype.booking = function (serviceids, servicesname, servicescost) {
        var a = this.selecteddate.split("-");
        var selected_year = a[0];
        // alert("b ke value"+selected_year)
        var selected_month = a[1];
        // alert("b ke value"+selected_month)
        var selected_day = a[2];
        // alert("b ke value"+selected_day)
        // alert("e ke value"+e)
        var f = parseInt(this.Currentdate);
        var Selected_mydate = new Date(a[0], a[1] - 1, a[2]);
        // alert("selctd date"+Selected_mydate.getTime())
        var _mydate = new Date(2013, 1, 1);
        ;
        var Current_mydate = new Date(this.Current_year_value, this.Current_month_value - 1, this.Currentdate);
        // alert("curnt_date"+Current_mydate.getTime())
        // alert("f ke value"+f)
        //  alert("day"+this.Currentdate)
        // alert("month"+this.Current_month_value)
        // alert("year"+this.Current_year_value)
        // &&b!=this.Current_year_value
        if (Selected_mydate.getTime() >= Current_mydate.getTime()) {
            this.bookeddate = this.selecteddate;
            this.checkbooking(serviceids, servicesname, servicescost);
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: 'SORRY!',
                subTitle: 'Selected Date is already passed',
                buttons: ['ok']
            });
            alert_2.present();
            // var tzoffset = (new Date(this.selecteddate)).getTimezoneOffset() * 60000; //offset in milliseconds
            // var localISOTime = (new Date(this.selecteddate - tzoffset)).toISOString().slice(0,-1)
            // let c=localISOTime.split('T')
            // this.bookeddate=this.selecteddate
            // console.log("start time"+this.choosentime)
            // console.log("end time"+ this.endtime)
            // console.log("salon id"+this.salonid)
            // console.log("total Duration"+this.totaltimevalue)
            // console.log("total Cost"+this.totalcost)
            // console.log("Employee id"+this.employeeid)
            // console.log("Service id"+serviceids)
            // this.checkbooking(serviceids,servicesname,servicescost)
        }
    };
    CustomerCheckAvailability.prototype.getMin = function (min) {
        if (min == '0') {
            return '00';
        }
        else {
            return min;
        }
    };
    CustomerCheckAvailability.prototype.addzero = function (min) {
        if (min == '0') {
            return '00';
        }
        else {
            return min;
        }
    };
    CustomerCheckAvailability.prototype.addzero2 = function (min) {
        if (min < 10) {
            var a = '0' + min;
            return a;
        }
        else {
            return min;
        }
    };
    CustomerCheckAvailability.prototype.unique = function (array) {
        return array.filter(function (el, index, arr) {
            return index == arr.indexOf(el);
        });
    };
    CustomerCheckAvailability.prototype.checkbooking = function (serviceids, servicesname, servicescost) {
        var _this = this;
        // alert("hello starttime"+this.starttime1)
        var a = this.starttime1.split(':');
        if (a[0] >= 18) {
            var alert_3 = this.alertCtrl.create({
                title: 'SORRY!',
                subTitle: ' You are not allowed to book the last time slot of the sine',
                buttons: ['ok']
            });
            alert_3.present();
        }
        else {
            this.sevicearray = serviceids;
            var loading_1 = this.loadingCtrl.create({ content: 'Please Wait...' });
            Observable.fromPromise(loading_1.present())
                .flatMap(function (data) { return _this.dataservice.customerbooking(_this.sevicearray, _this.starttime1, _this.starttime2, _this.salonid, _this.bookeddate, _this.employeeid); })
                .subscribe(function (data) {
                return loading_1.dismiss().then(function () {
                    _this.bookingdata = data;
                    if (_this.bookingdata.status == 1) {
                        _this.bookingid = _this.bookingdata.data.booking_id;
                        console.log("hello new " + _this.bookingid);
                        _this.navCtrl.push('ConfirmDetails', { bookingid: _this.bookingid,
                            starttime: _this.defaulttime1,
                            startime2: _this.defaulttime2,
                            endtime1: _this.endtime1,
                            endtime2: _this.endtime2,
                            salonid: _this.salonid,
                            totalduration: _this.totaltimevalue,
                            totalcost: servicescost,
                            selecteddate: _this.bookeddate,
                            employeeid: _this.employeeid,
                            serviceid: _this.sevicearray,
                            servicesname: servicesname,
                            employeename: _this.employeename,
                            onlinebooking: _this.onlinebooking,
                            employeepic: _this.employeepic,
                            salonownername: _this.salonownername,
                            salonownerpic: _this.salonownerpic,
                            salonownerid: _this.salonownerid,
                            employeebook: _this.employeebook,
                            salonownerbook: _this.salonownerbook
                        });
                    }
                    else if (_this.bookingdata.status == 0) {
                        var alert_4 = _this.alertCtrl.create({
                            title: 'SORRY!',
                            subTitle: 'This slot is already booked,Please choose another slot',
                            buttons: ['ok']
                        });
                        alert_4.present();
                    }
                });
            }, function (error) { return loading_1.dismiss().then(function () { }); });
        }
    };
    CustomerCheckAvailability.prototype.deleteservice = function (i) {
        this.bigdata.splice(i, 1);
    };
    CustomerCheckAvailability.prototype.getHours1 = function (time, i) {
        if (i == 0) {
            this.currentHr1 = this.totalhour;
            if (this.currentHr1 < 10) {
                return '0' + this.currentHr1;
            }
            else {
                return this.currentHr1;
            }
        }
        else {
            this.currentHr1 = this.currentHr2;
            if (this.currentHr1 < 10) {
                return '0' + this.currentHr1;
            }
            else {
                return this.currentHr1;
            }
        }
    };
    CustomerCheckAvailability.prototype.getMin1 = function (time, i) {
        if (i == 0) {
            this.currentMin1 = this.totalmin;
            if (this.currentMin1 < 10) {
                return '0' + this.currentMin1;
            }
            else {
                return this.currentMin1;
            }
        }
        else {
            this.currentMin1 = this.currentMin2;
            if (this.currentMin1 < 10) {
                return '0' + this.currentMin1;
            }
            else {
                return this.currentMin1;
            }
        }
    };
    CustomerCheckAvailability.prototype.getHours2 = function (time, i) {
        if (this.currentMin1 + time.min > 59) {
            this.currentHr2 = this.currentHr1 + time.hr + 1;
            if (this.currentHr2 < 10) {
                return '0' + this.currentHr2;
            }
            else {
                return this.currentHr2;
            }
        }
        else {
            this.currentHr2 = this.currentHr1 + time.hr;
            if (this.currentHr2 < 10) {
                return '0' + this.currentHr2;
            }
            else {
                return this.currentHr2;
            }
        }
    };
    CustomerCheckAvailability.prototype.getMin2 = function (time, i) {
        if (this.currentMin1 + time.min > 59) {
            this.currentMin2 = this.currentMin1 + time.min - 60;
            if (this.currentMin2 < 10) {
                return '0' + this.currentMin2;
            }
            else {
                return this.currentMin2;
            }
        }
        else {
            this.currentMin2 = this.currentMin1 + time.min;
            if (this.currentMin2 < 10) {
                return '0' + this.currentMin2;
            }
            else {
                return this.currentMin2;
            }
        }
    };
    CustomerCheckAvailability = __decorate([
        IonicPage(),
        Component({
            selector: 'page-customer-check-availability',
            templateUrl: 'customer-check-availability.html',
        }),
        __metadata("design:paramtypes", [NavController, Http, AlertController,
            DataService, ModalController,
            NavParams, LoadingController,
            ToastController])
    ], CustomerCheckAvailability);
    return CustomerCheckAvailability;
}());
export { CustomerCheckAvailability };
//# sourceMappingURL=customer-check-availability.js.map