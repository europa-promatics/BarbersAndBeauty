var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Network } from '@ionic-native/network';
import { DataService } from "../providers/data-service";
import { File } from '@ionic-native/file';
import { NgCalendarModule } from 'ionic2-calendar';
import { PayPal } from '@ionic-native/paypal';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Device } from 'ionic-native';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Facebook } from '@ionic-native/facebook';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Crop } from '@ionic-native/crop';
import { FCM } from '@ionic-native/fcm';
// const cloudSettings: CloudSettings = {
//   'core': {
//     'app_id': '99c3d0f4'
//   },
//   'push': {
//     'sender_id': '1029737170144',
//     'pluginConfig': {
//       'ios': {
//         'badge': true,
//         'sound': true
//       },
//       'android': {
//         'iconColor': '#ff0000'
//       }
//     }
//   }
// };
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
            ],
            imports: [
                NgCalendarModule,
                BrowserModule,
                HttpModule,
                // CloudModule.forRoot(cloudSettings),
                IonicModule.forRoot(MyApp, {
                    pageTransition: 'md-transition',
                    templateUrl: 'build/app.html',
                    config: {
                        platforms: {
                            ios: {
                                statusbarPadding: true
                            }
                        }
                    }
                })
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
            ],
            providers: [
                StatusBar,
                SplashScreen,
                Geolocation,
                CallNumber,
                Camera,
                Facebook,
                DataService,
                Network,
                File,
                Device,
                InAppBrowser,
                PayPal,
                SocialSharing,
                FileTransfer,
                FileTransferObject,
                LaunchNavigator,
                LocationAccuracy,
                Crop, FCM,
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map