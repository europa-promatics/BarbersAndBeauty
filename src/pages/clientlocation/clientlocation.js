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
var Clientlocation = /** @class */ (function () {
    function Clientlocation(navCtrl, viewCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.type = [];
        this.inputvalue = '';
    }
    Clientlocation.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad page-clientlocation');
        this.initMap();
        this.addmarker();
    };
    Clientlocation.prototype.chooseItem = function (item) {
        var _this = this;
        this.placesService = new google.maps.places.PlacesService(this.amap);
        var request = { placeId: item.place_id };
        this.inputvalue = item.description;
        this.autocompleteItems = [];
        this.placesService.getDetails(request, function (place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                _this.locationaddress = _this.inputvalue;
                _this.bidlat = place.geometry.location.lat();
                _this.bidlng = place.geometry.location.lng();
                _this.marker.setPosition(place.geometry.location);
                _this.amap.fitBounds(place.geometry.viewport);
                _this.amap.setCenter(place.geometry.location);
                _this.amap.setZoom(15);
            }
            else {
                console.log('page > getPlaceDetail > status > ', status);
            }
        });
    };
    Clientlocation.prototype.changeInput = function () {
        var self = this;
        this.acService = new google.maps.places.AutocompleteService();
        this.acService.getPlacePredictions({ types: this.type, input: this.inputvalue }, function (predictions, status) {
            console.log('modal > getPlacePredictions > status > ', status);
            if (predictions) {
                self.autocompleteItems = [];
                if (predictions) {
                    predictions.forEach(function (prediction) {
                        self.autocompleteItems.push(prediction);
                    });
                }
            }
        });
    };
    Clientlocation.prototype.initMap = function () {
        this.bidlat1 = this.navParams.get('bidlat1');
        this.bidlng1 = this.navParams.get('bidlng1');
        var latlong = { lat: this.bidlat1, lng: this.bidlng1 };
        var card = document.getElementById('pac-card');
        this.amap = new google.maps.Map(document.getElementById('mapsearch'), {
            center: latlong,
            zoom: 13
        });
        this.amap.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
        this.marker = new google.maps.Marker({
            map: this.amap,
            anchorPoint: new google.maps.Point(0, -29),
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        // var input         = document.getElementById('pac-input');
        // var types         = document.getElementById('type-selector');
        // var strictBounds  = document.getElementById('strict-bounds-selector');
        // this.acService = new google.maps.places.AutocompleteService();        
        // this.autocomplete = new google.maps.places.Autocomplete(input);
        // this.autocomplete.bindTo('bounds', this.amap);
        // var infowindow = new google.maps.InfoWindow();
        // var infowindowContent = document.getElementById('infowindow-content');
        //     infowindow.setContent(infowindowContent);
        // this.autocomplete.addListener('place_changed', () => {
        //     // infowindow.close();
        //     marker.setVisible(false);
        //     var place = this.autocomplete.getPlace();
        //     if (!place.geometry) {
        //         window.alert("No details available for input: '" + place.name + "'");
        //         return;
        //     }
        //     if (place.geometry.viewport) {
        //         this.amap.fitBounds(place.geometry.viewport);
        //     } else {
        //         this.amap.setCenter(place.geometry.location);
        //         this.amap.setZoom(15); // Why 17? Because it looks good.
        //     }
        //     marker.setPosition(place.geometry.location);
        //     marker.setVisible(true);
        //     var address = '';
        //     if (place.address_components) {
        //         address = [
        //             (place.address_components[0] && place.address_components[0].short_name || ''),
        //             (place.address_components[1] && place.address_components[1].short_name || ''),
        //             (place.address_components[2] && place.address_components[2].short_name || '')
        //         ].join(' ');
        //         this.locationaddress = address
        //         this.bidlat = place.geometry.location.lat()
        //         this.bidlng = place.geometry.location.lng()
        //     }
        //     // infowindowContent.children['place-icon'].src = place.icon;
        //     // infowindowContent.children['place-name'].textContent = place.name;
        //     // infowindowContent.children['place-address'].textContent = address;
        //     // infowindow.open(this.amap, marker);
        // });
    };
    Clientlocation.prototype.toggleType = function (types) {
        if (types == 'changetype-all') {
            this.type = [];
        }
        else if (types == 'changetype-address') {
            this.type = ['address'];
        }
    };
    Clientlocation.prototype.addmarker = function () {
        this.mylatlng = {
            lat: this.bidlat1,
            lng: this.bidlng1
        };
        var marker = new google.maps.Marker({
            map: this.amap,
            position: this.mylatlng
        });
    };
    Clientlocation.prototype.dismiss = function () {
        this.viewCtrl.dismiss({
            address: this.locationaddress,
            lat: this.bidlat,
            lng: this.bidlng
        });
    };
    Clientlocation = __decorate([
        IonicPage(),
        Component({
            selector: 'page-clientlocation',
            templateUrl: 'clientlocation.html',
        }),
        __metadata("design:paramtypes", [NavController, ViewController, NavParams])
    ], Clientlocation);
    return Clientlocation;
}());
export { Clientlocation };
//# sourceMappingURL=clientlocation.js.map