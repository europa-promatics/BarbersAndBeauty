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
var CustomerNotification = /** @class */ (function () {
    function CustomerNotification(navCtrl, payPal, navParams, dataservice, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.payPal = payPal;
        this.navParams = navParams;
        this.dataservice = dataservice;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.nodata = 'false';
        this.nodecline = 'false';
        this.Notiseg = "accepted";
        this.currentdate = new Date();
        // alert("hello"+this.currentdate)
        // alert("hours"+this.currentdate.getHours())
        // alert("minutes"+this.currentdate.getMinutes())
        this.currenttime = this.currentdate.getHours() + ':' + this.currentdate.getMinutes();
        // alert("current Time"+this.currenttime)
    }
    CustomerNotification.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomerNotification');
    };
    CustomerNotification.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.dataservice.setNotificationSeen(localStorage['customerid']).subscribe(function (data) {
        }, function (err) {
        });
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.CustomerNotification(); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.notification = data;
                if (_this.notification.status == 1) {
                    _this.notificationdata = _this.notification.Accept.reverse();
                    console.log("accept" + _this.notificationdata);
                    // this.declined=this.notification.decline.reverse();
                    if (_this.notificationdata == '' || _this.notificationdata == null || _this.notificationdata == []) {
                        _this.nodata = 'true';
                    }
                    // if(this.declined=='' ||  this.declined==null ||  this.declined==[]){
                    //     this.nodecline='true' 
                    // }
                }
                else {
                    _this.nodata = 'true';
                    _this.nodecline = 'true';
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
    CustomerNotification.prototype.getStyle = function (colorstatus) {
        if (colorstatus == 0) {
            var styles = {
                'background-color': '#fff',
                'color': '#222'
            };
            return styles;
        }
        else {
            var styles = {
                'background-color': '#3B5988',
                'color': '#fff'
            };
            return styles;
        }
    };
    CustomerNotification.prototype.selectedtime = function (i, paymentid) {
        // var v = 'var_' + i;
        //  var x = document.getElementById(v);
        //  x.style.background = "#FFFFFF";
        //   x.style.color = "#222222";
        this.changecolor(paymentid);
    };
    CustomerNotification.prototype.changecolor = function (paymentid) {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.Changenotificationcolor(paymentid); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.colordata = data;
                // this.navCtrl.push('CustomerBookings')
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
    CustomerNotification.prototype.pay = function (payment_id, cost, online_booking_staus) {
        var _this = this;
        if (online_booking_staus == 0) {
            var alert_1 = this.alertCtrl.create({
                title: 'Oops',
                subTitle: 'Shop Owner Does Not Accept Online Payment',
                buttons: ['Ok']
            });
            alert_1.present();
        }
        else {
            this.payPal.init({
                PayPalEnvironmentProduction: "EHAcM2INSj9ek0nFpvo407Lm6HAVMKek2IJ5Ogg-oAYUV_GHYn8SOluvJkEeQIgMXAJhU40zB1u8OYUL",
                PayPalEnvironmentSandbox: "Ae_SllVss8pETOKsGsePBiQXLrQHEJ_nTLplLsgw2mjpzheo4ykCzrXX7gyBvlM6rWPul7YOUoMKQEoO"
            }).then(function () {
                // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
                _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({})).then(function () {
                    var payment = new PayPalPayment(cost, 'USD', 'Description', 'sale');
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
                        _this.paycost(payment_id, cost);
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
                        // alert(error)
                        // Error or render dialog closed without being successful
                    });
                }, function (error) {
                    // Error in configuration
                    // alert(error)
                });
            }, function (error) {
                // alert(error)
                // Error in initialization, maybe PayPal isn't supported or something else
            });
        }
    };
    CustomerNotification.prototype.cancelbooking = function (payment_id, bookingdata) {
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
    CustomerNotification.prototype.cancel = function (payment_id) {
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
                                    _this.ionViewWillEnter();
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
    CustomerNotification.prototype.paycost = function (payment_id, cost) {
        // this.transactionid='PAY-1AB23456CD789012EF34GHIJ';
        // this.transsactionstatus='approved';
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.pendingpayment(payment_id, cost, _this.transactionid, _this.transsactionstatus); })
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
                        paymenttime: _this.paymenttime, totalamount: _this.totalamount });
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
    CustomerNotification = __decorate([
        IonicPage(),
        Component({
            selector: 'page-customer-notification',
            templateUrl: 'customer-notification.html',
        }),
        __metadata("design:paramtypes", [NavController,
            PayPal, NavParams,
            DataService, AlertController,
            LoadingController])
    ], CustomerNotification);
    return CustomerNotification;
}());
export { CustomerNotification };
//# sourceMappingURL=customer-notification.js.map