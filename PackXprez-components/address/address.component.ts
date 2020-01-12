import { Component, OnInit } from '@angular/core';
import { IAddress } from '../../PackXprez-interfaces/IAddress';
import { CustomerServiceService } from '../../packXprez-services/customer-services/customer-service.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  CustomerId: number;
  msgDiv: boolean;
  errMsg: string;
  public addObj = {} as IAddress;
  constructor(private _customerService: CustomerServiceService, private router: Router) { }

  ngOnInit() {
    this.CustomerId = parseInt(sessionStorage.getItem("customerId"));
    //this.GetAddress(this.AddressId, this.CustomerId)
  }

  //GetAddress(AddressId: number, CustomerId: number) {
  //  this._customerService.GetAddressByCustAddressId(CustomerId, AddressId).subscribe(
  //    x => {
  //      console.log(x);
  //      this.addObj = x;
  //      this.msgDiv = false;
  //    },
  //    y => {
  //      this.addObj = null;
  //      this.errMsg = y;
  //      console.log(this.errMsg);
  //    },
  //    () => console.log("GetAddressByCustAddressId method excuted successfully")
  //  );
  //}

  AddAddress(form: NgForm) {
    this.addObj = {
      custId: this.CustomerId,
      addressId: 0,
      buildingNo: form.value.buildingNo,
      streetNo: form.value.streetNo,
      locality: form.value.locality,
      pincode: form.value.pincode
    }
    console.log(this.addObj);
    this._customerService.AddAddress(this.addObj)
      .subscribe(
        responseAddressData => {
          //this.message = responseProductData;
          if (responseAddressData) {
            alert("Address added successfully.")
            this.router.navigate['']
          }
        },
        responseAddressError => {
          this.errMsg = responseAddressError,
            console.log(this.errMsg),
            alert("Sorry, something went wrong. Please try again after sometime.")
          this.router.navigate['addAddress']
        },
        () => console.log("AddAddress method executed successfully")
      );
  }

}
