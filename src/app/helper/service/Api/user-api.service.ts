import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isEmptyObj } from '../../utility/utility-helper';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  memberList: any = [];
  activityList: any;
  constructor(private http: HttpClient) { }
  otpSend(num: any, type = 'LOGIN') {
    return this.http.get(`/sendOTP/${num}/${type}`).toPromise();
  }
  resendOtp(num: any, type = 'LOGIN') {
    return this.http.get(`/resendOTP/${num}/${type}`).toPromise();
  }
  login(data: any) {
    return this.http.post(`/Auth/loginVerifyOtp`, data).toPromise();
  }
  updateStats(data: any) {
    return this.http.post(`/Auth/updateStats`, data).toPromise();
  }

  getFamilyByStaff(id: string | number) {
    return this.http.get(`/staff/getFamilyByStaff/${id}`).toPromise();
  }
  searchStaff(terms: any, ev: any) {
    const lasyP = isEmptyObj(ev) ? '' : '/' + JSON.stringify(ev);
    return this.http.get(`/staff/search/${terms}/${lasyP}`).toPromise();
  }

  searchChurch(terms: any, ev: any) {
    const lasyP = isEmptyObj(ev) ? '' : '/' + JSON.stringify(ev);
    return this.http.get(`/church/search/${terms}/${lasyP}`).toPromise();
  }
  getMasterData(tbl: any, cond = [], lazy = {}) {
    const tbl_ext = `/` + JSON.stringify(cond);
    const lasyP = isEmptyObj(lazy) ? '' : '/' + JSON.stringify(lazy);
    return this.http.get(`/get/${tbl}${tbl_ext}${lasyP}`).toPromise();
  }

  //MasterData
  getById(tbl: string, id: string | number) {
    return this.http.get(`getById/${tbl}/${id}`).toPromise();
  }

  //------------------------------------------------------------------------------------------------------------------------------//
  //RAJAS

  //Dasboard Details
  getdashboardDetails() {
    return (lastValueFrom(this.http.get(`dashboard/getTotalMember`)))
  }

  //get member Details
  getMemberDetails(id: any) { // Pass User_id
    return (lastValueFrom(this.http.get(`member/getMemberDetail/${id}`)))
  }
  //save member
  saveMember(data: any) {
    return (lastValueFrom(this.http.post(`member/save`, data)))
  }
  //venue list dropdown
  getVenue() {
    return (lastValueFrom(this.http.get(`venue/get`)))
  }
  // Visitors
  regVisitors(id: any) {
    return (lastValueFrom(this.http.get(`member/visitStatusUpdateById/${id}`)))
  }
  //Acompay
  getaccompay(id: any) {
    return (lastValueFrom(this.http.get(`member/getAccompayByMember/${id}`)))
  }
  //Visitors
  getVisitors(id: any) {
    return (lastValueFrom(this.http.get(`member/visitStatusUpdateById/${id}`)))
  }
  //food Collector
  getfoodToken(id: any,data:any) {
    return (lastValueFrom(this.http.post(`token/tokenRegister/${id}`,data)))
  }
  //Event Manager
  getEventManager(id: any) {
    return (lastValueFrom(this.http.get(`eventmember/UpdateStatus/${id}`)))
  }

  getTokenById(id: any) { // Pass User_id
    return (lastValueFrom(this.http.get(`token/getById/${id}`)))
  }
  //Food Token 
  getFoodTokenList(ev:any){
    const lasyP = isEmptyObj(ev) ? '' : '/' + JSON.stringify(ev);
    return (lastValueFrom(this.http.get(`/token/getList${lasyP}`)));
  }
}
