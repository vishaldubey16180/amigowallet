import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userRole: string;
  customerLayout: boolean;
  commonLayout: boolean;
  managerLayout: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userRole = sessionStorage.getItem("userRole");
    if (this.userRole == "Customer") {
      this.customerLayout = true;
    }
    else if (this.userRole == "Branch Officer") {
      this.managerLayout = true;
    }
    else {
      this.commonLayout = true;
    }

  }

  LogOut() {
    sessionStorage.removeItem("userMailId");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("customerId");
    sessionStorage.removeItem("AddressId");
    this.router.navigate['home']
  }
  
}
