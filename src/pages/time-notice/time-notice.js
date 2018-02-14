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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
/**
 * Generated class for the TimeNotice page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var TimeNotice = /** @class */ (function () {
    function TimeNotice(navCtrl, navParams, viewctrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewctrl = viewctrl;
        this.time = [
            { mytime: "30 min" },
            { mytime: "1 hour" },
            { mytime: "2  hour" },
            { mytime: "3 hour" },
            { mytime: "24  hr" },
        ];
    }
    TimeNotice.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TimeNotice');
    };
    TimeNotice.prototype.cancel = function () {
        this.viewctrl.dismiss();
    };
    TimeNotice.prototype.accept = function () {
        this.viewctrl.dismiss({ value: this.selected_value });
    };
    TimeNotice = __decorate([
        IonicPage(),
        Component({
            selector: 'page-time-notice',
            templateUrl: 'time-notice.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController])
    ], TimeNotice);
    return TimeNotice;
}());
export { TimeNotice };
//# sourceMappingURL=time-notice.js.map