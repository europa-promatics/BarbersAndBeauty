var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySalonSubscrptionPage2 } from './my-salon-subscrption-page2';
var MySalonSubscrptionPage2Module = /** @class */ (function () {
    function MySalonSubscrptionPage2Module() {
    }
    MySalonSubscrptionPage2Module = __decorate([
        NgModule({
            declarations: [
                MySalonSubscrptionPage2,
            ],
            imports: [
                IonicPageModule.forChild(MySalonSubscrptionPage2),
            ],
            exports: [
                MySalonSubscrptionPage2
            ]
        })
    ], MySalonSubscrptionPage2Module);
    return MySalonSubscrptionPage2Module;
}());
export { MySalonSubscrptionPage2Module };
//# sourceMappingURL=my-salon-subscrption-page2.module.js.map