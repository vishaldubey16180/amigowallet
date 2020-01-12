import { Component, OnInit } from '@angular/core';
import { IAddress } from '../../PackXprez-interfaces/IAddress';
import { CustomerServiceService } from '../../packXprez-services/customer-services/customer-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent implements OnInit {

  public addObj = {} as IAddress;
  custId: number;
  addId: number;
  msgDiv: boolean;
  errMsg: string;

  constructor(private _customerService: CustomerServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.custId = parseInt(this.route.snapshot.params["custId"]);
    this.addId = parseInt(this.route.snapshot.params["addId"]);
    this.GetAddressByCustAddressId(this.custId, this.addId);
  }

  GetAddressByCustAddressId(custId: number, addId: number) {

    this._customerService.GetAddressByCustAddressId(custId, addId).subscribe(
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

  UpdateAddress(form: NgForm) {
    this.addObj = {
      CustId: this.custId,
      AddressId: this.addId,
      BuildingNo: form.value.buildingNo,
      StreetNo: form.value.streetNo,
      Locality: form.value.locality,
      Pincode: form.value.pincode
    }
    this._customerService.UpdateAddress(this.addObj).subscribe(
      x => {
        console.log(x);
        this.msgDiv = false;
      },
      y => {
        this.errMsg = y;
        console.log(this.errMsg);
      },
      () => console.log("UpdateAddress method excuted successfully")
    );
  }

  RemoveAddress() {
    this._customerService.RemoveAddress(this.custId, this.addId).subscribe(
      x => {
        console.log(x);
        this.msgDiv = false;
      },
      y => {
        this.errMsg = y;
        console.log(this.errMsg);
      },
      () => console.log("RemoveAddress method excuted successfully")
    );
  }
}
