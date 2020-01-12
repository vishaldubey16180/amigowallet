import { Component, OnInit } from '@angular/core';
import { IAddress } from '../../PackXprez-interfaces/IAddress';
import { ICustomer } from '../../PackXprez-interfaces/ICustomer';
import { CustomerServiceService } from '../../packXprez-services/customer-services/customer-service.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public addObj = {} as IAddress[];
  public custObj = {} as ICustomer;
  msgDiv: boolean = true;
  sAddress: boolean = true;
  errMsg: string;
  tempCustId: number;

  constructor(private _customerService: CustomerServiceService, private router: Router) { }

  ngOnInit() {
    this.tempCustId = parseInt(sessionStorage.getItem("customerId"));
    console.log(this.tempCustId);
    this.GetCustomer(this.tempCustId);
    this.GetAddressByCustId(this.tempCustId);
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

  GetCustomer(custId: number) {
    this._customerService.GetCustomer(custId).subscribe(
      responseCustomerData => {
        console.log(responseCustomerData);
        this.custObj = responseCustomerData;
        this.msgDiv = false;
      },
      responseCustomerError => {
        this.addObj = null;
        this.errMsg = responseCustomerError;
        console.log(this.errMsg);
      },
      () => console.log("GetCustomer method excuted successfully")
    );
  }

  UpdateAddress(addId: number) {

    this.router.navigate(['/updateAddress', this.tempCustId, addId])
  }

  UpdateProfile(form: NgForm) {
    if (form.value.password != form.value.Cpassword) {
      alert("Password doesn't match")
    }
    else {

      this.custObj = {
        custId: this.custObj.custId,
        name: form.value.name,
        password: form.value.password,
        emailId: form.value.emailId,
        contactNo: form.value.conNumber,
        roleId: 1
      }

    }

    this._customerService.UpdateProfile(this.custObj).subscribe(
      x => {
        console.log(x);
        alert("Details updated successfully")
        this.router.navigate[''];
      },
      y => {
        this.errMsg = y;
        console.log(this.errMsg);
      },
      () => console.log("UpdateProfile method excuted successfully")
    );
  }
}
