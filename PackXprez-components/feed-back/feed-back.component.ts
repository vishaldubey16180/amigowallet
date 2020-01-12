import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../../packXprez-services/customer-services/customer-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css']
})
export class FeedBackComponent implements OnInit {

  type: string;
  custId: number;
  selectedValue;
  data: Array<Object> = [ { id: 1, name: "Request" }, { id: 2, name: "Appreciation" }]

  constructor(private _customerService: CustomerServiceService, private _route: Router) { }

  ngOnInit() {
    //this.type = this.selectedValue.name
    this.custId = parseInt(sessionStorage.getItem("customerId"));
    console.log(this.custId);
    
  }

  custFeedback(comment: string) {
    console.log(comment);
    this._customerService.CustomerFeedback(this.custId, this.type, comment)
      .subscribe(x => {
        console.log(x);
        if (x) {
          this._route.navigate(['/feedbackResponse'])
        }
      })
  }

  feedBackType() {
    console.log(this.selectedValue.name);
    this.type = this.selectedValue.name;
  }

}
