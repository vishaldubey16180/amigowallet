import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-layout',
  templateUrl: './manager-layout.component.html',
  styleUrls: ['./manager-layout.component.css']
})
export class ManagerLayoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    this.custId = sessionStorage.getItem("customerId");
    console.log("customer layout");
    console.log(this.custId);
    this.check = this.custId == null
    console.log(this.check);
    if (this.check) {
      this.router.navigate(['/home']);
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
