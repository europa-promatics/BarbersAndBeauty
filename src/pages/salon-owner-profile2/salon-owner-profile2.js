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
import { DataService } from "../../providers/data-service";
import { LoadingController, Events, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from "rxjs/Rx";
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Validators, FormBuilder } from '@angular/forms';
/**
 * Generated class for the SalonOwnerProfile2 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalonOwnerProfile2 = /** @class */ (function () {
    function SalonOwnerProfile2(navCtrl, dataservice, navParams, alertCtrl, formBuilder, loadingCtrl, camera, transfer, events) {
        this.navCtrl = navCtrl;
        this.dataservice = dataservice;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.events = events;
        this.v = false;
        var name = /^([a-zA-Z ]){1,30}$/;
        var emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
        var namevalidation = /^[^-\s][a-zA-Z_\s-]+$/;
        this.form3 = formBuilder.group({
            name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(namevalidation), Validators.required])],
            email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(emailRegex), Validators.required])],
            mobile_number: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(10), Validators.pattern("[0-9]*"), Validators.required])],
        });
    }
    SalonOwnerProfile2.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalonOwnerProfile2');
    };
    SalonOwnerProfile2.prototype.editprofile = function () {
        this.v = !this.v;
    };
    SalonOwnerProfile2.prototype.uploadpic = function (a) {
        var _this = this;
        if (a == 2) {
            this.pic = '';
            this.camera.getPicture({
                quality: 75,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                sourceType: 2,
                targetHeight: 500,
                targetWidth: 500,
                correctOrientation: true
            }).then(function (imageData) {
                var base64Image = 'data:image/jpeg;base64,' + imageData;
                _this.pic = base64Image;
                _this.saveimage(_this.pic);
            }, function (err) {
                // alert(JSON.stringify(err))
            });
        }
        else if (a == 1) {
            this.pic = '';
            this.camera.getPicture({
                quality: 75,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                sourceType: 1,
                correctOrientation: true
            }).then(function (imageData) {
                var base64Image = 'data:image/jpeg;base64,' + imageData;
                _this.pic = base64Image;
                _this.saveimage(_this.pic);
            }, function (err) {
                // alert(JSON.stringify(err))
            });
        }
        //alert(this.pic)
    };
    SalonOwnerProfile2.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading...' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.viewprofileinfo(_this.user_id); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.minedata = data;
                _this.name = _this.minedata.saloninfo.full_name;
                _this.email = _this.minedata.saloninfo.email;
                _this.about_me = _this.minedata.saloninfo.salon_description;
                _this.mobile_number = _this.minedata.saloninfo.contact_number;
                _this.myimage = _this.minedata.saloninfo.profile_image;
                if (_this.myimage == 'null' || _this.myimage == null) {
                    _this.myimage = 'assets/img/user.jpg';
                }
                else {
                    _this.myimage = 'http://gagandeepsethi.com/salonDirectory/img/salonownerprofileimage/' + _this.minedata.saloninfo.profile_image;
                }
                _this.events.publish('user:created', localStorage['usertype'], localStorage['auth'], _this.name, _this.myimage, _this.myimage);
                console.log("hello pic hai ye" + JSON.stringify(_this.myimage));
            });
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
    SalonOwnerProfile2.prototype.editmyprofile = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading..' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.dataservice.editprofileinfo(_this.form3.controls['name'].value, _this.about_me, _this.form3.controls['email'].value, _this.form3.controls['mobile_number'].value, _this.user_id); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.leads = data;
                if (_this.leads.message == "your profile updated successfully") {
                    var alert_1 = _this.alertCtrl.create({
                        title: ' YOUR PROFILE UPDATED SUCCESSFULLY',
                        buttons: ['Dismiss']
                    });
                    alert_1.present();
                    _this.v = false;
                    // this.navCtrl.setRoot('MySalonHome')       
                    _this.ngOnInit();
                }
            });
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
    SalonOwnerProfile2.prototype.saveimage = function (pic) {
        var _this = this;
        var b = localStorage['salonid'];
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        var options = {
            fileKey: "profile_image",
            chunkedMode: false,
            mimeType: "image/jpg",
            fileName: 'name.jpg',
        };
        var fileTransfer = this.transfer.create();
        fileTransfer.upload(this.pic, 'http://gagandeepsethi.com/salonDirectory/WebServices/salonOwnerProfileImage/' + b + '.json', options)
            .then(function (data) {
            loader.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Thank you!',
                subTitle: 'Image Uploaded  Successfully',
                buttons: ['OK']
            });
            alert.present();
            _this.ngOnInit();
            // this.navCtrl.push('MySalonHome')
        }),
            function (err) {
                // alert(JSON.stringify(err))
                loader.dismiss();
            };
    };
    SalonOwnerProfile2 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-salon-owner-profile2',
            templateUrl: 'salon-owner-profile2.html',
        }),
        __metadata("design:paramtypes", [NavController, DataService,
            NavParams, AlertController, FormBuilder,
            LoadingController, Camera,
            FileTransfer, Events])
    ], SalonOwnerProfile2);
    return SalonOwnerProfile2;
}());
export { SalonOwnerProfile2 };
//# sourceMappingURL=salon-owner-profile2.js.map