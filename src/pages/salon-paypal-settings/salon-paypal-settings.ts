import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController,ModalController,AlertController
 } from 'ionic-angular';

/**
 * Generated class for the SalonPaypalSettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-salon-paypal-settings',
  templateUrl: 'salon-paypal-settings.html',
})
export class SalonPaypalSettingsPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,public navParams: NavParams,public modalCtrl: ModalController,private alertCtrl:AlertController,private loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalonPaypalSettingsPage');
  }

  cancel(){
    this.viewCtrl.dismiss();
 
  }
  
  save(price){
  	
  	this.viewCtrl.dismiss(price)
  }

}
