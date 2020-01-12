import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../../packXprez-services/customer-services/customer-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-status',
  templateUrl: './track-status.component.html',
  styleUrls: ['./track-status.component.css']
})
export class TrackStatusComponent implements OnInit {

  msg: string
  constructor(private _customerService: CustomerServiceService, private router: Router) { }

  ngOnInit() {

  }

  TackStatus(AwbNo: number) {
    console.log(AwbNo);
    this._customerService.TrackStatus(AwbNo).subscribe(x => {
      alert(x);
    },
      err => { alert(err) },
      () => console.log("TrackStatus Method Executed"));
  }

  navigateToHome() {
    this.router.navigate(['home']);
  }

}
