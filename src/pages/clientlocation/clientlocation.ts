import {Component} from '@angular/core';
import {IonicPage,NavController,NavParams,ViewController} from 'ionic-angular';
declare var google: any;
@IonicPage()
@Component({
    selector: 'page-clientlocation',
    templateUrl: 'clientlocation.html',
})
export class Clientlocation {
    checked
    searchbox
    bidlat1
    bidlng1
    locationaddress
    bidlat
    bidlng
    amap;
    mylatlng;
    autocomplete;
    type=[];
    autocompleteItems;
    acService
    inputvalue='';
    placesService;
    marker
    constructor(public navCtrl: NavController, public viewCtrl: ViewController,public navParams: NavParams) {
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad page-clientlocation');
        this.initMap()
        this.addmarker()
    }
    chooseItem(item){
      this.placesService = new google.maps.places.PlacesService(this.amap);
      var request = {placeId: item.place_id};
      this.inputvalue=item.description;
      this.autocompleteItems = [];
      this.placesService.getDetails(request, (place,status)=>{
          if (status == google.maps.places.PlacesServiceStatus.OK) {
                this.locationaddress = this.inputvalue;
                this.bidlat = place.geometry.location.lat()
                this.bidlng = place.geometry.location.lng()
                this.marker.setPosition(place.geometry.location);
                this.amap.fitBounds(place.geometry.viewport);
                this.amap.setCenter(place.geometry.location);
                this.amap.setZoom(15); 
            }
            else{console.log('page > getPlaceDetail > status > ', status )}
      })
    }
    changeInput(){
      var self=this;
        this.acService = new google.maps.places.AutocompleteService();        
        this.acService.getPlacePredictions({types:this.type,input:this.inputvalue}, function (predictions, status) {
          console.log('modal > getPlacePredictions > status > ', status);
          if(predictions){
              self.autocompleteItems = [];
              if(predictions){
                 predictions.forEach(function (prediction) {     
                     self.autocompleteItems.push(prediction);
                  });
              }            
          }
        });
    }
    initMap() {
        this.bidlat1 = this.navParams.get('bidlat1')
        this.bidlng1 = this.navParams.get('bidlng1')
        var latlong = {lat: this.bidlat1,lng: this.bidlng1}
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
    }
    toggleType(types){
      if(types=='changetype-all'){
        this.type=[];
      }else if(types=='changetype-address'){
        this.type=['address'];
      }
    }
    addmarker() {
        this.mylatlng = {
            lat: this.bidlat1,
            lng: this.bidlng1
        }
        var marker = new google.maps.Marker({
            map: this.amap,
            position: this.mylatlng
        });
    }
    dismiss() {
        this.viewCtrl.dismiss({
            address: this.locationaddress,
            lat: this.bidlat,
            lng: this.bidlng
        });
    }
}