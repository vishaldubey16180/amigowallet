import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../../packXprez-services/customer-services/customer-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginStatus: string;
  msgBox: boolean;
  msg: string;
  showError: boolean;
  custId: string;
  constructor(private _customerService: CustomerServiceService, private router:Router) { }

  ngOnInit() {
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  submitLoginForm(loginForm: NgForm) {
    console.log(loginForm.value.emailId);
    console.log(loginForm.value.userPassword);

    this.GetCustomerId(loginForm.value.emailId);
    this._customerService.validateCredentials(loginForm.value.emailId, loginForm.value.userPassword).subscribe(x => {
      this.loginStatus = x;
      this.msgBox = true;
      console.log(this.loginStatus)
      if (this.loginStatus == "Branch Officer" || this.loginStatus == "Customer") {
        alert( "successfully logged in as " + this.loginStatus );
        console.log(this.custId);
        sessionStorage.setItem("userMailId", loginForm.value.emailId);
        sessionStorage.setItem("userRole", this.loginStatus);
        //sessionStorage.setItem("customerId", this.custId);
        this.router.navigate(['home'])

      }
      else {
        this.msg = this.loginStatus
      }
    }, err => { console.log(err); }, () => console.log("credentials executed"))
  }

  GetCustomerId(emailId: string) {

    if (emailId == null) {
      this.router.navigate(['/login']);
    }
    this._customerService.GetCustomerId(emailId)
      .subscribe(
        x => {
          this.custId = x;
          sessionStorage.setItem("customerId", this.custId);
          if (this.custId.length == 0) {
            this.showError = true;
            this.msg = "Your EmailId not found.";
          }
          console.log(this.custId)
          sessionStorage.setItem("customerId", this.custId);
          console.log(x);
        },
        Error => {
          this.custId = null;
          this.msg = Error;
          console.log(this.msg);
          if (this.custId == "-99") {
            this.showError = true;
            this.msg = "Customer Id not found.";
          }
        },
        () => console.log("GetCustomerId method executed successfully")
      );
  }

}
