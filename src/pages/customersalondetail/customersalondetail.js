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
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { DataService } from '../../providers/data-service';
import { Observable } from "rxjs/Rx";
;
import { SocialSharing } from '@ionic-native/social-sharing';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
var Customersalondetail = /** @class */ (function () {
    function Customersalondetail(navCtrl, iab, loadingCtrl, alertCtrl, dataservice, navParams, callNumber, platform, geolocation, modalCtrl, http, socialSharing, launchNavigator) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.iab = iab;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.dataservice = dataservice;
        this.navParams = navParams;
        this.callNumber = callNumber;
        this.platform = platform;
        this.geolocation = geolocation;
        this.modalCtrl = modalCtrl;
        this.socialSharing = socialSharing;
        this.launchNavigator = launchNavigator;
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.usercurrentlat = resp.coords.latitude;
            _this.usercurrentlng = resp.coords.longitude;
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
        // this.noreview='false';
        this.noservices = 'false';
        this.abc = 'withoutmap';
        this.salonimg = this.navParams.get('salonimg');
        this.salontitle = this.navParams.get('salonname');
        // this.salonlatitude=this.navParams.get('salonlat');
        // this.salonlongitude=this.navParams.get('salonlng');
        this.salonlatitude = parseInt(localStorage['lat']);
        this.salonlongitude = parseInt(localStorage['lng']);
        this.http = http;
        this.segment = "service";
        this.salonid = this.navParams.get('salondetail');
        this.salonimg = this.navParams.get('salonimg');
        localStorage['salonimage'] = this.salonimg;
        this.salondata = this.navParams.get('salondata');
        console.log("hello Salon data" + JSON.stringify(this.salondata));
        this.customerid = localStorage['customerid'];
        this.directory = localStorage['directory'];
        this.guest_account = localStorage['auth'];
        //alert("hello Salon img"+JSON.stringify(this.salonimg))
    }
    Customersalondetail.prototype.ngOnInit = function () {
        // let loading = this.loadingCtrl.create({content: 'Please Wait...'});
        //       Observable.fromPromise(loading.present())
        //       .flatMap(data => this.dataservice.customerSideSalonServices(this.salonid))
        //   .subscribe(data=>{
        //      loading.dismiss().then(()=>{
        //         this.salondetail = data;
        //     console.log("hello kaun aya"+JSON.stringify(this.salondetail))
        //     this.services=this.salondetail.data;
        //    console.log("hello kaun aya 2"+JSON.stringify(this.services))
        //     this.services2=this.salondetail.data.salon_services;  
        //     this.dataservice.value.services=this.services.salon_services;
        // //  this.mylat=this.services[0].latitude
        // // this.mylong= this.services[0].longitude
        // //            alert("mydata"+ JSON.stringify(this.services.latitude))
        //       // console.log("service hai"+JSON.stringify(this.services.data.data)) 
        //       console.log("number"+JSON.stringify(this.services.contact_number))  
        //       this.saloncontactnumber=this.services.contact_number; 
        //       this.salonaddress=this.services.address;
        //       this.schedule=this.services.schedule;
        //        console.log("number2"+JSON.stringify(this.services.salon_name)) 
        //       this.salonname=this.services.salon_name; 
        //       this.facebooklink=this.services.facebooklink; 
        //       this.website=this.services.website; 
        //       this.instagram=this.services.instagramlink; 
        //       this.wifi=this.services.wifi; 
        //       this.wheel=this.services.wheelchair; 
        //       this.parking=this.services.parking; 
        //       this.dataservice.datavalue.salonname=this.salonname;
        //        this.dataservice.datavalue.salonaddress=this.services.address;
        //        this.salondescription=this.services.salon_description;
        //      // console.log("null data"+JSON.stringify(this.services[0].salon_services))
        //          var a=this.services.salon_services;
        //       if(a==[] || a=='' || a=='[]'){
        //               this.noservices='true'
        //       }
        //     }),  error =>
        //           loading.dismiss().then(() => {
        //        let alert=this.alertCtrl.create({
        //          title:'Something Went Wrong',
        //         subTitle:'Please Try Again',
        //          buttons:['Ok']
        //    })
        //    alert.present()});
        //   })
        //  this.status();
        //  this.viewReviews();
        // this.initMap();
        this.salonservices_status_reviews();
    };
    Customersalondetail.prototype.Direction = function () {
        // alert("Route")
        this.start = [this.usercurrentlat, this.usercurrentlng];
        var options = {
            start: this.start
        };
        this.launchNavigator.navigate([this.salonlatitude, this.salonlongitude], options)
            .then(function (success) {
            console.log('Launched navigator');
        }).catch(function (error) {
            alert('Error launching navigator: ' + JSON.stringify(error));
        });
    };
    Customersalondetail.prototype.call = function () {
        this.callNumber.callNumber(this.saloncontactnumber, true)
            .then(function () {
            return console.log('Launched dialer!');
        })
            .catch(function (error) {
            return console.log('Error launching dialer' + error);
        });
    };
    Customersalondetail.prototype.share = function () {
        var path = 'https://play.google.com/store';
        this.socialSharing.share(null, 'BARBER&BEAUTY', null, path).then(function () {
        }).catch(function () {
            console.log('Error launching share');
        });
    };
    Customersalondetail.prototype.Gallery = function () {
        this.navCtrl.push('CustomerSalonGallery', { salonid: this.salonid });
    };
    Customersalondetail.prototype.list = function (title) {
        this.dataservice.value2.selectedservices = title;
        this.navCtrl.push('CustomerEmployeeListing', { salonid: this.salonid });
    };
    Customersalondetail.prototype.loadmap = function () {
        if (this.segment == 'map') {
            this.abc = 'map4';
            var mapEle_1 = document.getElementById('map3');
            this.map = new google.maps.Map(mapEle_1, {
                zoom: 8,
                center: { lat: this.salonlatitude, lng: this.salonlongitude },
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            });
            google.maps.event.addListenerOnce(this.map, 'idle', function () {
                mapEle_1.classList.add('show-map');
                google.maps.event.trigger(mapEle_1, 'resize');
            });
            this.addMarker(this.salonlatitude, this.salonlongitude);
        }
        else if (this.segment == 'service') {
            this.abc = 'withoutmap';
        }
        else if (this.segment == 'review') {
            this.abc = 'withoutmap';
        }
    };
    Customersalondetail.prototype.addMarker = function (a, b) {
        // alert("inside marker latt"+a)
        // alert("inside marker lng"+b)
        if (a && b) {
            var marker = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: {
                    lat: a,
                    lng: b
                }
            });
        }
    };
    // status(){ 
    //   let loading = this.loadingCtrl.create({content: 'Please Wait...'});
    //      var link='http://europa.promaticstechnologies.com/salonDirectory/WebServices/salonFavouriteStatus.json';
    //     var data=JSON.stringify({
    //          salon_id:this.salonid,
    //          customer_id:localStorage['customerid']
    //     })
    //   this.http.post(link,data)
    //    .map(response => response.json())
    //      .subscribe(data=>{
    //        loading.dismiss().then(()=>{
    //          this.checkstatus = data;
    //        if(this.checkstatus.status=='active'){
    //             this.favo=1;
    //        }
    //        else {
    //            this.favo=0;
    //        }
    //      }),error =>
    //              loading.dismiss().then(() => {
    //           let alert=this.alertCtrl.create({
    //             title:'Something Went Wrong',
    //            subTitle:'Please Try Again',
    //             buttons:['Ok']
    //       })
    //       alert.present()});
    //      });  
    // }
    // viewReviews(){
    //   let loading = this.loadingCtrl.create({
    //     content: 'Please wait...'
    //   });
    //   loading.present();
    //    var link='http://europa.promaticstechnologies.com/salonDirectory/WebServices/customerViewReviewAndRating.json';
    //     var data=JSON.stringify({
    //          salon_id:this.salonid,
    //     })
    //   this.http.post(link,data)
    //    .map(response => response.json())
    //      .subscribe(data=>{
    //        loading.dismiss().then(()=>{
    //             this.viewreviewdata = data;
    //        this.viewreviewinfo= this.viewreviewdata.ratinginfo;
    //            // console.log("review data"+JSON.stringify(this.viewreviewdata))
    //        if(this.viewreviewdata.status==0){
    //          // alert("no review Added")
    //              this.noreview='true'
    //        }
    //        else{
    //           this.noreview='false'
    //        }
    //        }),   error =>
    //              loading.dismiss().then(() => {
    //           let alert=this.alertCtrl.create({
    //         title:'Something Went Wrong',
    //         subTitle:'Please Try Again',
    //         buttons:['Ok']
    //       })
    //       alert.present()
    //                       });
    //      })    
    // }
    Customersalondetail.prototype.addreview = function () {
        var _this = this;
        var profileModal = this.modalCtrl.create('CustomerAddReviewModel', { salonname: this.salonname, salonid: this.salonid });
        profileModal.onDidDismiss(function (data) {
            console.log(data);
            _this.salonservices_status_reviews();
        });
        profileModal.present();
        // this.navCtrl.push('CustomerAddReview',{salonname:this.salonname,salonid: this.salonid})
    };
    Customersalondetail.prototype.fav = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.addtofavourite(_this.salonid); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.favres = data;
                if (_this.favres.message == 'Add to Favourite') {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Thank You!',
                        subTitle: 'Salon Added to Favourites',
                        buttons: ['ok']
                    });
                    alert_1.present();
                    _this.salonservices_status_reviews();
                }
                else if (_this.favres.message == 'Remove To Favourite') {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'Alert!',
                        subTitle: 'Salon Removed from Favourites',
                        buttons: ['ok']
                    });
                    alert_2.present();
                    _this.salonservices_status_reviews();
                }
            });
        }, function (error) {
            loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'ALERT!',
                    subTitle: 'Something Went Wrong',
                    buttons: ['ok']
                });
                alert.present();
            });
        });
    };
    Customersalondetail.prototype.openweb = function (website) {
        if (website.indexOf('https://') == -1) {
            var web = 'https://' + website;
            window.open(web, "_system", "location=true");
        }
        else {
            window.open(web, "_system", "location=true");
        }
    };
    Customersalondetail.prototype.fblink = function (facebooklink) {
        // var a='https://'+facebooklink;
        var b = facebooklink;
        window.open(b, "_system", "location=true");
    };
    Customersalondetail.prototype.openinstalink = function (instagramlink) {
        // var insta='https://'+instagramlink;
        var c = instagramlink;
        window.open(c, "_system", "location=true");
    };
    Customersalondetail.prototype.salonservices_status_reviews = function () {
        var _this = this;
        if (this.guest_account == 'true') {
            var loading_1 = this.loadingCtrl.create({ content: 'Please wait...' });
            loading_1.present();
            Observable.forkJoin(this.http.post('http://gagandeepsethi.com/salonDirectory/WebServices/customerSideSalonServicesListing.json', { salon_id: this.salonid }).map(function (res) { return res.json(); }), this.http.post('http://gagandeepsethi.com/salonDirectory/WebServices/salonFavouriteStatus.json', { salon_id: this.salonid, customer_id: localStorage['customerid'] }).map(function (res) { return res.json(); }), this.http.post('http://gagandeepsethi.com/salonDirectory/WebServices/customerViewReviewAndRating.json', { salon_id: this.salonid }).map(function (res) { return res.json(); })).subscribe(function (data) {
                loading_1.dismiss();
                _this.salondetail = data[0];
                _this.services = _this.salondetail.data;
                _this.services2 = _this.salondetail.data.salon_services;
                _this.dataservice.value.services = _this.services.salon_services;
                _this.saloncontactnumber = _this.services.contact_number;
                _this.salonaddress = _this.services.address;
                _this.schedule = _this.services.schedule;
                _this.salonname = _this.services.salon_name;
                _this.facebooklink = _this.services.facebooklink;
                _this.website = _this.services.website;
                _this.instagram = _this.services.instagramlink;
                _this.wifi = _this.services.wifi;
                _this.wheel = _this.services.wheelchair;
                _this.parking = _this.services.parking;
                _this.dataservice.datavalue.salonname = _this.salonname;
                _this.dataservice.datavalue.salonaddress = _this.services.address;
                _this.salondescription = _this.services.salon_description;
                var a = _this.services.salon_services;
                if (a == [] || a == '' || a == '[]') {
                    _this.noservices = 'true';
                }
                //status
                _this.checkstatus = data[1];
                if (_this.checkstatus.status == 'active') {
                    _this.favo = 1;
                }
                else {
                    _this.favo = 0;
                }
                //view Reviews
                _this.viewreviewdata = data[2];
                _this.viewreviewinfo = _this.viewreviewdata.ratinginfo;
                if (_this.viewreviewdata.status == 0) {
                    _this.noreview = 'true';
                }
                else {
                    _this.noreview = 'false';
                }
            }, function (err) {
                loading_1.dismiss();
                var alert = _this.alertCtrl.create({
                    title: 'SERVER ERROR',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                alert.present();
            });
        }
        else if (this.guest_account == 'false') {
            var loading_2 = this.loadingCtrl.create({ content: 'Please wait...' });
            loading_2.present();
            Observable.forkJoin(this.http.post('http://gagandeepsethi.com/salonDirectory/WebServices/customerSideSalonServicesListing.json', { salon_id: this.salonid }).map(function (res) { return res.json(); }), this.http.post('http://gagandeepsethi.com/salonDirectory/WebServices/customerViewReviewAndRating.json', { salon_id: this.salonid }).map(function (res) { return res.json(); })).subscribe(function (data) {
                loading_2.dismiss();
                _this.salondetail = data[0];
                _this.services = _this.salondetail.data;
                _this.services2 = _this.salondetail.data.salon_services;
                _this.dataservice.value.services = _this.services.salon_services;
                _this.saloncontactnumber = _this.services.contact_number;
                _this.salonaddress = _this.services.address;
                _this.schedule = _this.services.schedule;
                _this.salonname = _this.services.salon_name;
                _this.facebooklink = _this.services.facebooklink;
                _this.website = _this.services.website;
                _this.instagram = _this.services.instagramlink;
                _this.wifi = _this.services.wifi;
                _this.wheel = _this.services.wheelchair;
                _this.parking = _this.services.parking;
                _this.dataservice.datavalue.salonname = _this.salonname;
                _this.dataservice.datavalue.salonaddress = _this.services.address;
                _this.salondescription = _this.services.salon_description;
                var a = _this.services.salon_services;
                if (a == [] || a == '' || a == '[]') {
                    _this.noservices = 'true';
                }
                //status
                //   this.checkstatus  = data[1]
                // if(this.checkstatus.status=='active'){
                //      this.favo=1;
                // }
                // else {
                //     this.favo=0;
                // }
                //view Reviews
                _this.viewreviewdata = data[1];
                _this.viewreviewinfo = _this.viewreviewdata.ratinginfo;
                if (_this.viewreviewdata.status == 0) {
                    _this.noreview = 'true';
                }
                else {
                    _this.noreview = 'false';
                }
            }, function (err) {
                loading_2.dismiss();
                var alert = _this.alertCtrl.create({
                    title: 'SERVER ERROR',
                    subTitle: 'Please Try Again',
                    buttons: ['Ok']
                });
                alert.present();
            });
        }
        //  ionViewWillLeave(){
        //         alert("leave")   
        // }}
    };
    Customersalondetail = __decorate([
        IonicPage(),
        Component({
            selector: 'page-customersalondetail',
            templateUrl: 'customersalondetail.html',
        }),
        __metadata("design:paramtypes", [NavController,
            InAppBrowser,
            LoadingController,
            AlertController,
            DataService,
            NavParams,
            CallNumber,
            Platform,
            Geolocation,
            ModalController,
            Http, SocialSharing,
            LaunchNavigator])
    ], Customersalondetail);
    return Customersalondetail;
}());
export { Customersalondetail };
//# sourceMappingURL=customersalondetail.js.map