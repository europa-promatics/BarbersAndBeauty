var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearBySalon } from './near-by-salon';
var NearBySalonModule = /** @class */ (function () {
    function NearBySalonModule() {
    }
    NearBySalonModule = __decorate([
        NgModule({
            declarations: [
                NearBySalon,
            ],
            imports: [
                IonicPageModule.forChild(NearBySalon),
            ],
            exports: [
                NearBySalon
            ]
        })
    ], NearBySalonModule);
    return NearBySalonModule;
}());
export { NearBySalonModule };
//# sourceMappingURL=near-by-salon.module.js.map