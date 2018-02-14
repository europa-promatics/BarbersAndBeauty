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
/**
 * Generated class for the AppointmentDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AppointmentDetailPage = /** @class */ (function () {
    function AppointmentDetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appointment_data = this.navParams.get('data');
        this.str = this.appointment_data.title;
        this.str2 = this.appointment_data.startTime;
        this.str3 = this.appointment_data.endTime;
        var splitted = this.str.split('-');
        // var splitted2 =this.str2.substring(0,4); 
        // alert('split2'+splitted2)
        // var splitted3 =this.str2.substring(5,9);
        // alert(splitted3) 
        var splitted3 = this.str.split('T');
        // this.appointment_date=splitted2[0]
        // this.appointment_date=splitted2[1]
        this.customer_name = splitted[0];
        this.service = splitted[1];
        this.employe_name = splitted[2];
    }
    AppointmentDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AppointmentDetailPage');
    };
    AppointmentDetailPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-appointment-detail-page',
            templateUrl: 'appointment-detail-page.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], AppointmentDetailPage);
    return AppointmentDetailPage;
}());
export { AppointmentDetailPage };
//# sourceMappingURL=appointment-detail-page.js.map