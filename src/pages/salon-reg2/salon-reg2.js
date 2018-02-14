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
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
/**
 * Generated class for the SalonReg2 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalonReg2 = /** @class */ (function () {
    function SalonReg2(navCtrl, formBuilder, navParams, http, alertCtrl, modalCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.address = {
            place: '',
            set: false,
        };
        this.markers = [];
        this.myservices = [];
        this.ourservices = [];
        this.unique_myservices = [];
        this.data = {};
        this.http = http;
        // this.ad='false'
        // alert("salonname"+this.salonname)
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var numberregex = /^\d+$/;
        var name = /^([a-zA-Z]){1,30}$/;
        var namevalidation = /^[^-\s][a-zA-Z_\s-]+$/;
        var descrptionregex = /^[^-\s][a-zA-Z0-9_\s-]+$/;
        this.custregister = formBuilder.group({
            buisnessname: ['', Validators.compose([Validators.pattern(descrptionregex), Validators.required])],
            aboutbuisness: ['', Validators.compose([Validators.pattern(descrptionregex), Validators.required])],
            fullname: ['', Validators.compose([Validators.pattern(namevalidation), Validators.required])],
            salonemail: ['', Validators.compose([Validators.pattern(emailRegex), Validators.required])],
            // services_selected:['', Validators.compose([Validators.required])],
            salonpassword: ['', Validators.compose([Validators.maxLength(12),
                    Validators.minLength(3), Validators.pattern(''), Validators.required])],
            saloncpass: ['', Validators.compose([Validators.maxLength(12),
                    Validators.minLength(3), Validators.pattern(''), Validators.required])],
            salonphone: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(15), Validators.pattern(numberregex), Validators.required])],
        });
    }
    SalonReg2.prototype.Confirmation = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm',
            message: 'Are you want to Create Buisness Account?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.reg();
                    }
                }
            ]
        });
        alert.present();
    };
    SalonReg2.prototype.ngOnInit = function () {
        this.initMap();
        this.initPlacedetails();
    };
    SalonReg2.prototype.showModal = function () {
        var _this = this;
        // reset 
        this.reset();
        // show modal|
        var modal = this.modalCtrl.create('ModalAutocompleteItems');
        modal.onDidDismiss(function (data) {
            console.log('page > modal dismissed > data > ', data);
            if (data) {
                _this.address.place = data.description;
                // get details
                _this.getPlaceDetail(data.place_id);
            }
        });
        modal.present();
    };
    SalonReg2.prototype.reset = function () {
        this.initPlacedetails();
        this.address.place = '';
        this.address.set = false;
    };
    SalonReg2.prototype.getPlaceDetail = function (place_id) {
        var self = this;
        var request = {
            placeId: place_id
        };
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.placesService.getDetails(request, callback);
        function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log('page > getPlaceDetail > place > ', place);
                // set full address
                self.placedetails.address = place.formatted_address;
                self.placedetails.lat = place.geometry.location.lat();
                self.placedetails.lng = place.geometry.location.lng();
                for (var i = 0; i < place.address_components.length; i++) {
                    var addressType = place.address_components[i].types[0];
                    var values = {
                        short_name: place.address_components[i]['short_name'],
                        long_name: place.address_components[i]['long_name']
                    };
                    if (self.placedetails.components[addressType]) {
                        self.placedetails.components[addressType].set = true;
                        self.placedetails.components[addressType].short = place.address_components[i]['short_name'];
                        self.placedetails.components[addressType].long = place.address_components[i]['long_name'];
                    }
                }
                // set place in map
                self.map.setCenter(place.geometry.location);
                // self.createMapMarker(place);
                // populate
                self.address.set = true;
                console.log('page > getPlaceDetail > details > ', self.placedetails);
            }
            else {
                console.log('page > getPlaceDetail > status > ', status);
            }
        }
    };
    SalonReg2.prototype.initMap = function () {
        var point = { lat: -34.603684, lng: -58.381559 };
        var divMap = document.getElementById('map');
        this.map = new google.maps.Map(divMap, {
            center: point,
            zoom: 15,
            disableDefaultUI: true,
            draggable: false,
            zoomControl: true
        });
    };
    SalonReg2.prototype.createMapMarker = function (place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: this.map,
            position: placeLoc
        });
        this.markers.push(marker);
    };
    SalonReg2.prototype.initPlacedetails = function () {
        this.placedetails = {
            address: '',
            lat: '',
            lng: '',
            components: {
                route: { set: false, short: '', long: '' },
                street_number: { set: false, short: '', long: '' },
                sublocality_level_1: { set: false, short: '', long: '' },
                locality: { set: false, short: '', long: '' },
                administrative_area_level_2: { set: false, short: '', long: '' },
                administrative_area_level_1: { set: false, short: '', long: '' },
                country: { set: false, short: '', long: '' },
                postal_code: { set: false, short: '', long: '' },
                postal_code_suffix: { set: true, short: '', long: '' },
            }
        };
    };
    SalonReg2.prototype.reg = function () {
        console.log("ee" + JSON.stringify(this.category_all_data));
        if (this.custregister.controls["salonpassword"].value != this.custregister.controls["saloncpass"].value) {
            var alert_1 = this.alertCtrl.create({
                title: 'Alert!',
                subTitle: 'Password And Confirm password Must be Same.',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else if (this.placedetails.address == '') {
            // this.ad='true'
            var alert_2 = this.alertCtrl.create({
                title: 'Alert!',
                subTitle: 'Please Fill Address Fields',
                buttons: ['OK']
            });
            alert_2.present();
        }
        else if (this.check == 'true' || this.check == true) {
            //      let loading = this.loadingCtrl.create({
            //  content: 'Please wait...'
            // });
            //  loading.present();
            //  var link='http://gagandeepsethi.com/salonDirectory/WebServices/salonRegistration.json';
            //   var data=JSON.stringify({
            //       salon_name:this.salonname,
            //       address:this.placedetails.address,
            //       full_name:this.name,
            //       email:this.email,
            //       password:this.password,
            //       confirm_password:this.cpass,
            //       contact_number:this.number,
            //      salon_description:this.salondescription,
            //       usertype:1,
            //       latitude: this.placedetails.lat,
            //       longitude:this.placedetails.lng,
            //       category:this.category_all_data
            //   })
            // this.http.post(link,data)
            // .map(response => response.json())
            //  .subscribe(data=>{
            //        loading.dismiss();
            //    this.data = data;
            //      console.log("response"+JSON.stringify(this.data));
            //            if(this.data.status==1){
            //                let alert = this.alertCtrl.create({
            //                 title: 'THANK YOU!',
            //                 subTitle: 'Registration Successful.Please Check Your Inbox To Verify Your Account ',
            //                 buttons: ['ok']
            //               });
            //               alert.present();
            this.navCtrl.push('SalonCategory', { salon_name: this.salonname,
                address: this.placedetails.address,
                full_name: this.name,
                email: this.email,
                password: this.password,
                confirm_password: this.cpass,
                contact_number: this.number,
                salon_description: this.salondescription,
                usertype: 1,
                latitude: this.placedetails.lat,
                longitude: this.placedetails.lng });
            // this.navCtrl.setRoot('Login')
        }
        else {
            var alert_3 = this.alertCtrl.create({
                title: 'Alert!',
                subTitle: 'Please read and accept terms & conditions.',
                buttons: ['OK']
            });
            alert_3.present();
        }
    };
    SalonReg2.prototype.show_category_modal = function () {
        var _this = this;
        var modal = this.modalCtrl.create('SalonCategory');
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.category_data = data;
            if (_this.category_data == []) {
                _this.category_data = null;
            }
            // alert(JSON.stringify( this.category_data))
            _this.category_all_data = data.services;
            for (var i = 0; i < _this.category_data.services.length; i++) {
                _this.myservices.push(_this.category_data.services[i].name);
                // alert(this.last_index)
                // alert(this.myservices[0])
                //  alert(JSON.stringify(this.myservices))
            }
            // alert(JSON.stringify(this.myservices))
            // this.last_index=this.myservices.length
            // this.myservices.splice(this.last_index-1,1)  
            var unique = _this.myservices.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            // alert(unique[0])
            // alert(unique[1])
            // alert(unique[2])
            // alert(unique[3])
            // alert(unique[4])
            // alert(unique[5])
            // alert(unique[6])
            // alert(unique[7])
            // for(var i=0;)
            if (unique[0] === undefined) {
                unique[0] = " ";
            }
            if (unique[1] === undefined) {
                unique[1] = " ";
            }
            if (unique[2] === undefined) {
                unique[2] = " ";
            }
            if (unique[3] === undefined) {
                unique[3] = " ";
            }
            if (unique[4] === undefined) {
                unique[4] = " ";
            }
            if (unique[5] === undefined) {
                unique[5] = " ";
            }
            if (unique[6] === undefined) {
                unique[6] = " ";
            }
            else if (unique[6] === NaN) {
                unique[6] = " ";
            }
            if (unique[7] === undefined) {
                unique[7] = " ";
            }
            // if(unique[8]==undefined){
            //   unique[8]=" "
            // }
            // if(unique[9]==undefined){
            //   unique[9]=" "
            // }
            // if(unique[10]==undefined){
            //   unique[10]=" "
            // }
            // if(unique[11]==undefined){
            //   unique[11]=" "
            // }
            // if(unique[12]==undefined){
            //   unique[12]=" "
            // }
            // if(unique[13]==undefined){
            //   unique[13]=" "
            // }
            // if(unique[14]==undefined){
            //   unique[14]=" "
            // }
            // if(unique[15]==undefined){
            //   unique[15]=" "
            // }if(unique[16]==undefined){
            //   unique[16]=" "
            // }
            _this.our_selected_service =
                unique[0] + " " + unique[1] + " " + unique[2] + " " + unique[3] + " " + unique[4] + " " + unique[5] + " " + unique[6] + " " + unique[7];
            // name_list = ["Mike","Matt","Nancy","Adam","Jenny","Nancy","Carl"];
            // get_uniq = name_list.filter(function(val,ind) { return name_list.indexOf(val) == ind; })
            // console.log("Original name list:"+name_list.length, name_list)
            // console.log("\n Unique name list:"+get_uniq.length, get_uniq)
            // this.unique_myservices = this.myservices.filter(function(val,ind)
            //  { return this.myservices.indexOf(val) == ind; })
            // alert(JSON.stringify(this.unique_myservices))
        });
    };
    SalonReg2.prototype.terms = function () {
        this.navCtrl.push('TermsOfServices');
    };
    SalonReg2 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-reg2',
            templateUrl: 'salon-reg2.html',
        }),
        __metadata("design:paramtypes", [NavController, FormBuilder, NavParams, Http,
            AlertController, ModalController,
            LoadingController])
    ], SalonReg2);
    return SalonReg2;
}());
export { SalonReg2 };
//# sourceMappingURL=salon-reg2.js.map