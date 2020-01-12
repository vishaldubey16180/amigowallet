import { Component, OnInit } from '@angular/core';
import { IPackageManagement } from '../../PackXprez-interfaces/IPackageManagement';
import { CustomerServiceService } from '../../packXprez-services/customer-services/customer-service.service';
import { IPackage } from '../../PackXprez-interfaces/IPackage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-package-management',
  templateUrl: './package-management.component.html',
  styleUrls: ['./package-management.component.css']
})
export class PackageManagementComponent implements OnInit {

  package: IPackage[];
  showMessageDiv: boolean;
  stat: boolean;
  status: string;

  constructor(private _customerService: CustomerServiceService, private _router: Router) { }

  ngOnInit() {
    this.PackageManagement();
  }

  PackageManagement()
  {
    this._customerService.PackageManagement().subscribe(x => { this.package = x;this.showMessageDiv = false; },
      err => { this.package = null; alert(err); },
      () => console.log("Manage Package method executed"));

      }

  GenerateAwb(tid: number) {
    console.log(tid);
    this._customerService.GenerateAwbNo(tid).subscribe(x => {
      this.stat = x;
      if (x) { alert("successfully picked up"); this.ngOnInit(); }
      else { alert("some error occured") }
    },
      err => { alert("Some error ,Please contact Admin.") },
      () => console.log("Awb Number generation method executed")
    );
  }

  UpdateStatus(tid: number, status: string) {
    console.log(tid);
    console.log(status);
    this._customerService.UpdateStatus(tid, status).subscribe(x => { this.stat = x; alert('Updated Status'); this.ngOnInit(); },
      err => { alert('some error occured') },
      () => console.log("Update Status method executed"));
    //this._router.navigate(['packageManagement']);


  }
}
