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
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the SalonAddressDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalonAddressDetails = /** @class */ (function () {
    function SalonAddressDetails(navCtrl, navParams, http, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.http = http;
        this.lat = this.navParams.get('lat');
        this.lng = this.navParams.get('lng');
    }
    SalonAddressDetails.prototype.ngOnInit = function () {
        var _this = this;
        console.log("details" + this.lat);
        console.log("details" + this.lng);
        this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.lat + ',' + this.lng + '&key=AIzaSyBbF06Yti3oXfKuVANv2o8fKvue86cBMz0')
            .map(function (response) { return response.json(); })
            .subscribe(function (getplaceData) {
            _this.place = getplaceData;
            _this.fulladdress = _this.place.results[0].formatted_address;
            _this.city = _this.place.results[0].address_components[0].long_name;
            _this.sublocality = _this.place.results[0].address_components[1].long_name;
            _this.district = _this.place.results[0].address_components[2].long_name;
            _this.state = _this.place.results[0].address_components[4].long_name;
            _this.country = _this.place.results[0].address_components[5].long_name;
            _this.postalcode = _this.place.results[3].address_components[0].long_name;
            // console.log("get details"+JSON.stringify(this.place))
            console.log("i got place id yeee " + JSON.stringify(_this.place['results'][0]['place_id']));
            console.log("i got place details  " + JSON.stringify(_this.place.results[3].address_components[0].long_name));
        });
        this.loadmap();
    };
    SalonAddressDetails.prototype.loadmap = function () {
        var mapEle = document.getElementById('map5');
        this.map = new google.maps.Map(mapEle, {
            center: { lat: this.lat, lng: this.lng },
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        this.loadmarker();
    };
    SalonAddressDetails.prototype.loadmarker = function () {
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: { lat: this.lat, lng: this.lng },
        });
    };
    SalonAddressDetails.prototype.dismiss = function () {
        this.viewCtrl.dismiss({ city: this.city, district: this.district, postalcode: this.postalcode });
    };
    SalonAddressDetails = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-address-details',
            templateUrl: 'salon-address-details.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Http, ViewController])
    ], SalonAddressDetails);
    return SalonAddressDetails;
}());
export { SalonAddressDetails };
//# sourceMappingURL=salon-address-details.js.map