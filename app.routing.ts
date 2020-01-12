import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CustomerReegistrationComponent } from './PackXprez-components/customer-reegistration/customer-reegistration.component';
import { LoginComponent } from './PackXprez-components/login/login.component';
import { HomeComponent } from './PackXprez-components/home/home.component';
import { SchedulePickupComponent } from './PackXprez-components/schedule-pickup/schedule-pickup.component';
import { EditProfileComponent } from './PackXprez-components/edit-profile/edit-profile.component';
import { CheckAvailabilityComponent } from './PackXprez-components/check-availability/check-availability.component';
import { FeedBackComponent } from './PackXprez-components/feed-back/feed-back.component';
import { AddressComponent } from './PackXprez-components/address/address.component';
import { UpdateAddressComponent } from './PackXprez-components/update-address/update-address.component';
import { TrackStatusComponent } from './PackXprez-components/track-status/track-status.component';
import { PackageHistoryComponent } from './PackXprez-components/package-history/package-history.component';
import { PackageManagementComponent } from './PackXprez-components/package-management/package-management.component';
import { ReceivePackageComponent } from './PackXprez-components/receive-package/receive-package.component';

const routes: Routes = [
  { path: 'registration', component: CustomerReegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'schedulePickup', component: SchedulePickupComponent },
  { path: 'editProfile', component: EditProfileComponent },
  { path: 'check', component: CheckAvailabilityComponent },
  { path: 'feedback', component: FeedBackComponent },
  { path: 'addAddress', component: AddressComponent },
  { path: 'updateAddress/:custId/:addId', component: UpdateAddressComponent },
  { path: 'status', component: TrackStatusComponent },
  { path: 'packageHistory', component: PackageHistoryComponent },
  { path: 'packageManagement', component: PackageManagementComponent },
  { path: 'recievePackage', component: ReceivePackageComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent }
];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes)
