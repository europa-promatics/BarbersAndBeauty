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
import { Crop } from '@ionic-native/crop';
/**
 * Generated class for the EmployeeViewEditProfile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EmployeeViewEditProfile = /** @class */ (function () {
    function EmployeeViewEditProfile(navCtrl, navParams, alertCtrl, actionSheetCtrl, camera, transfer, loadingCtrl, events, file, formBuilder, crop, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.file = file;
        this.formBuilder = formBuilder;
        this.crop = crop;
        this.disableStatus = false;
        this.data = {};
        this.edit = 'false';
        this.http = http;
        this.employeeid = localStorage['employeeid'];
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var name = /^([a-zA-Z ]){1,30}$/;
        var numberregex = /^\d+$/;
        var namevalidation = /^[^-\s][a-zA-Z_\s-]+$/;
        // let number=/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
        this.custregister = formBuilder.group({
            username: ['', Validators.compose([Validators.pattern(namevalidation), Validators.required])],
            // useraddress: ['', Validators.compose([Validators.pattern(name),Validators.required])],
            useremail: ['', Validators.compose([Validators.pattern(emailRegex), Validators.required])],
            usernumber: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(15), Validators.pattern(numberregex), Validators.required])],
        });
    }
    EmployeeViewEditProfile.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var link = 'http://gagandeepsethi.com/salonDirectory/WebServices/employeeViewProfile.json';
        var data = JSON.stringify({
            employee_id: this.employeeid,
        });
        this.http.post(link, data)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            _this.viewinfo = data;
            console.log("response" + JSON.stringify(_this.viewinfo));
            _this.username = _this.viewinfo.employeedata.full_name;
            _this.email = _this.viewinfo.employeedata.email;
            _this.number = _this.viewinfo.employeedata.contact_number;
            _this.customerpic = _this.viewinfo.employeedata.profile_image;
            if (_this.customerpic == 'null' || _this.customerpic == null) {
                _this.pic = 'assets/img/user.jpg';
            }
            else {
                _this.pic = 'http://gagandeepsethi.com/salonDirectory/img/employeeprofileimage/' + _this.viewinfo.employeedata.profile_image;
            }
            _this.events.publish('user:created', localStorage['usertype'], localStorage['auth'], _this.username, _this.pic, _this.pic);
            //console.log("hello pic hai ye"+JSON.stringify(this.customerpic))
        });
    };
    EmployeeViewEditProfile.prototype.update = function () {
        this.edit = 'true';
    };
    EmployeeViewEditProfile.prototype.save = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var link = 'http://gagandeepsethi.com/salonDirectory/WebServices/employeeProfileEdit.json';
        var data = JSON.stringify({
            employee_id: this.employeeid,
            full_name: this.username,
            email: this.email,
            contact_number: this.number,
        });
        this.http.post(link, data)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            loading.dismiss();
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
        });
    };
    EmployeeViewEditProfile.prototype.userimage = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'UPLOAD PROFILE IMAGE',
            buttons: [
                {
                    text: 'Upload from Camera',
                    role: 'Upload from Camera',
                    handler: function () {
                        console.log('Upload from Camera');
                        _this.fromcamera();
                    }
                },
                {
                    text: 'Upload from Gallery',
                    handler: function () {
                        _this.fromgallery();
                        console.log('Gallery clicked');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    EmployeeViewEditProfile.prototype.fromgallery = function () {
        var _this = this;
        // alert("inside gallery")
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then(function (imageData) {
            var base64Image = imageData;
            var c = base64Image;
            _this.cropImage(c);
            var a = localStorage['employeeid'];
        }, function (err) {
            console.log('Gallery is not Working');
        });
    };
    EmployeeViewEditProfile.prototype.fromcamera = function () {
        var _this = this;
        //alert("inside camera")
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then(function (imageData) {
            var base64Image = imageData;
            var c = base64Image;
            _this.cropImage(c);
            var a = localStorage['employeeid'];
            // this.func1(a);
        }, function (err) {
            console.log('Camera is not Working');
        });
    };
    EmployeeViewEditProfile.prototype.cropImage = function (img) {
        var _this = this;
        this.crop.crop(img, { quality: 75 })
            .then(function (newImage) {
            console.log('new image path is: ' + newImage);
            // alert('new image')
            _this.pic = newImage;
            var a = localStorage['employeeid'];
            _this.func1(a);
        }, function (error) {
            // alert('error')
            console.error('Error cropping image', error);
        });
    };
    EmployeeViewEditProfile.prototype.func1 = function (user_id) {
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
        fileTransfer.upload(this.pic, 'http://gagandeepsethi.com/salonDirectory/WebServices/employeeUpdatedImage/' + b + '.json', options)
            .then(function (data) {
            loader.dismiss();
            _this.data.response = data;
            var alert = _this.alertCtrl.create({
                title: 'Thank you!',
                subTitle: 'Image Uploaded Successfully',
                buttons: ['OK']
            });
            alert.present();
            _this.ngOnInit();
        })
            , function (err) {
                loader.dismiss();
                var alert = _this.alertCtrl.create({
                    title: 'Error!',
                    subTitle: 'Try Again!',
                    buttons: ['OK']
                });
                alert.present();
            };
    };
    EmployeeViewEditProfile.prototype.validationcheck = function (form) {
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
    EmployeeViewEditProfile = __decorate([
        IonicPage(),
        Component({
            selector: 'page-employee-view-edit-profile',
            templateUrl: 'employee-view-edit-profile.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            AlertController,
            ActionSheetController,
            Camera,
            FileTransfer,
            LoadingController,
            Events,
            File,
            FormBuilder,
            Crop,
            Http])
    ], EmployeeViewEditProfile);
    return EmployeeViewEditProfile;
}());
export { EmployeeViewEditProfile };
//# sourceMappingURL=employee-view-edit-profile.js.map