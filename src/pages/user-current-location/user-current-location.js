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
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
/**
 * Generated class for the UserCurrentLocation page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var UserCurrentLocation = /** @class */ (function () {
    function UserCurrentLocation(navCtrl, http, navParams, locationAccuracy, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.locationAccuracy = locationAccuracy;
        this.geolocation = geolocation;
        this.markers = [];
        this.http = http;
    }
    UserCurrentLocation.prototype.ngOnInit = function () {
        var _this = this;
        this.request();
        this.geolocation.getCurrentPosition().then(function (resp) {
            console.log(resp.coords.latitude);
            console.log(resp.coords.longitude);
            _this.userlat = resp.coords.latitude;
            _this.userlng = resp.coords.longitude;
            var mapEle = document.getElementById('map1');
            _this.map = new google.maps.Map(mapEle, {
                center: { lat: resp.coords.latitude, lng: resp.coords.longitude },
                zoom: 11,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            google.maps.event.addListenerOnce(_this.map, 'idle', function () {
                mapEle.classList.add('show-map');
                google.maps.event.trigger(mapEle, 'resize');
            });
            var marker = new google.maps.Marker({
                map: _this.map,
                animation: google.maps.Animation.DROP,
                position: { lat: resp.coords.latitude, lng: resp.coords.longitude },
                title: 'Uluru (Ayers Rock)'
            });
            marker.addListener('click', function () {
                infowindow.open(_this.map, marker);
            });
            var infowindow = new google.maps.InfoWindow({
                content: 'My Location'
            });
        });
        this.getdetails();
    };
    UserCurrentLocation.prototype.getdetails = function () {
        var _this = this;
        this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=30.9521287,75.84757400000001&key=AIzaSyBbF06Yti3oXfKuVANv2o8fKvue86cBMz0")
            .map(function (response) { return response.json(); })
            .subscribe(function (getplaceData) {
            _this.place = getplaceData;
            // console.log("get details"+JSON.stringify(this.place))
            // console.log("i got place id yeee " +  JSON.stringify(this.place['results'][0]['place_id']));
            // console.log("i got place details  " +JSON.stringify(this.place.results[3].address_components[0].long_name));
        });
    };
    UserCurrentLocation.prototype.request = function () {
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
    UserCurrentLocation = __decorate([
        IonicPage(),
        Component({
            selector: 'page-user-current-location',
            templateUrl: 'user-current-location.html',
        }),
        __metadata("design:paramtypes", [NavController,
            Http, NavParams,
            LocationAccuracy,
            Geolocation])
    ], UserCurrentLocation);
    return UserCurrentLocation;
}());
export { UserCurrentLocation };
//# sourceMappingURL=user-current-location.js.map