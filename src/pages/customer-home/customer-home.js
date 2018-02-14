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
import { Http } from '@angular/http';
import { LoadingController, AlertController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { Observable } from "rxjs/Rx";
import { LocationAccuracy } from '@ionic-native/location-accuracy';
/**
 * Generated class for the CustomerHome page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CustomerHome = /** @class */ (function () {
    function CustomerHome(navCtrl, locationAccuracy, loadingCtrl, dataservice, alertCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.locationAccuracy = locationAccuracy;
        this.loadingCtrl = loadingCtrl;
        this.dataservice = dataservice;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.http = http;
        this.data = {};
        this.category = this.navParams.get('categoryselected');
        this.categoryid = this.navParams.get('categoryid');
        this.directory = localStorage['directory'];
        this.show_favourite = localStorage['auth'];
        this.nosalon = 'false';
    }
    CustomerHome.prototype.getItems = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.salonlist = this.salonlist.filter(function (p) {
                return (p.salon_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            this.salonlist = this.updatedsalonlist;
        }
    };
    CustomerHome.prototype.ngOnInit = function () {
        var _this = this;
        this.asklocation();
        var loading = this.loadingCtrl.create({ content: 'Loading...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.CustomerSalonList(_this.categoryid); })
            .subscribe(function (data) {
            loading.dismiss().then(function () {
                _this.saloninfo = data;
                if (_this.saloninfo.status == 1) {
                    // console.log("salondetails info"+JSON.stringify(this.saloninfo.data));
                    _this.salonlist = _this.saloninfo.data.reverse();
                    _this.updatedsalonlist = _this.saloninfo.data;
                    _this.averageratingdata = _this.saloninfo.averagerating;
                    console.log("salon services" + JSON.stringify(_this.salonservices));
                }
                else if (_this.saloninfo.status == 0) {
                    // alert("no Salon")
                    _this.nosalon = 'true';
                }
            }),
                function (error) {
                    return loading.dismiss().then(function () {
                        var alert = _this.alertCtrl.create({
                            title: 'SERVER ERROR',
                            subTitle: 'Please Try Again',
                            buttons: ['Ok']
                        });
                        loading.dismiss();
                        alert.present();
                    });
                };
        });
    };
    // doRefresh(refresher) {
    //    console.log('Begin async operation', refresher);
    // this.http.get('http://gagandeepsethi.com/salonDirectory/WebServices/customerSideSalonListing.json') 
    //      .map(response => response.json())
    //     .subscribe(data=>{       
    //       this.saloninfo = data;
    //        // console.log("salondetails"+JSON.stringify(this.saloninfo.data));
    //        this.salonlist=this.saloninfo.data.reverse();
    //        this.updatedsalonlist=this.saloninfo.data;
    //        console.log("salon services"+JSON.stringify(this.salonservices))
    //     });    
    //    setTimeout(() => {
    //      console.log('Async operation has ended');
    //      refresher.complete();
    //    }, 2000);
    //  }
    CustomerHome.prototype.detail = function (id, salonimage, salonname, salonlat, salonlng) {
        // alert("hello salonid"+id)
        localStorage['lat'] = salonlat;
        localStorage['lng'] = salonlng;
        this.navCtrl.push('Customersalondetail', { salondetail: id, salonimg: salonimage, salonname: salonname });
    };
    CustomerHome.prototype.near = function () {
        this.navCtrl.push('NearBySalon');
    };
    CustomerHome.prototype.Favlist = function () {
        this.navCtrl.push('CustomerFavSalon');
    };
    CustomerHome.prototype.asklocation = function () {
        var _this = this;
        this.locationAccuracy.canRequest().then(function (canRequest) {
            if (canRequest) {
                _this.locationAccuracy.request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function () {
                    console.log('Request successful.');
                    // alert("request Granted")
                }, function (error) {
                    console.log('Error requesting location permissions', error);
                    // alert("request fail")
                    var alert = _this.alertCtrl.create({
                        title: 'Error!',
                        subTitle: 'Requesting location permissions',
                        buttons: ['ok']
                    });
                    alert.present();
                });
            }
        });
    };
    CustomerHome = __decorate([
        IonicPage(),
        Component({
            selector: 'page-customer-home',
            templateUrl: 'customer-home.html',
        }),
        __metadata("design:paramtypes", [NavController,
            LocationAccuracy,
            LoadingController,
            DataService,
            AlertController,
            NavParams, Http])
    ], CustomerHome);
    return CustomerHome;
}());
export { CustomerHome };
//# sourceMappingURL=customer-home.js.map