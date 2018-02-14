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
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
/**
 * Generated class for the NearBySalon page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var NearBySalon = /** @class */ (function () {
    function NearBySalon(navCtrl, navParams, geolocation, http, alertCtrl, loadingCtrl, locationAccuracy) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.locationAccuracy = locationAccuracy;
        this.markers = [];
        this.arr = [];
        this.ar = [];
        this.i = 0;
        this.j = 0;
        this.http = http;
        this.data = {};
        this.posts = '';
        this.guest_account = localStorage['auth'];
        this.request();
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        console.log("userid" + this.userid);
        this.geolocation.getCurrentPosition().then(function (position) {
            console.log("position data" + JSON.stringify(position));
            loader.dismiss();
            console.log("current latitude " + JSON.stringify(position.coords.latitude));
            console.log("current longitute " + JSON.stringify(position.coords.longitude));
            _this.lat = position.coords.latitude;
            _this.lng = position.coords.longitude;
            var mapEle = document.getElementById('map3');
            _this.map = new google.maps.Map(mapEle, {
                center: { lat: position.coords.latitude, lng: position.coords.longitude },
                zoom: 11,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            google.maps.event.addListenerOnce(_this.map, 'idle', function () {
                mapEle.classList.add('show-map');
                google.maps.event.trigger(mapEle, 'resize');
            });
            // this.salonmarker();
            _this.usermarker(position.coords.latitude, position.coords.longitude);
            _this.currentposlat = position.coords.latitude;
            _this.currentposlng = position.coords.longitude;
            _this.DefaultRange(position.coords.latitude, position.coords.longitude);
        }, function (err) {
            console.log(err);
        });
    }
    NearBySalon.prototype.ngOnInit = function () {
    };
    NearBySalon.prototype.usermarker = function (a, b) {
        if (a && b) {
            var marker = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: { lat: a, lng: b },
            });
        }
    };
    NearBySalon.prototype.Range = function () {
        var _this = this;
        // alert(this.nearbyrange);
        var nearbylat = [];
        var nearbylng = [];
        var nearbyslname = [];
        var lt = 0;
        var lg = 0;
        var nm = 0;
        this.userid;
        // this.userlat=this.currentposlat;
        // this.userlng= this.currentposlng;
        this.nearbyrange;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        var link = 'http://gagandeepsethi.com/salonDirectory/WebServices/nearDistance.json';
        var data = JSON.stringify({
            Userid: localStorage['customerid'],
            latitude: this.currentposlat,
            longitude: this.currentposlng,
            radius: this.nearbyrange
        });
        this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loader.dismiss().then(function () {
                _this.filterrange = data;
                if (_this.filterrange.message == "There is no salon near about you") {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Oops!',
                        subTitle: 'No Salon Exists Near Your Area',
                        buttons: ['ok']
                    });
                    alert_1.present();
                }
                else {
                    // console.log("filter data"+JSON.stringify(this.filterrange))
                    for (var _i = 0, _a = _this.filterrange.saloninfo; _i < _a.length; _i++) {
                        var nearbydata = _a[_i];
                        nearbylat[lt] = nearbydata.latitude;
                        nearbylng[lg] = nearbydata.longitude;
                        nearbyslname[nm] = nearbydata.salonname;
                        // console.log("near by lat lng"+JSON.stringify(nearbylat[lt]+' '+nearbylng[lg]))
                        var nearbylatLng = new google.maps.LatLng(nearbylat[lt], nearbylng[lg]);
                        var marker = new google.maps.Marker({
                            map: _this.map,
                            animation: google.maps.Animation.DROP,
                            // position: {lat:a, lng: b}
                            position: nearbylatLng,
                            icon: 'assets/icon/place.png'
                        });
                        _this.markers.push(marker);
                    }
                }
            }),
                function (error) {
                    return loader.dismiss().then(function () {
                        var alert = _this.alertCtrl.create({
                            title: 'Timeout',
                            subTitle: 'Please Try Again',
                            buttons: ['Ok']
                        });
                        loader.dismiss();
                        alert.present();
                    });
                };
        });
    };
    NearBySalon.prototype.request = function () {
        var _this = this;
        this.locationAccuracy.canRequest().then(function (canRequest) {
            if (canRequest) {
                _this.locationAccuracy.request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function () {
                    console.log('Request successful.');
                    // alert("request Success")
                }, function (error) {
                    console.log('Error requesting location permissions', error);
                    // alert("request fail")
                });
            }
        });
    };
    NearBySalon.prototype.DefaultRange = function (customer_lat, customer_lng) {
        var _this = this;
        var nearbylat = [];
        var nearbylng = [];
        var nearbyslname = [];
        var lt = 0;
        var lg = 0;
        var nm = 0;
        this.userid;
        // this.userlat=this.currentposlat;
        // this.userlng= this.currentposlng;
        this.nearbyrange;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        var link = 'http://gagandeepsethi.com/salonDirectory/WebServices/nearDistance.json';
        var data = JSON.stringify({
            Userid: localStorage['customerid'],
            latitude: customer_lat,
            longitude: customer_lng,
            radius: 30
        });
        this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loader.dismiss().then(function () {
                _this.filterrange = data;
                console.log("filter data" + JSON.stringify(_this.filterrange));
                for (var _i = 0, _a = _this.filterrange.saloninfo; _i < _a.length; _i++) {
                    var nearbydata = _a[_i];
                    nearbylat[lt] = nearbydata.latitude;
                    nearbylng[lg] = nearbydata.longitude;
                    nearbyslname[nm] = nearbydata.salonname;
                    console.log("near by lat lng" + JSON.stringify(nearbylat[lt] + ' ' + nearbylng[lg]));
                    var nearbylatLng = new google.maps.LatLng(nearbylat[lt], nearbylng[lg]);
                    var marker = new google.maps.Marker({
                        map: _this.map,
                        animation: google.maps.Animation.DROP,
                        // position: {lat:a, lng: b}
                        position: nearbylatLng,
                        icon: 'assets/icon/place.png'
                    });
                    _this.markers.push(marker);
                }
            }),
                function (error) {
                    return loader.dismiss().then(function () {
                        var alert = _this.alertCtrl.create({
                            title: 'Timeout',
                            subTitle: 'Please Try Again',
                            buttons: ['Ok']
                        });
                        loader.dismiss();
                        alert.present();
                    });
                };
        });
    };
    NearBySalon = __decorate([
        IonicPage(),
        Component({
            selector: 'page-near-by-salon',
            templateUrl: 'near-by-salon.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Geolocation, Http, AlertController,
            LoadingController, LocationAccuracy])
    ], NearBySalon);
    return NearBySalon;
}());
export { NearBySalon };
//# sourceMappingURL=near-by-salon.js.map