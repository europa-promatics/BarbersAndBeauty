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
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the MySalonImageUpload page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MySalonImageUpload = /** @class */ (function () {
    function MySalonImageUpload(navCtrl, navParams, actionSheetCtrl, camera, transfer, file, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
    }
    MySalonImageUpload.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MySalonImageUpload');
    };
    MySalonImageUpload.prototype.showsheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Pick an option',
            buttons: [
                {
                    text: 'Upload from Camera',
                    role: 'destructive',
                    handler: function () {
                        _this.pic = '';
                        _this.camera.getPicture({
                            quality: 75,
                            destinationType: _this.camera.DestinationType.DATA_URL,
                            encodingType: _this.camera.EncodingType.JPEG,
                            mediaType: _this.camera.MediaType.PICTURE,
                            sourceType: 1,
                            correctOrientation: true
                        }).then(function (imageData) {
                            // alert(imageData)
                            _this.pic = 'data:image/jpeg;base64,' + imageData;
                            // alert("camera"+this.pic)
                            _this.saveimage(_this.pic);
                        }, function (err) {
                            // alert(JSON.stringify(err))
                        });
                    }
                },
                {
                    text: 'Select From gallery',
                    handler: function () {
                        _this.pic = '';
                        _this.camera.getPicture({
                            quality: 75,
                            destinationType: _this.camera.DestinationType.DATA_URL,
                            encodingType: _this.camera.EncodingType.JPEG,
                            mediaType: _this.camera.MediaType.PICTURE,
                            sourceType: 2,
                            correctOrientation: true
                        }).then(function (imageData) {
                            var base64Image = 'data:image/jpeg;base64,' + imageData;
                            // alert(base64Image)
                            _this.pic = base64Image;
                            // alert("galery"+this.pic)
                            _this.saveimage(_this.pic);
                        }, function (err) {
                            // alert(JSON.stringify(err))
                        });
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
    MySalonImageUpload.prototype.showsheet2 = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Pick an option',
            buttons: [
                {
                    text: 'Upload from Camera',
                    role: 'destructive',
                    handler: function () {
                        _this.pic = '';
                        _this.camera.getPicture({
                            quality: 75,
                            destinationType: _this.camera.DestinationType.DATA_URL,
                            encodingType: _this.camera.EncodingType.JPEG,
                            mediaType: _this.camera.MediaType.PICTURE,
                            correctOrientation: true,
                            sourceType: 1
                        }).then(function (imageData) {
                            // alert(imageData)
                            _this.pic = 'data:image/jpeg;base64,' + imageData;
                            _this.saveimageToGallery(_this.pic);
                        }, function (err) {
                            // alert(JSON.stringify(err))
                        });
                    }
                },
                {
                    text: 'Select From gallery',
                    handler: function () {
                        _this.pic = '';
                        _this.camera.getPicture({
                            quality: 75,
                            destinationType: _this.camera.DestinationType.DATA_URL,
                            encodingType: _this.camera.EncodingType.JPEG,
                            mediaType: _this.camera.MediaType.PICTURE,
                            sourceType: 2,
                            correctOrientation: true
                        }).then(function (imageData) {
                            var base64Image = 'data:image/jpeg;base64,' + imageData;
                            // alert(base64Image)
                            _this.pic = base64Image;
                            // alert("galery"+this.pic)
                            _this.saveimageToGallery(_this.pic);
                        }, function (err) {
                            // alert(JSON.stringify(err))
                        });
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
    MySalonImageUpload.prototype.saveimage = function (pic) {
        var _this = this;
        // alert(pic)
        var b = localStorage['salonid'];
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        var options = {
            fileKey: "salon_image",
            chunkedMode: false,
            mimeType: "image/jpg",
            fileName: 'name.jpg',
        };
        var fileTransfer = this.transfer.create();
        fileTransfer.upload(this.pic, 'http://gagandeepsethi.com/salonDirectory/WebServices/salonImage/' + b + '.json', options)
            .then(function (data) {
            loader.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Thank you!',
                subTitle: 'Image Uploaded Successfully',
                buttons: ['OK']
            });
            alert.present();
            _this.navCtrl.push('SalonImageGallery');
        }),
            function (err) {
                // alert(JSON.stringify(err))
                loader.dismiss();
            };
    };
    MySalonImageUpload.prototype.saveimageToGallery = function (pic) {
        var _this = this;
        // alert('insde save func')
        //     alert(pic)
        var b = localStorage['salonid'];
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        var options = {
            fileKey: "gallery_image",
            chunkedMode: false,
            mimeType: "image/jpg",
            fileName: 'name.jpg',
        };
        var fileTransfer = this.transfer.create();
        fileTransfer.upload(this.pic, 'http://gagandeepsethi.com/salonDirectory/WebServices/salonGalleryImage/' + b + '.json', options)
            .then(function (data) {
            loader.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Thank you!',
                subTitle: 'Image Saved To Gallery Successfully',
                buttons: ['OK']
            });
            alert.present();
            _this.navCtrl.push('SalonImageGallery');
        }),
            function (err) {
                // alert(JSON.stringify(err))
                loader.dismiss();
            };
    };
    MySalonImageUpload.prototype.gallery_open = function () {
        this.navCtrl.push('SalonImageGallery');
    };
    MySalonImageUpload = __decorate([
        IonicPage(),
        Component({
            selector: 'page-my-salon-image-upload',
            templateUrl: 'my-salon-image-upload.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ActionSheetController,
            Camera,
            FileTransfer,
            File,
            LoadingController,
            AlertController])
    ], MySalonImageUpload);
    return MySalonImageUpload;
}());
export { MySalonImageUpload };
//# sourceMappingURL=my-salon-image-upload.js.map