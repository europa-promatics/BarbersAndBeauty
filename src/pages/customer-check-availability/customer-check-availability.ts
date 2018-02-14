import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController,NavParams,ModalController,LoadingController,AlertController } from 'ionic-angular';
import {DataService}  from '../../providers/data-service';
import { Observable} from "rxjs/Rx";
import { NgCalendarModule  } from 'ionic2-calendar';
import {Http} from '@angular/http';
@IonicPage()
@Component({
  selector: 'page-customer-check-availability',
  templateUrl: 'customer-check-availability.html',
})
export class CustomerCheckAvailability {
  eventSource;
  viewTitle;
  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  }; // these are the variable used by the calendar.
  add;
  title;
  cost;
  time;
  icon;
  bookingdata
  addservicesdata;
  userid;
  http;
  service_id;
  data;
  barber_id
  content
  employeepic
  employeename;
  datecolor: string = null;
  bigdata = []
  bigdata1 = []
  servicear = []
  servicesname=[]
  secondarr=[]
  selectedcost=[]
  title1
  cost1
  time1
  model;
  selectedservicetitle
  selectedservicetime
  selectedservicecost
  updatedadddata
  deleteres
  timedata
  timedata1
  servicesid
  selectedsalonid
  selectedserviceid
  myDate
  myDate2
  salonid
  selecteddate
  employeeid
  noservices
  color
  choosentime
  totaltimevalue
  totalTime:number=0;
  endtime
  slot;
  totalcost:number=0;
  defaultcost:number=0;
  totalvalue
  selectedItem
  selectedhour
  selectedmin
  choosetime2
  endtime1
  endtime2
  starting
  end
  selectedservicehour
  selectedservicemin
  defaulttime1
  defaulttime2
  totalhour
  totalmin
  bookingid
  totalstartime
  bookeddate
  sevicearray
  totalvalue2
  timeselected1
  timeselected2
  serviceid
  currentHr1;
  currentMin1;
  currentHr2;
  currentMin2;
  serviceid2
  newserviceid
  starttime1
  starttime2
  starttime3
  accountsetting
  onlinebooking
  scheduleappointment
  allowmultiplebooking
  hournoticeforbooking
  hournoticeforCancel
  timeslotsavailable
  month:any=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  days:any=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  selectedMonth;
  daysinmonth;
  selectedYear;
  date:number;
  year;
  leapornot;
  totaldays;
  oddDays
  monthfirstday;
  selectDate:any;
  Currentdate
  selectm
  salonownername
  salonownerpic
  salonownerid
  employeebook
  salonownerbook
  currenthours
  Current_day_value
  Current_month_value
  Current_year_value
  box:any=['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','']
  checkEnable:boolean=true;
  date_selected=null;
  timeSlot_Wednesday
  timeSlot_Friday
  timeSlot_Sunday
  timeSlot_Monday
  timeSlot_Tuesday
  timeSlot_Thursday
  timeSlot_Saturday
  constructor(public navCtrl: NavController, http: Http,private alertCtrl: AlertController,
  private dataservice: DataService, public modalCtrl: ModalController,
  public navParams: NavParams, public loadingCtrl: LoadingController,
  public toastCtrl: ToastController) {
    this.http = http;
    this.timedata=[]
    this.slot=0;
    this.color='without';
    this.employeepic = this.navParams.get('pic')
    this.employeename = this.navParams.get('employeename')
    this.employeeid = this.navParams.get('employeeid')
    this.employeebook=this.navParams.get('employeebook')
    this.salonownername=this.navParams.get('salonownername')
    this.salonownerpic=this.navParams.get('salonownerpic')
    this.salonownerid=this.navParams.get('salonownerid')
    this.salonownerbook=this.navParams.get('salonbook')
    this.model = this.dataservice.value2.selectedservices;
    var currenttime=new Date();
    console.log("currenttime"+currenttime)
    console.log("hours"+currenttime.getHours())
    console.log("minutes"+currenttime.getMinutes())
    this.currenthours=currenttime.getHours()
    if (this.model ) {
      this.salonid = this.model.salon_id
      this.selectedservicetitle=this.model.title;
      this.selectedservicehour=this.model.time.hr;
      this.selectedservicemin=this.model.time.min;
      this.selectedservicecost=this.model.cost;
      this.selectedsalonid=this.model.salon_id;
      this.selectedserviceid=this.model.service_id;
      this.servicear.push(this.selectedserviceid)
      this.servicesname.push(this.selectedservicetitle)
      this.selectedcost.push(this.selectedservicecost)
    }
    let m=new Date();
    var today = new Date();
    console.log(today.getDay());
    this.Currentdate = today.getDate();
    // alert(this.Currentdate);
    console.log(this.Currentdate)
    var date=this.Currentdate;
    date=date<10?'0'+date:date;
    console.log(date);
    // this.Currentdate.toString().length()==1?this.Currentdate.toString();
    this.Current_month_value=today.getMonth()+1;
    this.Current_year_value=today.getFullYear();
    this.selectedYear=m.getFullYear()
    this.selectedMonth=m.getMonth()
    var month=this.selectedMonth+1;
    this.selecteddate=this.selectedYear+'-'+month+'-'+date;
    this.calculate();
  }
  ionViewDidEnter(){
    if (this.model) {
      this.servicear=[];
      this.servicesname=[];
      this.selectedcost=[];
      this.servicear.push(this.selectedserviceid)
      this.servicesname.push(this.selectedservicetitle)
      this.selectedcost.push(this.selectedservicecost)
    }
  }
  ngOnInit(){
    this.accountsetting_timeslots(new Date().getDay())  
  }
  accountsetting_timeslots(value?) {
    let loading = this.loadingCtrl.create({content: 'Please wait...'});
    loading.present();
    Observable.forkJoin(
      this.http.post('http://gagandeepsethi.com/salonDirectory/WebServices/accountSettingsGetBySalonId.json',{salon_id:this.salonid}).map((res:Response) => res.json()),
      this.http.post('http://gagandeepsethi.com/salonDirectory/WebServices/customerSideTimeSlot.json',{salon_id:this.salonid}).map((res:Response) => res.json()),
      this.http.post('http://gagandeepsethi.com/salonDirectory/WebServices/TimeSlot.json',{salon_id:this.salonid}).map((res:Response) => res.json())
    ).subscribe(data => {
      loading.dismiss();
      this.accountsetting = data[0]
      this.onlinebooking=this.accountsetting.data.online_booking;
      this.scheduleappointment=this.accountsetting.data.schedule_appointment;
      this.allowmultiplebooking=this.accountsetting.data.allow_multi_service_booking;
      this.hournoticeforbooking=this.accountsetting.data.hours_notice_for_online_booking;
      this.hournoticeforCancel=this.accountsetting.data.hours_notice_for_cancel_booking;
      this.timeslotsavailable= data[1]
      var time_slots:any=data[2]
      for(var i=0;i<=time_slots.slotdata.length-1;i++){
        if(time_slots.slotdata[i].Wednesday){
          this.timeSlot_Wednesday=time_slots.slotdata[i].Wednesday;
          if(value&&value==3){
            this.timedata=this.timeSlot_Wednesday
          }
        }
        else if(time_slots.slotdata[i].Friday){
          this.timeSlot_Friday=time_slots.slotdata[i].Friday;
          if(value&&value==5){
            this.timedata=this.timeSlot_Friday
          }
        }
        else if(time_slots.slotdata[i].Sunday){
          this.timeSlot_Sunday=time_slots.slotdata[i].Sunday;
          if(value&&value==0){
            this.timedata=this.timeSlot_Sunday
          }
        }
        else if(time_slots.slotdata[i].Monday){
          this.timeSlot_Monday=time_slots.slotdata[i].Monday;
          if(value&&value==1){
            this.timedata=this.timeSlot_Monday
          }
        }
        else if(time_slots.slotdata[i].Tuesday){
          this.timeSlot_Tuesday=time_slots.slotdata[i].Tuesday;
          if(value&&value==2){
            this.timedata=this.timeSlot_Tuesday
          }
        }
        else if(time_slots.slotdata[i].Thursday){
          this.timeSlot_Thursday=time_slots.slotdata[i].Thursday;
          if(value&&value==4){
            this.timedata=this.timeSlot_Thursday
          }
        }
        else if(time_slots.slotdata[i].Saturday){
          this.timeSlot_Saturday=time_slots.slotdata[i].Saturday;
          if(value&&value==6){
            this.timedata=this.timeSlot_Saturday
          }
        }
        else{}
      }
    },(err) => {
      loading.dismiss();
      let alert=this.alertCtrl.create({
      title:'SERVER ERROR',
      subTitle:'Please Try Again',
      buttons:['Ok']
      })
      alert.present()
      console.error(err)
    });
  }
  check(value){
    if(value&&value==3){
      this.timedata=this.timeSlot_Wednesday
    }
    if(value&&value==5){
      this.timedata=this.timeSlot_Friday
    }
    if(value&&value==0){
      this.timedata=this.timeSlot_Sunday
    }
    if(value&&value==1){
      this.timedata=this.timeSlot_Monday
    }
    if(value&&value==2){
      this.timedata=this.timeSlot_Tuesday
    }
    if(value&&value==4){
      this.timedata=this.timeSlot_Thursday
    }
    if(value&&value==6){
      this.timedata=this.timeSlot_Saturday
    }
  }
  calculate(){
    if((this.selectedYear % 4 == 0 && this.selectedYear % 100 !=0) || this.selectedYear % 400 == 0 )
    {
      this.leapornot='leap'
      this.totaldays=366;
      if(this.selectedMonth+1==1 || this.selectedMonth+1==3 || this.selectedMonth+1==5 || this.selectedMonth+1==7 || this.selectedMonth+1==8 || this.selectedMonth+1==10 || this.selectedMonth+1==12)
      {this.daysinmonth=31;}
      if(this.selectedMonth+1==2)
      {this.daysinmonth=29;}
      if(this.selectedMonth+1==4 || this.selectedMonth+1==6 || this.selectedMonth+1==9 || this.selectedMonth+1==11) 
      {this.daysinmonth=30;}
    }else{
      this.leapornot='not leap'
      this.totaldays=365;
      if(this.selectedMonth+1==1 || this.selectedMonth+1==3 || this.selectedMonth+1==5 || this.selectedMonth+1==7 || this.selectedMonth+1==8 || this.selectedMonth+1==10 || this.selectedMonth+1==12)
      {this.daysinmonth=31;}
      if(this.selectedMonth+1==2)
      {this.daysinmonth=28;}
      if(this.selectedMonth+1==4 || this.selectedMonth+1==6 || this.selectedMonth+1==9 || this.selectedMonth+1==11) 
      {this.daysinmonth=30;}
    }
    this.calculatedays();
    let z=1 
    for(let i=0;i<this.box.length;i++){
      if(i>=this.monthfirstday){
        if(z<=this.daysinmonth){
          this.box[i]=z;
          z++;
        }
        else{
          this.box[i]=null;
        }
      }else{
        this.box[i]=null;
      }
    }
  }
  previousMonth(){
    if((this.Current_month_value-1)==this.selectedMonth&&this.Current_year_value==this.selectedYear){
    }else{
    document.getElementById(this.datecolor).style.background = '#fff';
    document.getElementById(this.datecolor).style.color = "#000";
      if(this.selectedMonth>0){
        this.selectedMonth=this.selectedMonth-1;  
      }else{
        this.selectedMonth=11;
        this.selectedYear--;
      }
      // if(this.date_selected!=null){
      //   this.selectm=this.selectedMonth+1;
      //   this.selecteddate=this.selectedYear+'-'+this.selectm+'-'+this.date_selected;
      // }
      this.checkEnable=true;
      this.calculate();
      this.timedata=[];
    }
  }
  nextMonth(){
  document.getElementById(this.datecolor).style.background = '#fff';
    document.getElementById(this.datecolor).style.color = "#000";
    if(this.selectedMonth<11){
      this.selectedMonth=this.selectedMonth+1;  
    }else{
      this.selectedMonth=0;
      this.selectedYear++;
    }
    // if(this.date_selected!=null){
    //   this.selectm=this.selectedMonth+1;
    //   this.selecteddate=this.selectedYear+'-'+this.selectm+'-'+this.date_selected;
    // }
    this.checkEnable=true;
    this.calculate();
    this.timedata=[];
  }
  calculatedays(){
    let d=0;
    this.oddDays = this.selectedYear % 400
    console.log(this.oddDays)
    for(let i=this.oddDays;i>0;i--){
      if((i % 4 == 0 && i % 100 != 0) || i % 400 == 0){
        d=d+2
        console.log('leap')
      }else{
        d=d+1
        console.log('not leap')
      } 
    }
    if(d>7){
      d = d % 7
    }
    let a = this.odddaysinmonth();
    console.log((a+d)%7)
    this.monthfirstday=(a+d)%7;
  }
  odddaysinmonth(){
    let d=0
    let m=[31,28,31,30,31,30,31,31,30,31,30,31]
    for(let i=0;i<this.selectedMonth;i){
      d=d+m[i];i++;
    } 
    if((this.selectedYear % 4 == 0 && this.selectedYear % 100 !=0) || this.selectedYear % 400 == 0){
      d=d+1;
    }  
    return d;
  }
  pickDate(value,index?){
    if(index%7==1){
      console.log('Sun')
      this.timedata=this.timeSlot_Sunday;
    }else if(index%7==2){
      console.log('Mon')
      this.timedata=this.timeSlot_Monday;
    }else if(index%7==3){
      console.log('Tue')
      this.timedata=this.timeSlot_Tuesday;
    }else if(index%7==4){
      console.log('Wed')
      this.timedata=this.timeSlot_Wednesday;
    }else if(index%7==5){
      console.log('Thu')
      this.timedata=this.timeSlot_Thursday;
    }else if(index%7==6){
      console.log('Fri')
      this.timedata=this.timeSlot_Friday;
    }else if(index%7==0){
      console.log('Sat')
      this.timedata=this.timeSlot_Saturday;
    }
    this.selectedItem=null
    this.checkEnable=true
    if(value!=null){
      if(this.datecolor!=null){
        document.getElementById(this.datecolor).style.background = '#fff';
        document.getElementById(this.datecolor).style.color = "#000";
        this.datecolor=null;
        this.pickDate(value);
      }
      if(this.datecolor==null){
        this.datecolor = value + 'datediv';
        document.getElementById(this.datecolor).style.background = '#FF0000';
        document.getElementById(this.datecolor).style.color = "white";
        this.selectm=this.selectedMonth+1;
        // alert("picked date "+value+'-'+this.selectedMonth+'-'+this.selectedYear);
        this.selecteddate=this.selectedYear+'-'+this.selectm+'-'+value;
        this.date_selected=value;
        // alert("Selected Date 2"+this.selecteddate)
      }
    }
  }
  ngAfterViewInit(){
    this.datecolor = this.Currentdate + 'datediv';
    document.getElementById(this.datecolor).style.background = '#FF0000';
    document.getElementById(this.datecolor).style.color = "white"; 
  }
  openservicesmodel() {
    let profileModal = this.modalCtrl.create('CustomerAddServices', {bigdata: this.bigdata});
    profileModal.onDidDismiss(data => {
      console.log('hello dismissed data'+JSON.stringify(data))
      this.noservices='false'
      this.title=data.title;
      this.cost=data.cost;
      this.time=data.time;
      this.serviceid=data.service_id;
      this.bigdata.push({title:this.title,cost:this.cost,time:this.time,service_id:this.serviceid})
    });
    profileModal.present();
  }
  selectedtime(data,timevalue,timemin) {
    this.slot=1; 
    this.defaulttime1=timevalue
    this.defaulttime2=timemin
    this.totalhour=this.defaulttime1+this.selectedservicehour
    this.totalmin=this.defaulttime2+this.selectedservicemin
    if(this.totalmin>59){
      this.totalmin=this.totalmin-60
      this.totalhour++
    }
    this.selectedhour=timevalue
    this.selectedmin=timemin
    this.selectedItem =data;  
    let a,b; 
    if(timevalue.toString().length==1){
      a='0'+timevalue.toString();
    }else{
      a=timevalue.toString();
    }
    if(timemin.toString().length==1){
      b='0'+timemin.toString();
    }else{
      b=timemin.toString();
    }
    let q=this.selecteddate.split('-')[1].length==1?0+this.selecteddate.split('-')[1]:this.selecteddate.split('-')[1]
    let w=this.selecteddate.split('-')[2].length==1?0+this.selecteddate.split('-')[2]:this.selecteddate.split('-')[2]
    console.log(this.selecteddate.split('-')[0]+'-'+q+'-'+w)
    let c=this.selecteddate.split('-')[0]+'-'+q+'-'+w+'T'+a+':'+b+':00.00Z';
    console.log(this.selecteddate.split('-'))
    let h=new Date().getHours().toString().length==1?'0'+new Date().getHours().toString():new Date().getHours().toString();
    let m=new Date().getMinutes().toString().length==1?'0'+new Date().getMinutes().toString():new Date().getMinutes().toString();
    let s=new Date().getSeconds().toString().length==1?'0'+new Date().getSeconds().toString():new Date().getSeconds().toString();
    let currentTime = Date.parse(new Date().toISOString().toString().split('T')[0]+'T'+h+':'+m+':'+s+'.00Z')
    let selectedTime = Date.parse(c)
    console.log(new Date().toISOString().toString().split('T')[0])
    console.log(new Date().toISOString().toString().split('T')[0]+'T'+h+':'+m+':'+s+'.00Z') 
    console.log(c) 
    console.log(currentTime)
    console.log(selectedTime)
    console.log(currentTime < selectedTime) 
    if(currentTime < selectedTime){
      this.checkEnable=false;
    }else{
      this.checkEnable=true;
    }
  }
  appoint() { 
    this.starttime3=this.currentHr2+':'+this.currentMin2;
    // if(this.currentHr2==undefined && this.currentMin2==undefined)
    if(this.defaulttime1==undefined && this.defaulttime2==undefined)
    {
      let alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'Please Choose a Time Slot ',
        buttons: ['ok']
      });
      alert.present();
      //      this.sevicearray=this.selectedserviceid       
      //      this.starttime1=this.defaulttime1+':'+this.defaulttime2;
      //      this.starttime2=this.totalhour+':'+this.totalmin;
      //          this.endtime1=this.totalhour;
      //          this.endtime2=this.totalmin;
      // alert(this.starttime1)
      // alert(this.starttime2)
      // this.booking(this.newserviceid,this.selectedservicetitle,this.selectedservicecost)
    }else if(this.bigdata.length==0){
      this.endtime1=this.totalhour;
      this.endtime2=this.totalmin;
      this.sevicearray=this.selectedserviceid     
      this.starttime1=this.defaulttime1+':'+this.defaulttime2;
      this.starttime2=this.totalhour+':'+this.totalmin;
      this.booking(this.sevicearray,this.selectedservicetitle,this.selectedservicecost)
    }
    if(this.bigdata.length > 0){
      this.starttime1=this.defaulttime1+':'+this.defaulttime2;
      this.starttime2=this.currentHr2+':'+this.currentMin2;
      this.endtime1=this.currentHr2;
      this.endtime2=this.currentMin2;
      for (var i = 0; i <  this.bigdata.length; i++) {
        console.log("id check" + JSON.stringify( this.bigdata[i].service_id))
        console.log("services name"+JSON.stringify( this.bigdata[i].title))
        this.servicear.push( this.bigdata[i].service_id)
        this.servicesname.push( this.bigdata[i].title)
        this.selectedcost.push( this.bigdata[i].cost)   
        console.log("servicesname"+JSON.stringify(this.servicesname))
        console.log("servicesarray"+JSON.stringify(this.servicear))
        console.log("Cost array"+JSON.stringify(this.selectedcost))
        if ( this.bigdata.length == i + 1) {
          // alert("Repeated Array"+this.servicear);
          let b=this.unique(this.servicear)
          // alert("Filter Array id"+b)
          let c=this.unique(this.servicesname)
          // alert("Filter Array name"+c)
          let d=this.unique(this.selectedcost)
          // alert("Filter Array cost"+d)
          this.booking(this.servicear,this.servicesname,this.selectedcost)
        }
      }
    }
  }
  booking(serviceids,servicesname,servicescost) {
    var a=this.selecteddate.split("-")
    var selected_year=a[0]
    // alert("b ke value"+selected_year)
    var selected_month=a[1]
    // alert("b ke value"+selected_month)
    var selected_day=a[2]
    // alert("b ke value"+selected_day)
    // alert("e ke value"+e)
    var f=parseInt(this.Currentdate)
    var Selected_mydate = new Date(a[0], a[1]-1, a[2]);
    // alert("selctd date"+Selected_mydate.getTime())
    var _mydate = new Date(2013, 1, 1);;
    var Current_mydate = new Date(this.Current_year_value,this.Current_month_value-1, this.Currentdate);
    // alert("curnt_date"+Current_mydate.getTime())
    // alert("f ke value"+f)
    //  alert("day"+this.Currentdate)
    // alert("month"+this.Current_month_value)
    // alert("year"+this.Current_year_value)
    // &&b!=this.Current_year_value
    if( Selected_mydate.getTime()>=Current_mydate.getTime() ){
      this.bookeddate=this.selecteddate
      this.checkbooking(serviceids,servicesname,servicescost)
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'SORRY!',
        subTitle: 'Selected Date is already passed' ,
        buttons: ['ok']
      });
      alert.present();
      // var tzoffset = (new Date(this.selecteddate)).getTimezoneOffset() * 60000; //offset in milliseconds
      // var localISOTime = (new Date(this.selecteddate - tzoffset)).toISOString().slice(0,-1)
      // let c=localISOTime.split('T')
      // this.bookeddate=this.selecteddate
      // console.log("start time"+this.choosentime)
      // console.log("end time"+ this.endtime)
      // console.log("salon id"+this.salonid)
      // console.log("total Duration"+this.totaltimevalue)
      // console.log("total Cost"+this.totalcost)
      // console.log("Employee id"+this.employeeid)
      // console.log("Service id"+serviceids)
      // this.checkbooking(serviceids,servicesname,servicescost)
    }
  }
  getMin(min){
    if(min=='0'){
      return '00';
    }else{
      return min;
    }
  }
  addzero(min){
    if(min=='0'){
      return '00';
    }else{
      return min;
    }
  }
  addzero2(min){
    if(min<10){
    let a='0'+min
      return a;
    }else{
      return min;
    }
  }
  unique(array){
    return array.filter(function(el, index, arr) {
      return index == arr.indexOf(el);    
    });
  }
  checkbooking(serviceids,servicesname,servicescost){
    // alert("hello starttime"+this.starttime1)
    var a=this.starttime1.split(':')
    console.log(this.timedata[this.timedata.length-1].hr+':'+this.timedata[this.timedata.length-1].min);
    console.log(a);
    if(this.starttime1==this.timedata[this.timedata.length-1].hr+':'+this.timedata[this.timedata.length-1].min){    
      let alert = this.alertCtrl.create({
        title: 'SORRY!',
        subTitle: ' You are not allowed to book the last time slot of the day',
        buttons: ['ok']
      });
      alert.present();
    }else{
      this.sevicearray=serviceids
      let loading = this.loadingCtrl.create({content: 'Please Wait...'});
      Observable.fromPromise(loading.present())
      .flatMap(data => this.dataservice.customerbooking(this.sevicearray,this.starttime1,
      this.starttime2,this.salonid,this.bookeddate,this.employeeid))
      .subscribe(data =>
        loading.dismiss().then(() => {
          this.bookingdata = data
          if(this.bookingdata.status==1){
            this.bookingid=this.bookingdata.data.booking_id;
            console.log("hello new "+this.bookingid)
            this.navCtrl.push('ConfirmDetails',{bookingid:this.bookingid,
                                                starttime:this.defaulttime1,
                                                startime2:this.defaulttime2,
                                                endtime1: this.endtime1,
                                                endtime2: this.endtime2,
                                                salonid:this.salonid,
                                                totalduration:this.totaltimevalue,
                                                totalcost:servicescost,
                                                selecteddate:this.bookeddate,
                                                employeeid:this.employeeid,
                                                serviceid:this.sevicearray,
                                                servicesname:servicesname,
                                                employeename:this.employeename,
                                                onlinebooking:this.onlinebooking,
                                                employeepic:this.employeepic,
                                                salonownername:this.salonownername,
                                                salonownerpic:this.salonownerpic,
                                                salonownerid:this.salonownerid,
                                                employeebook:this.employeebook,
                                                salonownerbook:this.salonownerbook
                                                })
          }
          else if(this.bookingdata.status==0){
            let alert = this.alertCtrl.create({
              title: 'SORRY!',
              subTitle: 'This slot is already booked,Please choose another slot',
              buttons: ['ok']
            });
            alert.present();
          }
        }),error =>loading.dismiss().then(() => {})
      );
    }
  }
  deleteservice(i){
    this.bigdata.splice(i,1)
  }
  getHours1(time,i){
    if (i==0) {
      this.currentHr1=this.totalhour
      if (this.currentHr1<10) {
        return '0'+this.currentHr1
      }else{
        return this.currentHr1
      }
    }else{
      this.currentHr1=this.currentHr2
      if (this.currentHr1<10) {
        return '0'+this.currentHr1
      }else{
        return this.currentHr1
      }
    }
  }
  getMin1(time,i){
    if (i==0) {
      this.currentMin1=this.totalmin
      if (this.currentMin1<10) {
        return '0'+this.currentMin1
      }else{
        return this.currentMin1
      }
    }else{
      this.currentMin1=this.currentMin2
      if (this.currentMin1<10) {
        return '0'+this.currentMin1
      }else{
        return  this.currentMin1
      }
    }
  }
  getHours2(time,i){ 
    if(this.currentMin1+time.min>59){
      this.currentHr2=this.currentHr1+time.hr+1;
      if (this.currentHr2<10) {
        return '0'+this.currentHr2
      }else{
        return this.currentHr2
      }
    }else{
      this.currentHr2=this.currentHr1+time.hr;
      if (this.currentHr2<10) {
        return '0'+this.currentHr2
      }else{
        return this.currentHr2
      }
    }
  }
  getMin2(time,i){
    if(this.currentMin1+time.min>59){
      this.currentMin2=this.currentMin1+time.min-60
      if (this.currentMin2<10) {
        return '0'+this.currentMin2
      }else{
        return this.currentMin2;
      }
    }else{
      this.currentMin2=this.currentMin1+time.min
      if (this.currentMin2<10) {
        return '0'+this.currentMin2
      }else{
        return this.currentMin2;
      }
    }
  }
  
}