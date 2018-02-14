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
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { DataService } from '../../providers/data-service';
import { Observable } from "rxjs/Rx";
/**
 * Generated class for the MySalonSubscrptionPage2 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MySalonSubscrptionPage2 = /** @class */ (function () {
    function MySalonSubscrptionPage2(navCtrl, alertCtrl, dataservice, navParams, loadingCtrl, payPal) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.dataservice = dataservice;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.payPal = payPal;
    }
    MySalonSubscrptionPage2.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MySalonSubscrptionPage2');
    };
    // salon_id,staffmember,transaction_id,transaction_amount
    MySalonSubscrptionPage2.prototype.purchase1 = function () {
        var _this = this;
        this.salon_id = localStorage['salonid'];
        this.payPal.init({
            PayPalEnvironmentProduction: 'EHAcM2INSj9ek0nFpvo407Lm6HAVMKek2IJ5Ogg-oAYUV_GHYn8SOluvJkEeQIgMXAJhU40zB1u8OYULEHAcM2INSj9ek0nFpvo407Lm6HAVMKek2IJ5Ogg-oAYUV_GHYn8SOluvJkEeQIgMXAJhU40zB1u8OYUL',
            PayPalEnvironmentSandbox: 'Ae_SllVss8pETOKsGsePBiQXLrQHEJ_nTLplLsgw2mjpzheo4ykCzrXX7gyBvlM6rWPul7YOUoMKQEoO'
        }).then(function () {
            // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
            _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({})).then(function () {
                var payment = new PayPalPayment('25', 'USD', 'Description', 'sale');
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
                    _this.paypalpayment(1, _this.salon_id, 25, _this.transactionid);
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
                }, function () {
                    // Error or render dialog closed without being successful
                });
            }, function () {
                // Error in configuration
            });
        }, function () {
            // Error in initialization, maybe PayPal isn't supported or something else
        });
    };
    MySalonSubscrptionPage2.prototype.purchase2 = function () {
        var _this = this;
        this.salon_id = localStorage['salonid'];
        this.payPal.init({
            PayPalEnvironmentProduction: 'EHAcM2INSj9ek0nFpvo407Lm6HAVMKek2IJ5Ogg-oAYUV_GHYn8SOluvJkEeQIgMXAJhU40zB1u8OYULEHAcM2INSj9ek0nFpvo407Lm6HAVMKek2IJ5Ogg-oAYUV_GHYn8SOluvJkEeQIgMXAJhU40zB1u8OYUL',
            PayPalEnvironmentSandbox: 'Ae_SllVss8pETOKsGsePBiQXLrQHEJ_nTLplLsgw2mjpzheo4ykCzrXX7gyBvlM6rWPul7YOUoMKQEoO'
        }).then(function () {
            // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
            _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({})).then(function () {
                var payment = new PayPalPayment('35', 'USD', 'Description', 'sale');
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
                    _this.paypalpayment(5, _this.salon_id, 35, _this.transactionid);
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
                }, function () {
                    // Error or render dialog closed without being successful
                });
            }, function () {
                // Error in configuration
            });
        }, function () {
            // Error in initialization, maybe PayPal isn't supported or something else
        });
    };
    MySalonSubscrptionPage2.prototype.purchase3 = function () {
        var _this = this;
        this.salon_id = localStorage['salonid'];
        this.payPal.init({
            PayPalEnvironmentProduction: 'EHAcM2INSj9ek0nFpvo407Lm6HAVMKek2IJ5Ogg-oAYUV_GHYn8SOluvJkEeQIgMXAJhU40zB1u8OYULEHAcM2INSj9ek0nFpvo407Lm6HAVMKek2IJ5Ogg-oAYUV_GHYn8SOluvJkEeQIgMXAJhU40zB1u8OYUL',
            PayPalEnvironmentSandbox: 'Ae_SllVss8pETOKsGsePBiQXLrQHEJ_nTLplLsgw2mjpzheo4ykCzrXX7gyBvlM6rWPul7YOUoMKQEoO'
        }).then(function () {
            // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
            _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({})).then(function () {
                var payment = new PayPalPayment('45', 'USD', 'Description', 'sale');
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
                    _this.paypalpayment(9, _this.salon_id, 45, _this.transactionid);
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
                }, function () {
                    // Error or render dialog closed without being successful
                });
            }, function () {
                // Error in configuration
            });
        }, function () {
            // Error in initialization, maybe PayPal isn't supported or something else
        });
    };
    MySalonSubscrptionPage2.prototype.purchase4 = function () {
        var _this = this;
        this.salon_id = localStorage['salonid'];
        this.payPal.init({
            PayPalEnvironmentProduction: 'EHAcM2INSj9ek0nFpvo407Lm6HAVMKek2IJ5Ogg-oAYUV_GHYn8SOluvJkEeQIgMXAJhU40zB1u8OYULEHAcM2INSj9ek0nFpvo407Lm6HAVMKek2IJ5Ogg-oAYUV_GHYn8SOluvJkEeQIgMXAJhU40zB1u8OYUL',
            PayPalEnvironmentSandbox: 'Ae_SllVss8pETOKsGsePBiQXLrQHEJ_nTLplLsgw2mjpzheo4ykCzrXX7gyBvlM6rWPul7YOUoMKQEoO'
        }).then(function () {
            // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
            _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({})).then(function () {
                var payment = new PayPalPayment('55', 'USD', 'Description', 'sale');
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
                    _this.paypalpayment(10, _this.salon_id, 55, _this.transactionid);
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
                }, function () {
                    // Error or render dialog closed without being successful
                });
            }, function () {
                // Error in configuration
            });
        }, function () {
            // Error in initialization, maybe PayPal isn't supported or something else
        });
    };
    MySalonSubscrptionPage2.prototype.paypalpayment = function (staff_member, salon_id, cost, transction_id) {
        var _this = this;
        this.staff_member = staff_member;
        // alert("staff"+this.staff_member)
        // alert("salonid"+this.salon_id)
        this.salon_id = salon_id;
        this.cost = cost;
        // alert("Cost"+this.cost)
        this.transction_id = transction_id;
        // alert("id"+this.transction_id)
        // alert(JSON.stringify(this.transactionid))
        // alert(JSON.stringify(this.transsactionstatus))
        // alert(JSON.stringify(this.bookingid))
        // alert(JSON.stringify(this.totalcost))
        // this.transactionid='PAY-1AB23456CD789012EF34GHIJ';
        this.transsactionstatus = 'approved';
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.subscription_plan(_this.salon_id, _this.staff_member, _this.transction_id, _this.cost); })
            .subscribe(function (data) {
            loading.dismiss();
            _this.payresponse = data;
            if (_this.payresponse.status == 1) {
                _this.navCtrl.push('MySalonSubscrptionPage3', { totalamount: _this.cost, transactionid: _this.transction_id, total_member: _this.staff_member });
                //  this.orderid=this.payresponse.data.order_id;
                //  this.transactionid2=this.payresponse.data.transaction_id;
                //  this.paymentdate=this.payresponse.data.payment_date;
                //  this.paymenttime=this.payresponse.data.payment_time;
                // this.totalamount=this.payresponse.data.total_amount;
                // this.navCtrl.push('CustomerAfterPayment',{orderid:this.orderid,
                //   transactionid:this.transactionid2,paymentdate:this.paymentdate,
                //   paymenttime:this.paymenttime,totalamount:this.totalamount})
            }
            else {
                if (_this.payresponse.status == 0) {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Something went wrong!',
                        subTitle: 'Payment unsuccessful',
                        buttons: ['OK']
                    });
                    alert_1.present();
                }
            }
        }),
            function (error) {
                var alert = _this.alertCtrl.create({
                    title: 'Something went wrong!',
                    subTitle: 'Payment unsuccessful',
                    buttons: ['OK']
                });
                alert.present();
            };
    };
    MySalonSubscrptionPage2 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-my-salon-subscrption-page2',
            templateUrl: 'my-salon-subscrption-page2.html',
        }),
        __metadata("design:paramtypes", [NavController, AlertController,
            DataService, NavParams,
            LoadingController,
            PayPal])
    ], MySalonSubscrptionPage2);
    return MySalonSubscrptionPage2;
}());
export { MySalonSubscrptionPage2 };
//# sourceMappingURL=my-salon-subscrption-page2.js.map