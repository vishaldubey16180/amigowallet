import { Component, OnInit } from '@angular/core';
import { IAddress } from '../../PackXprez-interfaces/IAddress';
import { CustomerServiceService } from '../../packXprez-services/customer-services/customer-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-receive-package',
  templateUrl: './receive-package.component.html',
  styleUrls: ['./receive-package.component.css']
})
export class ReceivePackageComponent implements OnInit {
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
  showMsg: boolean;
  toAddress: string;
  fromAddress: string;

  ngOnInit() {
    this.packaging = 0;
    this.weightUnit = 0;
    this.deliveryExtra = 0;
    this.packaging = 0;
    this.aCost = 0;
    this.volume = 0;
    this.pickupCharge = 200;
    this.wCost = 0;
  }

  SchedulePackage(form: NgForm) {

    console.log("Schedule pickup form submission");
    this.concatAddress(form);
    console.log(this.toAddress);
      this._customerService.SchedulePickup1(this.toAddress, this.fromAddress).subscribe(x => {
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

  concatAddress(form: NgForm) {
    this.fromAddress = form.value.buildingNo + form.value.streetNo + form.value.locality + form.value.pincode;
    this.toAddress = form.value.sbuildingNo + form.value.sstreetNo + form.value.slocality + form.value.spincode;

  }

  CheckAvailability(fromPin: number, toPin: number) {

    this._customerService.CheckService(fromPin, toPin).subscribe(x => {

      this.msg = x;
      alert(x);
      this.showDiv = false;
      this.showcheck = false;
      this.nocheck = true;
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

  toggleVisibility() {
    console.log("toggle visibility executed");
    this.packaging = 500
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
}
