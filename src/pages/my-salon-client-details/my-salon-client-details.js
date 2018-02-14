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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataService } from "../../providers/data-service";
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from "rxjs/Rx";
/**
 * Generated class for the MySalonClientDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MySalonClientDetailsPage = /** @class */ (function () {
    function MySalonClientDetailsPage(navCtrl, dataservice, navParams, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.dataservice = dataservice;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.segment = "booking_request";
        this.client_data = this.navParams.get('client_id_data');
        this.selected_services = this.navParams.get('our_services');
        this.customer_id = this.client_data.customer_id;
    }
    MySalonClientDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MySalonClientDetailsPage');
    };
    MySalonClientDetailsPage.prototype.ngOnInit = function () {
        // http://europa.promaticstechnologies.com/salonDirectory/img/salonimage
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading' });
        Observable.of(loading).flatMap(function (loading) { return loading.present(); })
            .flatMap(function (data) { return Observable.forkJoin(_this.dataservice.MySalonNotification(), _this.dataservice.get_appointment_data()); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.request_data = data[1];
                _this.my_request_data = _this.request_data.customerappointment;
                _this.cancel_data = data[0].cancelinfo;
                _this.accepted_data = data[0].accept;
            });
        }, function (error) {
            var alert = _this.alertCtrl.create({
                title: 'Timeout',
                buttons: ['Ok']
            });
            loading.dismiss();
            alert.present();
        });
    };
    MySalonClientDetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-my-salon-client-details',
            templateUrl: 'my-salon-client-details.html',
        }),
        __metadata("design:paramtypes", [NavController, DataService,
            NavParams, AlertController,
            LoadingController])
    ], MySalonClientDetailsPage);
    return MySalonClientDetailsPage;
}());
export { MySalonClientDetailsPage };
// {"employee_id":309,
// "employeename":"Jack",
// "customer_id":22,
// "customername":"MD ASIF",
// "customercontactnumber":"7500003388",
// "customeremail":"promatics.asif@gmail.com",
// "customer_profile_image":"7WwrC7.image.jpg",
// "total_amount":"11","service_id":"99",
// "starttime":"10:30","endtime":"11:45",
// "date":"2017-11-29",
// "service":[{"id":99,"salon_id":35,"title":"Cutting","description":"wqfq","time":"01:15","cost":"11"}]} 
//# sourceMappingURL=my-salon-client-details.js.map