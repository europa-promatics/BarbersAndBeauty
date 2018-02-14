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
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { Observable } from "rxjs/Rx";
/**
 * Generated class for the CustomerCategories page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CustomerCategories = /** @class */ (function () {
    function CustomerCategories(alertCtrl, navCtrl, navParams, menu, dataservice, loadingCtrl) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataservice = dataservice;
        this.loadingCtrl = loadingCtrl;
        this.notification_count = 0;
        this.tilesdata = [
            { categoryname: 'BARBER', id: 1, categoryimage: 'assets/img/tiles1.jpg' },
            { categoryname: 'HAIR STYLIST', id: 2, categoryimage: 'assets/img/hair.jpg' },
            { categoryname: 'WEAVE AND EXTENSIONS SPECIALIST', id: 3, categoryimage: 'assets/img/wav.jpg' },
            { categoryname: 'MAKE UP ARTIST', id: 4, categoryimage: 'assets/img/makeup.jpg' },
            { categoryname: 'NAIL MANICURE AND PEDICURE', id: 5, categoryimage: 'assets/img/nails.jpg' },
            { categoryname: 'TATOO ARTIST', id: 6, categoryimage: 'assets/img/tatoo.jpg' },
            { categoryname: 'MASSAGE THERAPIST', id: 7, categoryimage: 'assets/img/massage.jpg' },
            { categoryname: 'OTHER SERVICES', id: 8, categoryimage: 'assets/img/other.jpg' },
        ];
        this.menu = menu;
        this.menu.enable(true, 'myMenu');
    }
    CustomerCategories.prototype.ionViewWillEnter = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.CustomerNotification(); })
            .subscribe(function (data) {
            loading.dismiss();
            if (data.status != 0) {
                _this.notification_count = data.booking_count;
            }
            else {
                _this.notification_count = 0;
            }
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
    CustomerCategories.prototype.notifications = function () {
        this.navCtrl.push('CustomerNotification');
    };
    // ngOnInit(){
    //    let loading = this.loadingCtrl.create({content: 'Please Wait...'});
    //        Observable.fromPromise(loading.present())
    //        .flatMap(data => this.dataservice.CategoryList())
    //        .subscribe(data =>
    //                   loading.dismiss().then(() =>{ 
    //                       this.tiles = data
    //                         this.tilesdata=this.tiles.categoryinfo;
    //                                               }),
    //                     error =>
    //                     loading.dismiss().then(() => {})
    //                   ); 
    // }
    CustomerCategories.prototype.list2 = function (category, id) {
        // alert("id"+id)
        this.navCtrl.push('CustomerHome', { categoryselected: category, categoryid: id });
    };
    CustomerCategories = __decorate([
        IonicPage(),
        Component({
            selector: 'page-customer-categories',
            templateUrl: 'customer-categories.html',
        }),
        __metadata("design:paramtypes", [AlertController,
            NavController,
            NavParams, MenuController, DataService,
            LoadingController])
    ], CustomerCategories);
    return CustomerCategories;
}());
export { CustomerCategories };
//# sourceMappingURL=customer-categories.js.map