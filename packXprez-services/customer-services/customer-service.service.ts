import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IAddCustomer } from '../../PackXprez-interfaces/IAddCustomer';
import { ICust } from '../../PackXprez-interfaces/ICust';
import { IAddress } from '../../PackXprez-interfaces/IAddress';
import { ICustomer } from '../../PackXprez-interfaces/ICustomer';
import { ICheckService } from '../../PackXprez-interfaces/ICheckService';
import { IFeedBack } from '../../PackXprez-interfaces/IFeedbck';
import { IPackage } from '../../PackXprez-interfaces/IPackage';
import { IPackageManagement } from '../../PackXprez-interfaces/IPackageManagement';
import { IUpdate } from '../../PackXprez-interfaces/IUpdate';
import { ISchedule } from '../../PackXprez-interfaces/ISchedule';
import { IWalkInAddress } from '../../PackXprez-interfaces/IWalkInAddress';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private http: HttpClient) { }

  registerUser(cname: string, password: string, email: string, contact: number, building: string, street: string,locality:string, pincode: number): Observable<boolean> {
    var custObj: IAddCustomer;
    custObj = {
      Name: cname,
      Password: password,
      EmailId: email,
      ContactNo: contact,
      BuildingNo: building,
      StreetNo: street,
      Locality:locality,
      Pincode: pincode
    }
    return this.http.post<boolean>('https://localhost:44385/api/Customer/RegisterCustomer', custObj).pipe(catchError(this.errorHandler));
    //return 0;
  }

  AddAddress(addObj: IAddress) {
    return this.http.post<boolean>('https://localhost:44385/api/Customer/AddAddress', addObj).pipe(catchError(this.errorHandler));
    //return 0;
  }

  validateCredentials(emailId: string, password: string): Observable<string> {
    var loginObj: ICust;
    loginObj = {
      EmailId: emailId,
      Password: password
    };
       var r= this.http.post<string>('https://localhost:44385/api/Customer/ValidateUser', loginObj).pipe(catchError(this.errorHandler));
    //console.log(p);
    return r;
  }

  GetCustomerId(emailId: string): Observable<string> {
    let params = "?emailId=" + emailId;
    var retVal = this.http.get<string>('https://localhost:44385/api/Customer/GetCustomerId' + params).pipe(catchError(this.errorHandler));
    return retVal;
  }

  GetCustomer(custId: number): Observable<ICustomer> {
    let params = "?custId=" + custId;
    var retVal = this.http.get<ICustomer>('https://localhost:44385/api/Customer/GetCustomer' + params).pipe(catchError(this.errorHandler));
    return retVal;
  }

  GetAddressByCustId(custId: number): Observable<IAddress[]> {
    let params = "?custId=" + custId;
    var retVal = this.http.get<IAddress[]>('https://localhost:44385/api/Customer/GetAddressByCustId' + params).pipe(catchError(this.errorHandler));
    return retVal;
  }

  GetAddressByCustAddressId(custId: number, addId: number): Observable<IAddress> {
    let params = "?custId=" + custId;
    let params1 = "&addId=" + addId;
    var retVal = this.http.get<IAddress>('https://localhost:44385/api/Customer/GetAddressByCustAddressId' + params + params1).pipe(catchError(this.errorHandler));
    return retVal;
  }

  CheckService(frompin: number, topin: number): Observable<string> {
    var servObj: ICheckService;
    servObj = { From_Pin: frompin, To_Pin: topin };
    return this.http.post<string>('https://localhost:44385/api/Customer/checkService', servObj).pipe(catchError(this.errorHandler))
  }

  UpdateAddress(addObj: IAddress): Observable<boolean>
  {
    var returnVal = this.http.put<boolean>('https://localhost:44385/api/Customer/UpdateAddress', addObj).pipe(catchError(this.errorHandler));
    return returnVal;
  }

  RemoveAddress(custId: number, addId: number): Observable<boolean>
  {
    let param1 = "?custId=" + custId+"&addId=" + addId
    //let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: addObj };
    var returnVal = this.http.delete<boolean>('https://localhost:44385/api/Customer/RemoveAddress' + param1).pipe(catchError(this.errorHandler));
    return returnVal;
  }

  CustomerFeedback(custId: number, feedbackType: string, comments: string): Observable<boolean> {
    var feedObj: IFeedBack;
    feedObj = { sNo: 0, custId: custId, feedBackType: feedbackType, comments: comments };
    console.log(feedObj);
    return this.http.post<boolean>('https://localhost:44385/api/Customer/CustFeedback', feedObj).pipe(catchError(this.errorHandler));
  }

  UpdateProfile(custObj: ICustomer): Observable<boolean> {
    var returnVal = this.http.put<boolean>('https://localhost:44385/api/Customer/UpdateDetails', custObj).pipe(catchError(this.errorHandler));
    return returnVal;
  }

  TrackStatus(awbNo: number): Observable<string> {
    return this.http.get<string>('https://localhost:44385/api/Customer/TrackStatus?AwbNo=' + awbNo).pipe(catchError(this.errorHandler));
  }

  PackageHistory(custId: number): Observable<IPackage[]> {
    return this.http.get<IPackage[]>('https://localhost:44385/api/Customer/PackageHistory?custId=' + custId).pipe(catchError(this.errorHandler))
  }

  PackageManagement(): Observable<IPackage[]> {
    return this.http.get<IPackage[]>('https://localhost:44385/api/Customer/ManagePackage').pipe(catchError(this.errorHandler));
  }

  GenerateAwbNo(tid: number): Observable<boolean> {
    var packMan: IPackage;
    packMan = { Tid: tid, CustId: 0, FromAddress: null, ToAddress: null, Status: null, Awbno: 0 };
    return this.http.put<boolean>('https://localhost:44385/api/Customer/GenerateAWBNo',packMan).pipe(catchError(this.errorHandler));
  }

  GetButton(tid: number): Observable<string> {
    return this.http.get<string>('https://localhost:44385/api/Customer/GetButton?tid=' + tid).pipe(catchError(this.errorHandler));
  }

  UpdateStatus(tid: number, status: string): Observable<boolean> {
    var updObj: IUpdate;
    updObj = { TransactionId: tid, Value: status };
    console.log(updObj);
    return this.http.put<boolean>('https://localhost:44385/api/Customer/UpdateStatus', updObj).pipe(catchError(this.errorHandler));
  }

  SchedulePickup(custId: number, buildingNo: string, streetNo: string, locality: string, pincode: number, fromAddress: string, contactNo: number): Observable<boolean> {
    var schObj: ISchedule;
    schObj = { custId: custId, buildingNo: buildingNo, streetNo: streetNo, locality: locality, pincode: pincode, fromAddress: fromAddress, contactNo: contactNo };
    console.log(  schObj);
    return this.http.post<boolean>('https://localhost:44385/api/Customer/PackageHistory', schObj).pipe(catchError(this.errorHandler));
  }

  SchedulePickup1(toAddress: string, fromAddress: string): Observable<boolean> {
    var schObj: IWalkInAddress;
    schObj = { toAddreess: toAddress, fromAddress }
    console.log(schObj);
    return this.http.post<boolean>('https://localhost:44385/api/Customer/WalkInAddress', schObj).pipe(catchError(this.errorHandler));
  }


  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "server error");
  }

  }
