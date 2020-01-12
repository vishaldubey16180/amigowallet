import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../../packXprez-services/customer-services/customer-service.service';
import { IPackage } from '../../PackXprez-interfaces/IPackage';

@Component({
  selector: 'app-package-history',
  templateUrl: './package-history.component.html',
  styleUrls: ['./package-history.component.css']
})
export class PackageHistoryComponent implements OnInit {
  package: IPackage[];
  custId: number;
  showMessageDiv: boolean;

  constructor(private _customerService: CustomerServiceService) { }

  ngOnInit() {
    this.custId = parseInt(sessionStorage.getItem("customerId"));
    this.PackageHistory(this.custId);

  }

  PackageHistory(custId: number) {
    this._customerService.PackageHistory(custId).subscribe(x => {
      this.package = x; this.showMessageDiv = false;
      console.log(this.package);
    },
      err => { this.package = null; console.log(err); },
      () => console.log("Package History executed")
    );
  }

}
