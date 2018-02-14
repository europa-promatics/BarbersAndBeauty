var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySalonSubscrptionPage3 } from './my-salon-subscrption-page3';
var MySalonSubscrptionPage3Module = /** @class */ (function () {
    function MySalonSubscrptionPage3Module() {
    }
    MySalonSubscrptionPage3Module = __decorate([
        NgModule({
            declarations: [
                MySalonSubscrptionPage3,
            ],
            imports: [
                IonicPageModule.forChild(MySalonSubscrptionPage3),
            ],
            exports: [
                MySalonSubscrptionPage3
            ]
        })
    ], MySalonSubscrptionPage3Module);
    return MySalonSubscrptionPage3Module;
}());
export { MySalonSubscrptionPage3Module };
//# sourceMappingURL=my-salon-subscrption-page3.module.js.map