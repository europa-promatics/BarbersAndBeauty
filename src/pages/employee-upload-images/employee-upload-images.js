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
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Http } from '@angular/http';
import 'rxjs/Rx';
var EmployeeUploadImages = /** @class */ (function () {
    function EmployeeUploadImages(navCtrl, navParams, actionSheetCtrl, alertCtrl, loadingCtrl, camera, file, http, transfer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.camera = camera;
        this.file = file;
        this.transfer = transfer;
        this.iconshow = 'false';
        this.http = http;
        this.data = {};
    }
    EmployeeUploadImages.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select image source!',
            buttons: [
                {
                    text: 'Camera',
                    icon: 'camera',
                    handler: function () {
                        _this.uploadpic(1);
                        console.log('Camera clicked');
                    }
                }, {
                    text: 'Gallery',
                    icon: 'images',
                    handler: function () {
                        _this.uploadpic(2);
                        console.log('Gallery clicked');
                    }
                }, {
                    text: 'Cancel',
                    icon: 'close-circle',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    EmployeeUploadImages.prototype.uploadpic = function (a) {
        var _this = this;
        if (a == 2) {
            this.camera.getPicture({
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
                var b = localStorage['employeeid'];
                _this.upload(b);
            }, function (err) {
                console.log('Camera is not Working');
            });
            // let options = {maximumImagesCount: 1,width: 300,height: 300,quality: 75}
            // ImagePicker.getPictures(options).then( (file_uris) => { this.pic = file_uris[0]} );
        }
        else if (a == 1) {
            this.camera.getPicture({
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
                var a = localStorage['employeeid'];
                _this.upload(a);
            }, function (err) {
                console.log('Camera is not Working');
            });
        }
    };
    EmployeeUploadImages.prototype.upload = function (user_id) {
        var _this = this;
        console.log(this.pic);
        var b = user_id;
        // alert("employee id"+b)
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        var options = {
            fileName: 'image.jpg',
            fileKey: "employee_previous_work_image",
            chunkedMode: false,
            mimeType: "image/jpg",
        };
        var fileTransfer = this.transfer.create();
        fileTransfer.upload(this.pic, 'http://gagandeepsethi.com/salonDirectory/WebServices/employeePreviousWorkImageUpload/' + b + '.json', options)
            .then(function (data) {
            _this.resdata = data;
            _this.noimage = false;
            loader.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Thank you!',
                subTitle: 'Image Uploaded Successfully',
                buttons: ['OK']
            });
            alert.present();
            _this.ngOnInit();
            _this.iconshow = 'false';
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
    EmployeeUploadImages.prototype.ngOnInit = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        var link = 'http://gagandeepsethi.com/salonDirectory/WebServices/employeePreviousWorkImageShow.json';
        var data = JSON.stringify({
            employee_id: localStorage['employeeid']
        });
        this.http.post(link, data)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            loader.dismiss();
            _this.viewimage = data;
            console.log(JSON.stringify(_this.viewimage.status));
            _this.uploadpics = _this.viewimage.image;
            if (_this.viewimage.status == 0) {
                _this.noimage = true;
            }
            (function (error) {
            });
        });
    };
    EmployeeUploadImages.prototype.Delete = function (imagedelete) {
        var _this = this;
        // alert(imagedelete)
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        var link = 'http://gagandeepsethi.com/salonDirectory/WebServices/deleteEmployeePreviousWorkImageByNameId.json';
        var data = JSON.stringify({
            id: localStorage['employeeid'],
            image: imagedelete
        });
        this.http.post(link, data)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            loader.dismiss();
            _this.deleteresponse = data;
            if (_this.deleteresponse.status == 1) {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Alert!',
                    subTitle: 'Image Deleted Successfully',
                    buttons: ['OK']
                });
                alert_1.present();
                _this.ngOnInit();
            }
            (function (error) {
            });
        });
    };
    EmployeeUploadImages.prototype.showicons = function () {
        this.iconshow = 'true';
    };
    EmployeeUploadImages = __decorate([
        IonicPage(),
        Component({
            selector: 'page-employee-upload-images',
            templateUrl: 'employee-upload-images.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ActionSheetController,
            AlertController,
            LoadingController,
            Camera,
            File, Http,
            FileTransfer])
    ], EmployeeUploadImages);
    return EmployeeUploadImages;
}());
export { EmployeeUploadImages };
//# sourceMappingURL=employee-upload-images.js.map