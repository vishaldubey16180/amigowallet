import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../../packXprez-services/customer-services/customer-service.service';
import { Route, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-check-availability',
  templateUrl: './check-availability.component.html',
  styleUrls: ['./check-availability.component.css']
})
export class CheckAvailabilityComponent implements OnInit {


  msg: string;

  constructor(private _customerService: CustomerServiceService, private router: Router) { }

  ngOnInit() {
  }

  CheckAvailability(form: NgForm) {
    console.log(form.value.frompin);
    this._customerService.CheckService(form.value.frompin, form.value.topin).subscribe(x => {
      this.msg = x;
      alert(x);
    },
      err => {
        this.msg = "Some error occured";
      },
      () => console.log("Check Availability Executed")
    );
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

}
