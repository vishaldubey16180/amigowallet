import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../../packXprez-services/customer-services/customer-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IAddress } from '../../PackXprez-interfaces/IAddress';


@Component({
  selector: 'app-schedule-pickup',
  templateUrl: './schedule-pickup.component.html',
  styleUrls: ['./schedule-pickup.component.css']
})
export class SchedulePickupComponent implements OnInit {
  msg: string;
  showDiv = true;
  showcheck = true;

  constructor(private _customerService: CustomerServiceService, private router: Router) { }

  msgDiv: boolean = true;
  sAddress: boolean = true;
  errMsg: string;
  tempCustId: number;
  shipmentType: string;
  weightUnit: number;
  deliveryExtra: number;
  addId: number;
  packaging: number;
  pickupCharge: number;
  aCost: number;
  volume: number;
  volumePrice: number;
  distance: number;
  showCost = true;
  wCost: number;
  nocheck = false;
  fromAddress: string;
  public addObj = {} as IAddress[];
  public addObj1 = {} as IAddress;
  showMsg: boolean;

  ngOnInit() {
    this.tempCustId = parseInt( sessionStorage.getItem("customerId"));
    this.GetAddressByCustId(this.tempCustId);
    this.packaging = 0;
    this.weightUnit=0;
    this.deliveryExtra=0;
    this.packaging=0;
    this.aCost=0;
    this.volume = 0;
    this.pickupCharge = 200;
    this.wCost = 0;
  }

  GetAddressByCustAddressId(custId: number, addId: number) {

    this._customerService.GetAddressByCustAddressId(custId, addId).subscribe(
      responseAddressData => {
        console.log(responseAddressData);
        this.addObj1 = responseAddressData;
        this.msgDiv = false;
      },
      responseAddressError => {
        this.addObj1 = null;
        this.errMsg = responseAddressError;
        console.log(this.errMsg);
      },
      () => console.log("GetAddressByCustId method excuted successfully")
    );
  }

  SchedulePackage(form: NgForm) {
    console.log("Schedule pickup form submission");
    this.concatAddress();
      this._customerService.SchedulePickup(this.tempCustId, form.value.buildingNo, form.value.streeetNo, form.value.locality, form.value.pincode, this.fromAddress, form.value.conNumber).subscribe(x => {

        this.showMsg = x;
        alert(x);
      },
        err => {
          console.log(err);
          this.msg = "Some error occured";
        },
        () => console.log("Check Availability Executed")
      );
    }
    
  CheckAvailability(fromPin: number, toPin: number) {
    
    this._customerService.CheckService(fromPin, toPin).subscribe(x => {

      this.msg = x;
      alert(x);
      this.showDiv = false;
      this.showcheck = false;
      if (x == "Available") {

      this.nocheck = true;
      }
    },
      err => {
        console.log(err);
        this.msg = "Some error occured";
      },
      () => console.log("Check Availability Executed")
    );
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  GetAddressByCustId(custId: number) {

    this._customerService.GetAddressByCustId(custId).subscribe(
      responseAddressData => {
        console.log(responseAddressData);
        this.addObj = responseAddressData;
        this.msgDiv = false;
      },
      responseAddressError => {
        this.addObj = null;
        this.errMsg = responseAddressError;
        console.log(this.errMsg);
      },
      () => console.log("GetAddressByCustId method excuted successfully")
    );
  }

  toggleVisibility() {
    console.log("toggle visibility executed");
    this.packaging=500
  }

  shipmentValue(ShipmentType: string) {
    this.shipmentType = ShipmentType;
    console.log("Shipment value executed");
  }

  selectAWeight(id: number) {
    console.log("Select weight executed");
    if (id == 1) {
      this.weightUnit = 1;
    }
    else if (id == 2) {
      this.weightUnit = 1000;
    }
  }

  selectDeliveryOpt(opt: string) {
    console.log("Select Delivery executed");
    if (opt == "Standard") {
      this.deliveryExtra = 0;
    } else if (opt == "Express") {
      this.deliveryExtra = 100;
    } else if (opt == "Overnight") {
      this.deliveryExtra = 500;
    } else {
      this.deliveryExtra = 0;
    }
  }

  SelectAddress(id: number) {
    console.log("Select address works");
    this.addId = id;

  }

  calculateCost(a: number, b: number, c: number, d: number) {
    console.log("calculate methode working");
    this.volume = a * b * c;
    this.distance = 50;
    if (d > 5) {
      this.wCost = 50;
    }
    if (a * b * c > 100) {
      this.volume = 50;
    }
    this.aCost = this.pickupCharge + this.distance * 7 + this.packaging + this.distance * this.wCost + a * b * c * this.volume;
    this.showCost = false;
    console.log(this.aCost);
  }

  concatAddress() {
    this.GetAddressByCustAddressId(this.tempCustId, this.addId);
    this.fromAddress = this.addObj1.buildingNo + this.addObj1.streetNo + this.addObj1.locality + this.addObj1.pincode;
    console.log(this.fromAddress);
  }
}
