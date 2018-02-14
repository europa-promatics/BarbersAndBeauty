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
import 'rxjs/Rx';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Events } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FormBuilder, Validators } from '@angular/forms';
var CustomerAccount = /** @class */ (function () {
    function CustomerAccount(navCtrl, alertCtrl, actionSheetCtrl, camera, transfer, loadingCtrl, events, file, formBuilder, navParams, http) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.file = file;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        this.disableStatus = false;
        this.http = http;
        this.data = {};
        this.edit = 'false';
        this.userid = localStorage['customerid'];
        //alert("hello id"+this.userid)
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var name = /^([a-zA-Z ]){1,30}$/;
        var numberregex = /^\d+$/;
        var namevalidation = /^[^-\s][a-zA-Z_\s-]+$/;
        // let number=/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
        this.custregister = formBuilder.group({
            username: ['', Validators.compose([Validators.pattern(namevalidation), Validators.required])],
            useraddress: ['', Validators.compose([Validators.required])],
            useremail: ['', Validators.compose([Validators.pattern(emailRegex), Validators.required])],
            usernumber: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(15), Validators.pattern(numberregex), Validators.required])],
        });
    }
    CustomerAccount.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var link = 'http://gagandeepsethi.com/salonDirectory/WebServices/customerViewProfile.json';
        var data = JSON.stringify({
            customer_id: this.userid,
        });
        this.http.post(link, data)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            loading.dismiss().then(function () {
                _this.viewinfo = data;
                console.log("response" + JSON.stringify(_this.viewinfo));
                _this.username = _this.viewinfo.customerdata.full_name;
                _this.email = _this.viewinfo.customerdata.email;
                _this.number = _this.viewinfo.customerdata.contact_number;
                _this.address = _this.viewinfo.customerdata.address;
                _this.customerpic = _this.viewinfo.customerdata.profile_image;
                if (_this.customerpic == 'null' || _this.customerpic == null) {
                    // this.pic=this.customerpic
                    _this.userpic = 'assets/img/user.jpg';
                }
                else {
                    var a = _this.customerpic.includes("http");
                    if (a == true || a == 'true') {
                        _this.userpic = _this.viewinfo.customerdata.profile_image;
                    }
                    else {
                        _this.userpic = 'http://gagandeepsethi.com/salonDirectory/img/customerprofileimage/' + _this.viewinfo.customerdata.profile_image;
                    }
                }
                _this.events.publish('user:created', localStorage['usertype'], localStorage['auth'], _this.username, _this.userpic, _this.userpic);
                console.log("hello pic hai ye" + JSON.stringify(_this.customerpic));
            }), function (error) {
                return loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        title: 'Something Went Wrong',
                        subTitle: 'Please Try Again',
                        buttons: ['Ok']
                    });
                    alert.present();
                });
            };
        });
    };
    CustomerAccount.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomerAccount');
    };
    CustomerAccount.prototype.update = function () {
        this.edit = 'true';
    };
    CustomerAccount.prototype.save = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please wait...' });
        loading.present();
        var link = 'http://gagandeepsethi.com/salonDirectory/WebServices/customerProfileEdit.json';
        var data = JSON.stringify({
            customer_id: this.userid,
            full_name: this.username,
            email: this.email,
            contact_number: this.number,
            address: this.address
        });
        this.http.post(link, data)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            loading.dismiss().then(function () {
                _this.editinfo = data;
                _this.edit = 'false';
                console.log("edit res" + JSON.stringify(_this.editinfo));
                if (_this.editinfo.message == 'your profile updated successfully') {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'ALERT!',
                        subTitle: 'Profile Updated Successfully',
                        buttons: ['ok']
                    });
                    alert_1.present();
                }
                _this.ngOnInit();
            }),
                function (error) {
                    return loading.dismiss().then(function () {
                        var alert = _this.alertCtrl.create({
                            title: 'Timeout',
                            subTitle: 'Please Try Again',
                            buttons: ['Ok']
                        });
                        alert.present();
                    });
                };
        });
    };
    CustomerAccount.prototype.userimage = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'UPLOAD PROFILE IMAGE',
            buttons: [
                {
                    text: 'Upload from Camera',
                    role: 'Upload from Camera',
                    icon: 'camera',
                    handler: function () {
                        console.log('Upload from Camera');
                        _this.fromcamera();
                    }
                },
                {
                    text: 'Upload from Gallery',
                    icon: 'images',
                    handler: function () {
                        _this.fromgallery();
                        console.log('Gallery clicked');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: 'close-circle',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    CustomerAccount.prototype.fromgallery = function () {
        var _this = this;
        // alert("inside gallery")
        this.camera.getPicture({
            quality: 75,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            targetHeight: 500,
            targetWidth: 500,
            correctOrientation: true
        }).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.pic = base64Image;
            var a = localStorage['customerid'];
            _this.func1(a);
        }, function (err) {
            console.log('Gallery is not Working');
        });
    };
    CustomerAccount.prototype.fromcamera = function () {
        var _this = this;
        // alert("inside camera")
        this.camera.getPicture({
            quality: 75,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            targetHeight: 500,
            targetWidth: 500,
            correctOrientation: true
        }).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.pic = base64Image;
            var a = localStorage['customerid'];
            _this.func1(a);
        }, function (err) {
            console.log('Camera is not Working');
        });
    };
    CustomerAccount.prototype.func1 = function (user_id) {
        // alert("hello user"+user_id);
        var _this = this;
        //alert ("hello pic"+this.pic)
        var b = user_id;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        var options = {
            fileName: 'image.jpg',
            fileKey: "profile_image",
            chunkedMode: false,
            mimeType: "image/jpg",
        };
        var fileTransfer = this.transfer.create();
        fileTransfer.upload(this.pic, 'http://gagandeepsethi.com/salonDirectory/WebServices/updatedCustomerImage/' + b + '.json', options)
            .then(function (data) {
            loader.dismiss().then(function () {
                _this.data.response = data;
                var alert = _this.alertCtrl.create({
                    title: 'Thank you!',
                    subTitle: 'Image Uploaded Successfully',
                    buttons: ['OK']
                });
                alert.present();
                _this.ngOnInit();
            }), function (err) {
                loader.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        title: 'Error!',
                        subTitle: 'Try Again!',
                        buttons: ['OK']
                    });
                    alert.present();
                });
            };
        });
    };
    CustomerAccount.prototype.validationcheck = function (form) {
        console.log("valid" + JSON.stringify(form));
        if (form == false || form == 'false') {
            // code...
            this.disableStatus = true;
        }
        else if (form == true || form == 'true') {
            this.disableStatus = false;
        }
        console.log("valid" + JSON.stringify(this.custregister.valid));
    };
    CustomerAccount = __decorate([
        IonicPage(),
        Component({
            selector: 'page-customer-account',
            templateUrl: 'customer-account.html',
        }),
        __metadata("design:paramtypes", [NavController,
            AlertController,
            ActionSheetController,
            Camera,
            FileTransfer,
            LoadingController,
            Events,
            File,
            FormBuilder,
            NavParams, Http])
    ], CustomerAccount);
    return CustomerAccount;
}());
export { CustomerAccount };
//# sourceMappingURL=customer-account.js.map