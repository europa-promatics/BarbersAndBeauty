import {Component} from '@angular/core';
import {IonicPage,NavController,NavParams,ModalController,LoadingController,AlertController} from 'ionic-angular';
import {DataService} from "../../providers/data-service"
import {Observable} from "rxjs/Rx";
import {ModalAutocompleteItems} from '../modal-autocomplete-items/modal-autocomplete-items';
import {LocationAccuracy} from '@ionic-native/location-accuracy';
import {FormControl,FormGroup,Validators,FormBuilder} from '@angular/forms';
import {Geolocation} from '@ionic-native/geolocation';
declare var google
@IonicPage()
@Component({
    selector: 'page-salon-buisness-info',
    templateUrl: 'salon-buisness-info.html',
})
export class SalonBuisnessInfo {
    id
    mydata
    minedata
    mysalon_name
    myaddress
    mydescription
    mycontact_number
    salon_name
    salon_description
    website
    schedule_value
    parking_value
    contact_number
    leads
    v: boolean = false;
    schedule_array = []
    ourdata
    mon
    tue
    wed
    thurs
    fri
    sat
    sun
    fb
    insta
    wheelchair
    wifi
    description;
    address: any = {
        place: '',
        set: false,
    };
    placesService: any;
    map: any;
    markers = [];
    placedetails: any;
    http;
    userlat
    userlng
    city
    savebtn
    district
    postalcode
    splitted2
    splitted1
    splitted3
    splitted4
    splitted5
    splitted6
    splitted7
    splitted22
    splitted11
    splitted33
    splitted44
    splitted55
    splitted66
    splitted77
    a
    lat
    lng
    ress
    fulladdress
    form3: FormGroup
    constructor(public navCtrl: NavController,
        private dataservice: DataService,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private locationAccuracy: LocationAccuracy,
        private geolocation: Geolocation,
        public loadingCtrl: LoadingController,
        public modalCtrl: ModalController, public formBuilder: FormBuilder) {
        let name = /^([a-zA-Z ]){2,30}$/;
        let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
        let namevalidation = /^[^-\s][a-zA-Z0-9_\s-]+$/
        this.form3 = formBuilder.group({
            mysalon_name: ['', Validators.compose([Validators.pattern(namevalidation), Validators.required])],
            fulladdress: ['', Validators.compose([Validators.required])],
            mycontact_number: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(10), Validators.pattern("[0-9]*"), Validators.required])],
            schedule_value: ['', Validators.compose([Validators.required])],
            mydescription: ['', Validators.compose([Validators.pattern(namevalidation), Validators.required])],
        });
        this.savebtn = 'false'
        this.id = localStorage['salonid'];
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad SalonBuisnessInfo');
    }
    editprofile() {
        this.v = !this.v
        this.savebtn = 'true'
    }
    ngOnInit() {
        this.request()
        this.currentlocation()
        let loading = this.loadingCtrl.create({content: 'Loading...'});
        Observable.fromPromise(loading.present())
            .flatMap(data => this.dataservice.viewbusinessinfo(this.id))
            .subscribe(data =>
                loading.dismiss().then(() => {
                        this.minedata = data
                        this.mysalon_name = this.minedata.saloninfo.salon_name
                        this.fulladdress = this.minedata.saloninfo.address
                        this.district = this.minedata.saloninfo.city
                        this.postalcode = this.minedata.saloninfo.post_code
                        this.mydescription = this.minedata.saloninfo.salon_description
                        this.mycontact_number = this.minedata.saloninfo.contact_number
                        this.website = this.minedata.saloninfo.website
                        this.schedule_value = this.minedata.saloninfo.schedule
                        this.parking_value = this.minedata.saloninfo.parking
                        this.fb = this.minedata.saloninfo.facebooklink
                        this.insta = this.minedata.saloninfo.instagramlink
                        this.wheelchair = this.minedata.saloninfo.wheelchair
                        this.wifi = this.minedata.saloninfo.wifi
                    }),error =>
                          loading.dismiss().then(() => {
                              let alert = this.alertCtrl.create({
                                  title: 'Timeout',
                                  subTitle: 'Please Try Again',
                                  buttons: ['Ok']
                              })
                              loading.dismiss();
                              alert.present()
                          })
            );
    }
    save() {
        let loading = this.loadingCtrl.create({content: 'Loading..'});
        Observable.fromPromise(loading.present())
            .flatMap(data => this.dataservice.postbusinessinfo(this.userlat,
                this.userlng,
                this.mysalon_name, this.fulladdress, this.district, this.postalcode,
                this.mydescription,
                this.mycontact_number, this.website, this.parking_value,
                this.schedule_value, this.id, this.fb, this.insta,
                this.wheelchair, this.wifi))
            .subscribe(data =>
                loading.dismiss().then(() => {
                    this.leads = data
                    if (this.leads.message == "your profile updated successfully") {
                        let alert = this.alertCtrl.create({
                            title: 'BUSINESS INFORMATION UPDATED SUCCESSFULLY',
                            buttons: ['Dismiss']
                        });
                        alert.present();
                    }
                    this.v = false
                    this.navCtrl.pop();
                }),
                error =>
                loading.dismiss().then(() => {
                    let alert = this.alertCtrl.create({
                        title: 'Timeout',
                        subTitle: 'Please Try Again',
                        buttons: ['Ok']
                    })
                    loading.dismiss();
                    alert.present()
                })
            );
    }
    currentlocation() {
        this.geolocation.getCurrentPosition().then((resp) => {
            console.log("helo lat" + resp.coords.latitude)
            console.log("hello lng" + resp.coords.longitude)
            this.userlat = resp.coords.latitude;
            this.userlng = resp.coords.longitude;
        })
    }
    request() {
        this.locationAccuracy.canRequest().then((canRequest: boolean) => {
            if (canRequest) {
                this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
                        console.log('Request successful.')
                    },error => {
                        console.log('Error requesting location permissions', error)
                        let alert = this.alertCtrl.create({
                            title: 'Error!',
                            subTitle: 'Requesting location permissions',
                            buttons: ['ok']
                        });
                        alert.present();
                    }
                );
            }
        });
    }
    schedule_page() {
        let modal = this.modalCtrl.create('SalonSchedule')
        modal.present();
        modal.onDidDismiss(data => {
            this.ourdata = data
            this.mon = (this.ourdata.mon)
            this.tue = this.ourdata.tue
            console.log('hiii' + JSON.stringify(this.tue))
            this.wed = this.ourdata.wed
            this.thurs = this.ourdata.thu
            this.fri = this.ourdata.fri
            this.sat = this.ourdata.sat
            this.sun = this.ourdata.sun
            if (!this.mon || this.mon == "") {
                this.mon = ""
            } else {
                this.splitted1 = this.mon.split("-");
                this.mon = 'Monday' + ' ' + this.splitted1[0] + '-' + this.splitted1[1]
            }
            if (!this.tue || this.tue == "") {
                this.tue = ""
            } else {
                this.splitted2 = this.tue.split("-");
                this.tue = 'Tuesday' + ' ' + this.splitted2[0] + '-' + this.splitted2[1]
            }
            if (!this.wed || this.wed == "") {
                this.wed = ""
            } else {
                this.splitted3 = this.wed.split("-");
                this.wed = 'Wednesday' + ' ' + this.splitted3[0] + '-' + this.splitted3[1]
            }
            if (!this.thurs || this.thurs == "") {
                this.thurs = ""
            } else {
                this.splitted4 = this.thurs.split("-");
                this.thurs = 'Thursday' + ' ' + this.splitted4[0] + '-' + this.splitted4[1]
            }
            if (!this.fri || this.fri == "") {
                this.fri = ""
            } else {
                this.splitted5 = this.fri.split("-");
                this.fri = "Friday" + ' ' + this.splitted5[0] + '-' + this.splitted5[1]
            }
            if (!this.sat || this.sat == "") {
                this.sat = ""
            } else {
                this.splitted6 = this.sat.split("-");
                this.sat = "Saturday" + ' ' + this.splitted6[0] + '-' + this.splitted6[1]
            }
            if (!this.sun || this.sun == "") {
                this.sun = ""
            } else {
                this.splitted7 = this.sun.split("-");
                this.sun = "Sunday" + ' ' + this.splitted7[0] + '-' + this.splitted7[1]
            }
            this.schedule_value = this.mon + this.tue +
            this.wed + this.thurs + this.fri + this.sat + this.sun
            this.schedule_array.push(this.ourdata.mon)
            this.schedule_array.push(this.ourdata.tue)
            this.schedule_array.push(this.ourdata.wed)
            this.schedule_array.push(this.ourdata.thu)
            this.schedule_array.push(this.ourdata.fri)
            this.schedule_array.push(this.ourdata.sat)
            this.schedule_array.push(this.ourdata.sun)
            console.log(JSON.stringify(this.schedule_array))
        })
    }
    pickAddress() {
        let profileModal = this.modalCtrl.create('Clientlocation', {
            bidlat1: this.userlat,
            bidlng1: this.userlng
        });
        profileModal.onDidDismiss(data => {
            console.log("data" + JSON.stringify(data));
            this.fulladdress = data.address;
            this.userlat = data.lat;
            this.userlng = data.lng;
        });
        profileModal.present();
    }
}