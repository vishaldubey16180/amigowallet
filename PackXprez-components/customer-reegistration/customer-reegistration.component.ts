import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerServiceService } from '../../packXprez-services/customer-services/customer-service.service';

@Component({
  selector: 'app-customer-reegistration',
  templateUrl: './customer-reegistration.component.html',
  styleUrls: ['./customer-reegistration.component.css']
})
export class CustomerReegistrationComponent implements OnInit {

  errMsg: string;
  password: string;
  constructor(private _customerService: CustomerServiceService,private router:Router) { }

  ngOnInit() {
  }


  RegisterCustomer(form: NgForm) {

    if (form.value.password != form.value.Cpassword) {
      alert("Password should be same as confirm password");

    }
    else {


    this._customerService.registerUser(form.value.name,form.value.password, form.value.emailId,  form.value.conNumber
      , form.value.buildingNo, form.value.streeetNo, form.value.locality, form.value.pincode)
      .subscribe(
        responseCustomerData => {
          //this.message = responseProductData;
          console.log(responseCustomerData);
          if (responseCustomerData) {
            alert("Customer registered sucessfully.")
            this.router.navigate(['login'])
          }
        },
        responseCustomerError => {
          this.errMsg = responseCustomerError,
            console.log(this.errMsg),
            alert("Sorry, something went wrong. Please try again after sometime.")
          this.router.navigate(['registraion'])
        },
        () => console.log("RegisterCustomer method executed successfully")
      );
    }

  }
}
