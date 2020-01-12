import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.css']
})
export class CustomerLayoutComponent implements OnInit {

  custId: string;
  check: boolean;
  constructor(private router: Router) { }

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
  //Response.Cache.SetCacheability(HttpCacheability.NoCache);
  //Response.Cache.SetExpires(DateTime.UtcNow.AddHours(-1));
  //Response.Cache.SetNoStore();
  }

}
