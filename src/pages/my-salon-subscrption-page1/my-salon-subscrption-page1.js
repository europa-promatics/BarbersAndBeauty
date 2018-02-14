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
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
/**
 * Generated class for the MySalonSubscrptionPage1 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MySalonSubscrptionPage1 = /** @class */ (function () {
    function MySalonSubscrptionPage1(navCtrl, navParams, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.mysubscribe_first_date = localStorage['my_register_date'];
        // alert(this.mysubscribe_first_date)
    }
    MySalonSubscrptionPage1.prototype.purchase_plan = function () {
        this.navCtrl.push('MySalonSubscrptionPage2');
    };
    MySalonSubscrptionPage1.prototype.ionViewDidLoad = function () {
    };
    MySalonSubscrptionPage1.prototype.ngOnInit = function () {
        var someDate = new Date(this.mysubscribe_first_date);
        var todayDate = new Date();
        var numberOfDaysToAdd = 30;
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
        var dd = someDate.getDate();
        var mymonth = someDate.getMonth() + 1;
        var mm = someDate.getMonth() + 1;
        var y = someDate.getFullYear();
        var today = todayDate.getDate();
        var todaymonth = todayDate.getMonth() + 1;
        var todayyear = todayDate.getFullYear();
        // var someFormattedDate = dd + '/'+ mm + '/'+ y;
        var someFormattedDate = y + '/' + mm + '/' + dd;
        var subscrptn_currentdate = todayyear + '/' + todaymonth + '/' + today;
        this.mycurrentdate = subscrptn_currentdate;
        this.myfinalsubscriptiondate = someFormattedDate;
        // alert("final hai date"+ this.myfinalsubscriptiondate)
        // alert( 'aaj ke date'+this.mycurrentdate)
        // this.mysubscrption_date = mm + '/'+ dd + '/'+ y;
        this.mysubscrption_date = y + '/' + mm + '/' + dd;
        // alert("first date"+ this.mycurrentdate )
        // alert("jo chaiye vo date"+this.mysubscrption_date)
        // var result = new Date(date);
        //  result.setDate(result.getDate() + days);
        //  return result;
        // if(this.mysubscrption_date!=null)
        var date1 = new Date(this.mycurrentdate);
        var date2 = new Date(this.myfinalsubscriptiondate);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        this.remaining_days = diffDays;
        // alert(this.remaining_days)
    };
    MySalonSubscrptionPage1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-my-salon-subscrption-page1',
            templateUrl: 'my-salon-subscrption-page1.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Events])
    ], MySalonSubscrptionPage1);
    return MySalonSubscrptionPage1;
}());
export { MySalonSubscrptionPage1 };
//# sourceMappingURL=my-salon-subscrption-page1.js.map