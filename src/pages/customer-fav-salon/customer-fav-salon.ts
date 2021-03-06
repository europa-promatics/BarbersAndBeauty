import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import {DataService}  from '../../providers/data-service';
import { Observable} from "rxjs/Rx";
@IonicPage()
@Component({
  selector: 'page-customer-fav-salon',
  templateUrl: 'customer-fav-salon.html',
})
export class CustomerFavSalon {
  favlist;
  favdata;
  favlistdata;
  updatedsalonlist
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public loadingCtrl:LoadingController,public alertCtrl:AlertController,
  private dataservice:DataService) {
  }
  ngOnInit(){
    let loading = this.loadingCtrl.create({content: 'Please Wait...'});
    Observable.fromPromise(loading.present())
    .flatMap(data => this.dataservice.FavList())
    .subscribe(data =>
      loading.dismiss().then(() =>{ 
        console.log(data);
        this.favlist = data
        this.favlistdata=this.favlist.favouritesalonlist;
        this.updatedsalonlist=this.favlist.favouritesalonlist;
      if(data.message=="No favourite salon"){
	  this.favdata="false";
	  }
	  }),error =>
        loading.dismiss().then(() => {
          let alert=this.alertCtrl.create({
            title:'SERVER ERROR',
            subTitle:'Please Try Again',
            buttons:['Ok']
          })         
          alert.present()
        })
    ); 
  }
  getItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != ''){
      this.favlistdata = this.favlistdata.filter((p) => {
        return (p.salon_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.favlistdata = this.updatedsalonlist;
    }
  }
  detail(id,salonimage){
    // alert("hello salonid"+id)
    this.navCtrl.push('Customersalondetail',{salondetail:id,salonimg:salonimage})
  }
}