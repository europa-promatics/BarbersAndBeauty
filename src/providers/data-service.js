var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ENV } from '../app/env';
import { Model } from "../models/data";
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        console.log("inside provider" + localStorage['salonid']);
        console.log("inside provider usertype" + localStorage['usertype']);
        this.value = new Model('all');
        this.value2 = new Model('all');
        this.datavalue = new Model('all');
    }
    DataService.prototype.cancelbooking = function (data) {
        console.log(data);
        return this.http.post(ENV.mainApi + '/bookingCancelByProfessional.json', data)
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.CustomerSalonList = function (categoryid) {
        return this.http.post(ENV.mainApi + '/customerSideSalonListing.json', {
            id: categoryid
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.add_employee = function (full_name, email, contact_number, salonid, category) {
        return this.http.post(ENV.mainApi + '/employeeAddBySalonOwner.json', {
            full_name: full_name,
            email: email,
            contact_number: contact_number,
            user_type: 2,
            salon_id: localStorage['salonid'],
            category: category
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.add_service = function (service_name, cost, time, description, id, emp_name) {
        return this.http.post(ENV.mainApi + '/addServiceDescription.json', {
            title: service_name,
            cost: cost,
            time: time,
            description: description,
            salon_id: localStorage['salonid'],
            employee_id: id,
            employee_name: emp_name
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.getmyservicedata = function (saloon_id) {
        return this.http.post(ENV.mainApi + '/viewAddServiceDescription.json', {
            salon_id: localStorage['salonid']
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.delete_service = function (id) {
        return this.http.post(ENV.mainApi + '/deleteServiceDescription.json', {
            id: id,
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.viewbusinessinfo = function (id) {
        return this.http.post(ENV.mainApi + '/salonBussinessViewProfile.json', {
            salon_id: id
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.postbusinessinfo = function (lat, lng, salon_name, salon_adress, district, postalcode, salon_description, contact_number, website_name, parking_value, schedule, id, fb_url, insta_url, wheelchair_value, wifi_value) {
        return this.http.post(ENV.mainApi + '/salonBussinessProfileEdit.json', {
            salon_name: salon_name,
            salon_description: salon_description,
            address: salon_adress,
            latitude: lat,
            longitude: lng,
            city: district,
            post_code: postalcode,
            contact_number: contact_number,
            schedule: schedule,
            website: website_name,
            parking: parking_value,
            salon_id: localStorage['salonid'],
            facebooklink: fb_url,
            instagramlink: insta_url,
            wifi: wifi_value,
            wheelchair: wheelchair_value
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.viewprofileinfo = function (user_id) {
        return this.http.post(ENV.mainApi + '/salonOwnerViewProfile.json', {
            salon_id: localStorage['salonid'],
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.editprofileinfo = function (owner_name, about_owner, email, mobile_number, user_id) {
        return this.http.post(ENV.mainApi + '/salonViewOwnerProfileEdit.json', {
            full_name: owner_name,
            contact_number: mobile_number,
            email: email,
            salon_description: about_owner,
            salon_id: localStorage['salonid'],
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.forgetpassword = function (email) {
        return this.http.post(ENV.mainApi + '/forgotPassword.json', {
            email: email
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.ContactUs = function (name, email, number, message) {
        return this.http.post(ENV.mainApi + '/contactUs.json', {
            name: name,
            email: email,
            contact_number: number,
            your_message: message,
            usertype: localStorage['usertype']
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.AboutUs = function () {
        return this.http.get(ENV.mainApi + '/aboutUs.json')
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.Faq = function () {
        return this.http.get(ENV.mainApi + '/manageFaq.json')
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.EmployeeListing = function (salonid) {
        return this.http.post(ENV.mainApi + '/customerSideEmployeeListing.json', {
            salon_id: salonid,
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    // CategoryList(): Observable<any>{
    //     return this.http.get(ENV.mainApi+'/customerSideCategories.json')
    //    .timeout(ENV.timeout)
    //    .map((data)=>{
    //        return data.json()
    //    })
    //     .catch(error =>{
    //       return error
    //     })
    // }
    //salon-owner edit profile
    DataService.prototype.viewprofileimage = function (user_id) {
        return this.http.post(ENV.mainApi + '/salonImageById.json', {
            salon_id: localStorage['salonid']
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.view_employee_list = function (user_id) {
        return this.http.post(ENV.mainApi + '/customerSideEmployeeListing.json', {
            salon_id: localStorage['salonid']
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.viewgalleryimage = function (user_id) {
        return this.http.post(ENV.mainApi + '/salonGalleryImageView.json', {
            salon_id: localStorage['salonid']
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.edit_service = function (service_name, cost, time, description, service_id) {
        return this.http.post(ENV.mainApi + '/serviceDescriptionEdit.json', {
            title: service_name,
            cost: cost,
            time: time,
            description: description,
            salon_id: localStorage['salonid'],
            service_id: service_id
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.FavList = function () {
        return this.http.post(ENV.mainApi + '/showFavouriteSalon.json', {
            customer_id: localStorage['customerid'],
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.Customersalonlisting = function () {
    };
    DataService.prototype.customerSideSalonServices = function (salonid) {
        return this.http.post(ENV.mainApi + '/customerSideSalonServicesListing.json', {
            salon_id: salonid,
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.addtofavourite = function (salonid) {
        return this.http.post(ENV.mainApi + '/addFavouritesalon.json', {
            salon_id: salonid,
            customer_id: localStorage['customerid'],
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.Customeraddservices = function (serviceid) {
        return this.http.post(ENV.mainApi + '/customerAddServicesSave.json', {
            service_id: serviceid,
            customer_id: localStorage['customerid']
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.Moreserviceslist = function () {
        return this.http.post(ENV.mainApi + '/customerAddServicesGetById.json', {
            customer_id: localStorage['customerid']
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.Deleteaddedservices = function (id) {
        return this.http.post(ENV.mainApi + '/customerAddServicesDelete.json', {
            id: id
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.customerbooking = function (serviceids, myDate, myDate2, salonid, selecteddate, employeeid) {
        return this.http.post(ENV.mainApi + '/customerAppointment.json', {
            customer_id: localStorage['customerid'],
            service_id: serviceids,
            starttime: myDate,
            endtime: myDate2,
            salon_id: salonid,
            selecteddate: selecteddate,
            employee_id: employeeid
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.Customeraddreview = function (salonid, comment, count) {
        return this.http.post(ENV.mainApi + '/customerSalonRating.json', {
            customer_id: localStorage['customerid'],
            salon_id: salonid,
            comment: comment,
            rating_count: count
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.paymentsuccess = function (note, bookingid, transactionid, transsaction_status, totalcost, salonid, employeeid, onlinebooking, paystatus) {
        return this.http.post(ENV.mainApi + '/paymentDataSaved.json', {
            note: note,
            customer_id: localStorage['customerid'],
            booking_id: bookingid,
            transaction_id: transactionid,
            transactionstatus: transsaction_status,
            total_amount: totalcost,
            employee_id: employeeid,
            salon_id: salonid,
            online_payment: onlinebooking,
            paystatus: paystatus
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.Salonimages = function (salonid) {
        return this.http.post(ENV.mainApi + '/salonGalleryImageView.json', {
            salon_id: salonid,
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.employeestatus = function (Status_active) {
        return this.http.post(ENV.mainApi + '/employeeOnlineOfflineStatus.json', {
            employee_online_status: Status_active,
            employee_id: localStorage['employeeid']
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.employeestatusstatuscheck = function () {
        return this.http.post(ENV.mainApi + '/employeeOnlineOfflineStatusInfo.json', {
            employee_id: localStorage['employeeid']
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.MySalonNotification = function () {
        return this.http.post(ENV.mainApi + '/bookingInfo.json', {
            salon_id: localStorage['salonid']
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.CustomerbookingList = function () {
        return this.http.post(ENV.mainApi + '/customerAppointmentList.json', {
            customer_id: localStorage['customerid'],
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.EmployeebookingList = function () {
        return this.http.post(ENV.mainApi + '/employeeAppointmentList.json', {
            employee_id: localStorage['employeeid'],
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.ResetCount = function (payment_id, array_index) {
        return this.http.post(ENV.mainApi + '/notificationSeen.json', {
            payment_id: payment_id,
            array_index: array_index
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.AcceptBooking = function (payment_id, booking_status) {
        return this.http.post(ENV.mainApi + '/bookingConfirmBySalonOwner.json', {
            payment_id: payment_id,
            booking_confirm_status: booking_status
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.DeclineBooking = function (payment_id, booking_status) {
        return this.http.post(ENV.mainApi + '/bookingConfirmBySalonOwner.json', {
            payment_id: payment_id,
            booking_confirm_status: booking_status
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.Paymentstatus = function () {
        return this.http.post(ENV.mainApi + '/customerPaymentData.json', {
            customer_id: localStorage['customerid'],
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.TermsandCondition = function () {
        return this.http.get(ENV.mainApi + '/termsConditions.json')
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.CustomerNotification = function () {
        return this.http.post(ENV.mainApi + '/customerSideNotification.json', {
            customer_id: localStorage['customerid'],
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.Howitworks = function () {
        return this.http.get(ENV.mainApi + '/howItWorks.json')
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.EmployeeNotification = function () {
        return this.http.post(ENV.mainApi + '/employeeSideNotification.json', {
            employee_id: localStorage['employeeid'],
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.Facebook = function (email, username, fbid, usertype, img) {
        return this.http.post(ENV.mainApi + '/facebookLogin.json', {
            email: email,
            full_name: username,
            facebook_id: fbid,
            profile_image: img,
            usertype: usertype
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.send_push_notification = function (salon_name, service, id) {
        return this.http.post(ENV.mainApi + '/pushNotification.json', {
            salonname: salon_name,
            salonservices: service,
            salon_id: id
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.myclient = function () {
        return this.http.post(ENV.mainApi + '/customerAppointmentBySalonIdLastDate.json', {
            salon_id: localStorage['salonid']
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.delete_staff = function (emp_id) {
        return this.http.post(ENV.mainApi + '/deleteEmployeeByEmployeeId.json', {
            employee_id: emp_id
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.EmployeeClientListing = function () {
        return this.http.post(ENV.mainApi + '/customerAppointmentByEmployeeId.json', {
            employee_id: localStorage['employeeid'],
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.subscription_plan = function (salon_id, staff_member, transcation_id, transcation_amount) {
        return this.http.post(ENV.mainApi + '/salonSideSubscriptionPayment.json', {
            salon_id: salon_id,
            staffmember: staff_member,
            transaction_id: transcation_id,
            transaction_amount: transcation_amount
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.AccountSettingStatus = function (salonid) {
        return this.http.post(ENV.mainApi + '/accountSettingsGetBySalonId.json', {
            salon_id: salonid
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    // account_settings(online_booking,schedule_appointment,
    // hours_notice_for_online_booking,
    //  hours_notice_for_cancel_booking){
    // return this.http.post(ENV.mainApi+'/accountSettings.json',{
    //         online_booking:online_booking,
    //       schedule_appointment:schedule_appointment,
    //       hours_notice_for_online_booking: hours_notice_for_online_booking,
    //       hours_notice_for_cancel_booking:hours_notice_for_cancel_booking,
    //        salon_id:localStorage['salonid']
    // })
    //     .timeout(ENV.timeout)
    //     .map((data) =>{
    //      return data.json()
    // })
    //     .catch(error =>{
    //      return error
    // }) 
    // }
    DataService.prototype.account_settings = function (online_booking, schedule_appointment, visibility, availability, hours_notice_for_online_booking, hours_notice_for_cancel_booking, paypal_credentials) {
        return this.http.post(ENV.mainApi + '/accountSettings.json', {
            online_booking: online_booking,
            schedule_appointment: schedule_appointment,
            salon_visibility: visibility,
            my_availability: availability,
            hours_notice_for_online_booking: hours_notice_for_online_booking,
            hours_notice_for_cancel_booking: hours_notice_for_cancel_booking,
            paypal_merchant_signature: paypal_credentials,
            salon_id: localStorage['salonid']
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.pendingpayment = function (paymentid, cost, transactionid, transactionstatus) {
        return this.http.post(ENV.mainApi + '/paymentSuccessCancelStatusUpdated.json', {
            payment_success_cancel_status: 1,
            payment_id: paymentid,
            transaction_id: transactionid,
            cost: cost,
            transactionstatus: transactionstatus,
            paystatus: 1,
            booking_confirm_status: 1
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.CancelBooking = function (paymentid) {
        return this.http.post(ENV.mainApi + '/paymentSuccessCancelStatusUpdated.json', {
            payment_success_cancel_status: 2,
            payment_id: paymentid,
            paystatus: 2,
            booking_confirm_status: 2
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.get_account_settings = function () {
        return this.http.post(ENV.mainApi + '/accountSettingsGetBySalonId.json', {
            salon_id: localStorage['salonid']
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.get_appointment_data = function () {
        return this.http.post(ENV.mainApi + '/customerAppointmentBySalonId.json', {
            salon_id: localStorage['salonid']
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.CustomerAppointmentByServices = function (servicearray) {
        return this.http.post(ENV.mainApi + '/getCustomerAppointmentDataByServiceId.json', {
            service_id: servicearray
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.EmployeeBookingCounts = function () {
        return this.http.post(ENV.mainApi + '/employeeBookingCount', {
            employee_id: localStorage['employeeid']
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.EmployeeCancelBooking = function (paymentid, paystatus, status_change) {
        return this.http.post(ENV.mainApi + '/employeeBookingSuccessAndCancelStatusUpdated.json', {
            payment_id: paymentid,
            payment_success_cancel_status: 2,
            paystatus: 2,
            booking_confirm_status: 2,
            change_status_seen: status_change
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.EmployeeConfirmBooking = function (paymentid, paystatus, status_change) {
        return this.http.post(ENV.mainApi + '/employeeBookingSuccessAndCancelStatusUpdated.json', {
            payment_id: paymentid,
            payment_success_cancel_status: 0,
            paystatus: 0,
            booking_confirm_status: 1,
            change_status_seen: status_change
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.Customertimeslots = function (salonid) {
        return this.http.post(ENV.mainApi + '/customerSideTimeSlot.json', {
            salon_id: salonid,
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.delete_gallery_image = function (image_name, id) {
        return this.http.post(ENV.mainApi + '/deleteGalleryImageByNameAndId.json', {
            id: id,
            image: image_name
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.getcustomerCalendarAppointments = function () {
        return this.http.post(ENV.mainApi + '/salonAppointmentByCustomerId.json', {
            customer_id: localStorage['customerid']
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.Changenotificationcolor = function (paymentid) {
        return this.http.post(ENV.mainApi + '/colorStatusUpdate.json', {
            payment_id: paymentid,
            color_status: 0
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.edit_salon_category = function (category_name) {
        return this.http.post(ENV.mainApi + '/editCategoryBySalonId.json', {
            salon_id: localStorage['salonid'],
            category: category_name
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.get_salon_category = function () {
        return this.http.post(ENV.mainApi + '/getCategoryBySalonId.json', {
            salon_id: localStorage['salonid'],
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.employe_side_notification_color_change = function (mypayment_id) {
        return this.http.post(ENV.mainApi + '/employeeSideColorStatusChanged.json', {
            payment_id: mypayment_id,
            employee_color_status: 1,
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService.prototype.setNotificationSeen = function (id) {
        return this.http.post(ENV.mainApi + '/customerNotificatonSeen.json', { customer_id: id })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    DataService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], DataService);
    return DataService;
}());
export { DataService };
//# sourceMappingURL=data-service.js.map