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
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { Observable } from "rxjs/Rx";
import { PayPal } from '@ionic-native/paypal';
/**
 * Generated class for the ConfirmDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ConfirmDetails = /** @class */ (function () {
    function ConfirmDetails(navCtrl, payPal, actionSheetCtrl, dataservice, alertCtrl, navParams, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.payPal = payPal;
        this.actionSheetCtrl = actionSheetCtrl;
        this.dataservice = dataservice;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.totalcost = [];
        this.salonimg = localStorage['salonimage'];
        this.username = localStorage['username'];
        this.useremail = localStorage['useremail'];
        this.usernumber = localStorage['customernumber'];
        this.starttime2 = this.navParams.get('startime2');
        this.starttime = this.navParams.get('starttime');
        this.endtime1 = this.navParams.get('endtime1');
        this.endtime2 = this.navParams.get('endtime2');
        this.salonid = this.navParams.get('salonid');
        this.totalduration = this.navParams.get('totalduration');
        this.totalcost = this.navParams.get('totalcost');
        this.salonownername = this.navParams.get('salonownername');
        this.salonownerpic = this.navParams.get('salonownerpic');
        this.salonownerid = this.navParams.get('salonownerid');
        this.employeebook = this.navParams.get('employeebook');
        this.salonownerbook = this.navParams.get('salonownerbook');
        // this.singlecost=this.navParams.get('selectedcost')
        // alert("total"+this.totalcost)
        // this.sum=this.totalcost.reduce(this.add,0) 
        // alert("Multiple cost"+this.sum)       
        this.employeeid = this.navParams.get('employeeid');
        this.employeepic = this.navParams.get('employeepic');
        this.servicesselected = this.navParams.get('serviceid');
        // alert("services array"+this.servicesselected)
        this.servicesarray = this.navParams.get('servicesname');
        this.employeename = this.navParams.get('employeename');
        this.bookingid = this.navParams.get('bookingid');
        this.onlinebooking = this.navParams.get('onlinebooking');
        this.salonname = this.dataservice.datavalue.salonname;
        // alert("online"+this.onlinebooking)
        this.salonaddress = this.dataservice.datavalue.salonaddress;
        this.selecteddate = this.navParams.get('selecteddate');
        // alert("date"+this.selecteddate)
        this.date = new Date(this.selecteddate);
        var demo = this.date.toString();
        // alert("new demo"+demo)
        //   alert("new split date"+demo)
        // alert("split"+demo.split(" "))
        var demo2 = demo.split(" ");
        // alert("day"+demo2[0])
        // alert("Month"+demo2[1])
        // alert("date"+demo2[2])
        // alert("year"+demo2[3])
        this.exactday = demo2[0];
        this.exactmonth = demo2[1];
        this.exactdate = demo2[2];
        this.exactyear = demo2[3];
        // this.totalstartime=this.starttime+':'+this.starttime2;
        // alert("hello total"+this.totalstartime)
    }
    ConfirmDetails.prototype.checkout = function () {
        // if(this.onlinebooking==0){
        this.withoutpaymentbooking();
        // }
        // else{
        //  this.withpaymentbooking()  
        //    this.openactionsheet()
        // }
    };
    // openactionsheet(){
    //   let actionSheet = this.actionSheetCtrl.create({
    //       title: 'Select Payment Mode',
    //       buttons: [
    //         {
    //           text: 'Pay Online',
    //           icon:'logo-usd',
    //           cssClass: 'EditionIcon',
    //           handler: () => {
    //             this.withpaymentbooking()  
    //             // this.paypalpayment()
    //           }
    //         },{
    //           text: 'Pay Later',
    //           icon:'cash',
    //           handler: () => {
    //             this.withoutpaymentbooking()
    //           }
    //         },{
    //           text: 'Cancel',
    //           icon:'close-circle',
    //           role: 'cancel',
    //           handler: () => {
    //             console.log('Cancel clicked');
    //           }
    //         }
    //       ]
    //     });
    //     actionSheet.present();
    // }
    ConfirmDetails.prototype.withoutpaymentbooking = function () {
        var _this = this;
        this.paystatus = 0;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.paymentsuccess(_this.note, _this.bookingid, _this.transactionid, _this.transsactionstatus, _this.totalcostcalculated, _this.salonid, _this.employeeid, _this.onlinebooking, _this.paystatus); })
            .subscribe(function (data) {
            loading.dismiss().then(function () {
                _this.payresponse = data;
                if (_this.payresponse.message == "Payment info saved Successfully") {
                    _this.orderid = _this.payresponse.data.order_id;
                    _this.transactionid2 = _this.payresponse.data.transaction_id;
                    _this.paymentdate = _this.payresponse.data.payment_date;
                    _this.paymenttime = _this.payresponse.data.payment_time;
                    _this.totalamount = _this.payresponse.data.total_amount;
                    _this.navCtrl.push('CustomerWithoutPaymentPage', { salonname: _this.salonname });
                }
                else {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Something went wrong!',
                        subTitle: 'Payment unsuccessful',
                        buttons: ['OK']
                    });
                    alert_1.present();
                }
            }),
                function (error) {
                    return loading.dismiss().then(function () {
                        var alert = _this.alertCtrl.create({
                            title: 'Something Went Wrong',
                            subTitle: 'Please Try Again',
                            buttons: ['Ok']
                        });
                        alert.present();
                    });
                };
        });
    };
    // withpaymentbooking(){
    //   var cost=this.totalcostcalculated.toString()
    //   // alert("cost hai"+cost)
    //   //  if (typeof cost === "string") {
    //   //    alert("hello String")
    //   //    alert("cost"+cost)
    //   //   }
    // this.payPal.init({
    //   PayPalEnvironmentProduction:"EHAcM2INSj9ek0nFpvo407Lm6HAVMKek2IJ5Ogg-oAYUV_GHYn8SOluvJkEeQIgMXAJhU40zB1u8OYUL",
    //   PayPalEnvironmentSandbox: "Ae_SllVss8pETOKsGsePBiQXLrQHEJ_nTLplLsgw2mjpzheo4ykCzrXX7gyBvlM6rWPul7YOUoMKQEoO"
    // }).then(() => {
    //   // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
    //   this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
    //     // Only needed if you get an "Internal Service Error" after PayPal login!
    //     //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
    //   })).then(() => {
    //     let payment = new PayPalPayment(cost, 'USD', 'Description', 'sale');
    //     this.payPal.renderSinglePaymentUI(payment).then((data) => {
    //       // alert("hello data"+JSON.stringify(data))
    //       // alert("hello payment"+JSON.stringify(payment))
    //         localStorage['client_environment']=data.client.environment;
    //         localStorage['payment_state']=data.response.state;
    //         localStorage['response_type']=data.response_type;
    //         localStorage['response_id']=data.response.id;
    //         localStorage['create_time']=data.create_time;
    //                this.clientenv=localStorage['client_environment']
    //                this.responsetype=  localStorage['response_type']
    //                this.transactionid= localStorage['response_id']
    //                this.createtime= localStorage['create_time']
    //                this.transsactionstatus=localStorage['payment_state']
    //          this.paypalpayment();
    //     }, (error) => {
    //           // alert(error)
    //           let alert = this.alertCtrl.create({
    //               title: 'Something went wrong!',
    //               subTitle: 'Payment unsuccessful',
    //               buttons: ['OK']
    //              });
    //         alert.present();
    //       // Error or render dialog closed without being successful
    //     });
    //   }, (error) => {
    //     // Error in configuration
    //      // alert(error)
    //        let alert = this.alertCtrl.create({
    //               title: 'Something went wrong!',
    //               subTitle: 'Payment unsuccessful',
    //               buttons: ['OK']
    //              });
    //         alert.present();
    //   });
    // }, (error) => {
    //    // alert(error)
    //      let alert = this.alertCtrl.create({
    //               title: 'Something went wrong!',
    //               subTitle: 'Payment unsuccessful',
    //               buttons: ['OK']
    //              });
    //         alert.present();
    //   // Error in initialization, maybe PayPal isn't supported or something else
    // });
    // }
    ConfirmDetails.prototype.paypalpayment = function () {
        var _this = this;
        this.onlinebooking = 1;
        this.paystatus = 1;
        // alert(JSON.stringify(this.transactionid))
        // alert(JSON.stringify(this.transsactionstatus))
        // alert(JSON.stringify(this.bookingid))
        // alert(JSON.stringify(this.totalcost))
        // this.transactionid='PAY-1AB23456CD789012EF34GHIJ';
        // this.transsactionstatus='approved';
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.paymentsuccess(_this.note, _this.bookingid, _this.transactionid, _this.transsactionstatus, _this.totalcostcalculated, _this.salonid, _this.employeeid, _this.onlinebooking, _this.paystatus); })
            .subscribe(function (data) {
            loading.dismiss().then(function () {
                _this.payresponse = data;
                if (_this.payresponse.message == "Payment info saved Successfully") {
                    _this.orderid = _this.payresponse.data.order_id;
                    _this.transactionid2 = _this.payresponse.data.transaction_id;
                    _this.paymentdate = _this.payresponse.data.payment_date;
                    _this.paymenttime = _this.payresponse.data.payment_time;
                    _this.totalamount = _this.payresponse.data.total_amount;
                    _this.navCtrl.push('CustomerAfterPayment', { orderid: _this.orderid,
                        transactionid: _this.transactionid2, paymentdate: _this.paymentdate,
                        paymenttime: _this.paymenttime, totalamount: _this.totalamount,
                        salonname: _this.salonname, salonid: _this.salonid });
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'Something went wrong!',
                        subTitle: 'Payment unsuccessful',
                        buttons: ['OK']
                    });
                    alert_2.present();
                }
            }), function (error) {
                return loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        title: 'SERVER ERROR',
                        subTitle: 'Please Try Again',
                        buttons: ['Ok']
                    });
                    alert.present();
                });
            };
        });
    };
    ConfirmDetails.prototype.addzero = function (min) {
        if (min == '0') {
            return '00';
        }
        else {
            return min;
        }
    };
    ConfirmDetails.prototype.addzero3 = function (min) {
        if (min == '0') {
            return '00';
        }
        else {
            return min;
        }
    };
    ConfirmDetails.prototype.addzero2 = function (min) {
        //alert(min)
        if (min < 10) {
            var a = '0' + min;
            // alert(a)
            return a;
        }
        else {
            return min;
        }
    };
    ConfirmDetails.prototype.add = function (a, b) {
        return a + b;
    };
    ConfirmDetails.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.CustomerAppointmentByServices(_this.servicesselected); })
            .subscribe(function (data) {
            loading.dismiss().then(function () {
                _this.multipleserresponse = data;
                _this.multipleservice = _this.multipleserresponse.servicedata;
                var costdata = 0;
                for (var i = 0; i < _this.multipleservice.length; i++) {
                    costdata = costdata + _this.multipleservice[i].cost;
                    console.log("total value" + JSON.stringify(costdata));
                    _this.totalcostcalculated = costdata;
                }
                console.log("hello" + JSON.stringify(_this.multipleserresponse));
            }),
                function (error) {
                    return loading.dismiss().then(function () {
                        var alert = _this.alertCtrl.create({
                            title: 'SERVER ERROR',
                            subTitle: 'Please Try Again',
                            buttons: ['Ok']
                        });
                        alert.present();
                    });
                };
        });
    };
    ConfirmDetails = __decorate([
        IonicPage(),
        Component({
            selector: 'page-confirm-details',
            templateUrl: 'confirm-details.html',
        }),
        __metadata("design:paramtypes", [NavController,
            PayPal,
            ActionSheetController,
            DataService,
            AlertController,
            NavParams,
            LoadingController])
    ], ConfirmDetails);
    return ConfirmDetails;
}());
export { ConfirmDetails };
//# sourceMappingURL=confirm-details.js.map