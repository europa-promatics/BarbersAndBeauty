var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeUploadImages } from './employee-upload-images';
var EmployeeUploadImagesModule = /** @class */ (function () {
    function EmployeeUploadImagesModule() {
    }
    EmployeeUploadImagesModule = __decorate([
        NgModule({
            declarations: [
                EmployeeUploadImages,
            ],
            imports: [
                IonicPageModule.forChild(EmployeeUploadImages),
            ],
            exports: [
                EmployeeUploadImages
            ]
        })
    ], EmployeeUploadImagesModule);
    return EmployeeUploadImagesModule;
}());
export { EmployeeUploadImagesModule };
//# sourceMappingURL=employee-upload-images.module.js.map