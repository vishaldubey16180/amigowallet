import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { CustomerReegistrationComponent } from './PackXprez-components/customer-reegistration/customer-reegistration.component';
import { CustomerServiceService } from './packXprez-services/customer-services/customer-service.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './PackXprez-components/login/login.component';
import { HomeComponent } from './PackXprez-components/home/home.component';
import { routing } from './app.routing';
import { SchedulePickupComponent } from './PackXprez-components/schedule-pickup/schedule-pickup.component';
import { EditProfileComponent } from './PackXprez-components/edit-profile/edit-profile.component';
import { AddressComponent } from './PackXprez-components/address/address.component';
import { CheckAvailabilityComponent } from './PackXprez-components/check-availability/check-availability.component';
import { CommonLayoutComponent } from './PackXprez-components/common-layout/common-layout.component';
import { CustomerLayoutComponent } from './PackXprez-components/customer-layout/customer-layout.component';
import { ManagerLayoutComponent } from './PackXprez-components/manager-layout/manager-layout.component';
import { FeedBackComponent } from './PackXprez-components/feed-back/feed-back.component';
import { ModifyAddressComponent } from './PackXprez-components/modify-address/modify-address.component';
import { UpdateAddressComponent } from './PackXprez-components/update-address/update-address.component';
import { PackageHistoryComponent } from './PackXprez-components/package-history/package-history.component';
import { TrackStatusComponent } from './PackXprez-components/track-status/track-status.component';
import { ViewProfileComponent } from './PackXprez-components/view-profile/view-profile.component';
import { PackageManagementComponent } from './PackXprez-components/package-management/package-management.component';
import { ReceivePackageComponent } from './PackXprez-components/receive-package/receive-package.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerReegistrationComponent,
    LoginComponent,
    HomeComponent,
    SchedulePickupComponent,
    EditProfileComponent,
    AddressComponent,
    CheckAvailabilityComponent,
    CommonLayoutComponent,
    CustomerLayoutComponent,
    ManagerLayoutComponent,
    FeedBackComponent,
    ModifyAddressComponent,
    UpdateAddressComponent, PackageHistoryComponent,
    TrackStatusComponent,
    ViewProfileComponent,
    PackageManagementComponent,
    ReceivePackageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [CustomerServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
