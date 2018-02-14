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
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the ModalAutocompleteItems page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ModalAutocompleteItems = /** @class */ (function () {
    function ModalAutocompleteItems(navCtrl, geolocation, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.geolocation = geolocation;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.markers = [];
    }
    ModalAutocompleteItems.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ModalAutocompleteItems');
    };
    ModalAutocompleteItems.prototype.ngOnInit = function () {
        this.acService = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };
        this.CurrentlocationMap();
    };
    ModalAutocompleteItems.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ModalAutocompleteItems.prototype.chooseItem = function (item) {
        console.log('modal > chooseItem > item > ', item);
        this.viewCtrl.dismiss(item);
    };
    ModalAutocompleteItems.prototype.updateSearch = function () {
        console.log('modal > updateSearch');
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        var self = this;
        var config = {
            types: ['geocode'],
            input: this.autocomplete.query,
        };
        this.acService.getPlacePredictions(config, function (predictions, status) {
            console.log('modal > getPlacePredictions > status > ', status);
            self.autocompleteItems = [];
            predictions.forEach(function (prediction) {
                self.autocompleteItems.push(prediction);
            });
        });
    };
    ModalAutocompleteItems.prototype.CurrentlocationMap = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            _this.bidlat1 = position.coords.latitude;
            _this.bidlng1 = position.coords.longitude;
            _this.point = { lat: position.coords.latitude, lng: position.coords.longitude };
            var divMap = document.getElementById('map6');
            _this.map = new google.maps.Map(divMap, {
                center: _this.point,
                zoom: 10,
                disableDefaultUI: true,
                draggable: false,
                zoomControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            });
            var marker = new google.maps.Marker({
                map: _this.map,
                position: _this.point
            });
            _this.markers.push(marker);
        }, function (err) {
            console.log(err);
        });
    };
    ModalAutocompleteItems = __decorate([
        IonicPage(),
        Component({
            selector: 'page-modal-autocomplete-items',
            templateUrl: 'modal-autocomplete-items.html',
        }),
        __metadata("design:paramtypes", [NavController, Geolocation, NavParams, ViewController])
    ], ModalAutocompleteItems);
    return ModalAutocompleteItems;
}());
export { ModalAutocompleteItems };
//# sourceMappingURL=modal-autocomplete-items.js.map