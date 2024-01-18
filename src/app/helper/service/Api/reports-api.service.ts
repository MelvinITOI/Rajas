import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isEmptyObj } from '../../utility/utility-helper';

@Injectable({
  providedIn: 'root'
})
export class ReportsApiService {

  constructor(private http: HttpClient) { }
  getList(ev: any) {
    const lasyP = isEmptyObj(ev) ? '' : '/' + JSON.stringify(ev);
    return this.http.get(`/staffReport/getList${lasyP}`).toPromise();
  }

  getMonthByStaff(id: any, month: string, year: string) {
    return this.http.get(`/staffReport/getMonthByStaff/${month}/${year}/${id}`).toPromise();
  }
  getReportAvailableLang(id: any, month: string, year: string) {
    return this.http.get(`/staffReport/getAvilableLang/${id}/${month}/${year}`).toPromise();
  }
  save(data: any) {
    return this.http.post(`/staffReport/save`, data).toPromise();
  }
}