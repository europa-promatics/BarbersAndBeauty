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
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
/**
 * Generated class for the CustomerBookings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CustomerBookings = /** @class */ (function () {
    function CustomerBookings(payPal, navCtrl, loadingCtrl, dataservice, navParams, alertCtrl) {
        this.payPal = payPal;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.dataservice = dataservice;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.bookings = "upcoming";
        this.past = 'false';
        this.up = 'false';
    }
    CustomerBookings.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomerBookings');
    };
    CustomerBookings.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.CustomerbookingList(); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.bookingdata = data;
                _this.upcomingdata = _this.bookingdata.upcominginfo.reverse();
                _this.pastdata = _this.bookingdata.pastinfo.reverse();
                _this.cancelinfo = _this.bookingdata.cancelinfo.reverse();
                _this.currentdata = _this.bookingdata.currentinfo.reverse();
                _this.salon_payment_status = _this.currentdata.online_booking;
                // alert("past data"+this.pastdata)
                // alert("upcoming data"+this.upcomingdata)
                // alert("pic"+JSON.stringify(this.currentdata[0].employee_image))
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
                    title: 'Something Went Wrong',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                alert.present();
            });
        });
    };
    CustomerBookings.prototype.pay = function (payment_id, cost, salonname, salonid, online_payment_status) {
        var _this = this;
        this.salon_payment_status = online_payment_status;
        if (this.salon_payment_status == 1) {
            // alert("cost"+cost)
            var total = cost.toString();
            //   if (typeof total === "string") {
            //  alert("gggggcost"+cost)
            // }
            this.payPal.init({
                PayPalEnvironmentProduction: "EHAcM2INSj9ek0nFpvo407Lm6HAVMKek2IJ5Ogg-oAYUV_GHYn8SOluvJkEeQIgMXAJhU40zB1u8OYUL",
                PayPalEnvironmentSandbox: "Ae_SllVss8pETOKsGsePBiQXLrQHEJ_nTLplLsgw2mjpzheo4ykCzrXX7gyBvlM6rWPul7YOUoMKQEoO"
            }).then(function () {
                // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
                _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({})).then(function () {
                    var payment = new PayPalPayment(total, 'USD', 'Description', 'sale');
                    _this.payPal.renderSinglePaymentUI(payment).then(function (data) {
                        // alert("hello data"+JSON.stringify(data))
                        // alert("hello payment"+JSON.stringify(payment))
                        localStorage['client_environment'] = data.client.environment;
                        localStorage['payment_state'] = data.response.state;
                        localStorage['response_type'] = data.response_type;
                        localStorage['response_id'] = data.response.id;
                        localStorage['create_time'] = data.create_time;
                        _this.clientenv = localStorage['client_environment'];
                        _this.responsetype = localStorage['response_type'];
                        _this.transactionid = localStorage['response_id'];
                        _this.createtime = localStorage['create_time'];
                        _this.transsactionstatus = localStorage['payment_state'];
                        _this.paycost(payment_id, total, salonname, salonid);
                        // Successfully paid
                        // Example sandbox response
                        //
                        // {
                        //   "client": {
                        //     "environment": "sandbox",
                        //     "product_name": "PayPal iOS SDK",
                        //     "paypal_sdk_version": "2.16.0",
                        //     "platform": "iOS"
                        //   },
                        //   "response_type": "payment",
                        //   "response": {
                        //     "id": "PAY-1AB23456CD789012EF34GHIJ",
                        //     "state": "approved",
                        //     "create_time": "2016-10-03T13:33:33Z",
                        //     "intent": "sale"
                        //   }
                        // }
                    }, function (error) {
                        alert(error);
                        // Error or render dialog closed without being successful
                    });
                }, function (error) {
                    // Error in configuration
                    alert(error);
                });
            }, function (error) {
                alert(error);
                // Error in initialization, maybe PayPal isn't supported or something else
            });
        }
        else if (this.salon_payment_status == 0) {
            var alert_1 = this.alertCtrl.create({
                title: 'Oops',
                subTitle: 'Shop Owner Does Not Accept Online Payments. ',
                buttons: ['Ok']
            });
            alert_1.present();
        }
    };
    CustomerBookings.prototype.cancelbooking = function (payment_id, bookingdata) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Cancel',
            message: 'Do you want to Cancel this Booking?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.cancel(payment_id);
                    }
                }
            ]
        });
        alert.present();
    };
    CustomerBookings.prototype.cancel = function (payment_id) {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.CancelBooking(payment_id); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.canceldata = data;
                _this.cancelstatus = _this.canceldata.status;
                if (_this.cancelstatus == 2) {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'Alert!',
                        subTitle: 'Booking Cancelled Successfully',
                        buttons: [{
                                text: 'Ok',
                                role: 'cancel',
                                handler: function () {
                                    console.log('Cancel clicked');
                                    _this.ngOnInit();
                                }
                            },]
                    });
                    alert_2.present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'SERVER ERROR',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                loading.dismiss();
                alert.present();
            });
        });
    };
    CustomerBookings.prototype.paycost = function (payment_id, total, salonname, salonid) {
        // this.transactionid='PAY-1AB23456CD789012EF34GHIJ';
        // this.transsactionstatus='approved';
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.pendingpayment(payment_id, total, _this.transactionid, _this.transsactionstatus); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.paymenttdata = data;
                _this.paymentstatus = _this.paymenttdata.status;
                if (_this.paymentstatus == 1) {
                    _this.orderid = _this.paymenttdata.paymentdata.order_id;
                    _this.transactionid2 = _this.paymenttdata.paymentdata.transaction_id;
                    _this.paymentdate = _this.paymenttdata.paymentdata.payment_date;
                    _this.paymenttime = _this.paymenttdata.paymentdata.payment_time;
                    _this.totalamount = _this.paymenttdata.paymentdata.cost;
                    _this.navCtrl.setRoot('PendingPaymentSuccessPage', { orderid: _this.orderid,
                        transactionid: _this.transactionid2, paymentdate: _this.paymentdate,
                        paymenttime: _this.paymenttime, totalamount: _this.totalamount,
                        salonname: salonname, salonid: salonid });
                }
                else {
                    var alert_3 = _this.alertCtrl.create({
                        title: 'Something went wrong!',
                        subTitle: 'Payment unsuccessful',
                        buttons: ['OK']
                    });
                    alert_3.present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'SERVER ERROR',
                    subTitle: 'Something went wrong',
                    buttons: ['OK']
                });
                alert.present();
            });
        });
    };
    CustomerBookings = __decorate([
        IonicPage(),
        Component({
            selector: 'page-customer-bookings',
            templateUrl: 'customer-bookings.html',
        }),
        __metadata("design:paramtypes", [PayPal, NavController, LoadingController,
            DataService, NavParams, AlertController])
    ], CustomerBookings);
    return CustomerBookings;
}());
export { CustomerBookings };
//# sourceMappingURL=customer-bookings.js.map