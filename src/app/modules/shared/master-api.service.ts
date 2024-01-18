import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { isEmptyObj } from 'src/app/helper/utility/utilityHelper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterApiService {

  constructor(private http: HttpClient, private _sanitizer: DomSanitizer) { }

  getById(tbl: string, id: string | number) {
    return this.http.get(`getById/${tbl}/${id}`).toPromise();
  }

  getFullData(tbl: string, cond: any = '', isFull = false, lazy = {}) {
    const tbl_ext = `` + JSON.stringify(cond);
    const lasyP = isEmptyObj(lazy) ? '' : '/' + JSON.stringify(lazy);
    if (isFull) {
      return this.http.get(`getfull/${tbl}${tbl_ext}${lasyP}`,).toPromise();
    } else {
      return this.http.get(`get/${tbl}${tbl_ext}${lasyP}`).toPromise();
    }
  }

  saveData(tbl: string, data: any) {
    return this.http.post(`saveData/${tbl}`, data).toPromise();
  }
  saveField(data: any) {
    return this.http.post(`field/save`, data).toPromise();
  }
  getField(lazy: any = {}) {
    const lasyP = isEmptyObj(lazy) ? '' : '/' + JSON.stringify(lazy);
    return this.http.get(`field/getList${lasyP}`,).toPromise();
  }

  getFieldByid(id: string | number, isFull = true) {
    const d = isFull ? 'true' : 'false';
    return this.http.get(`field/get/${id}`,).toPromise();
  }

  getChurchByField(id: any) {
    return this.http.get(`church/getByField/${id}`).toPromise();
  }

  generateEmail(id: string | number, data: any) {
    return this.http.post(`genEmail/${id}`, data).toPromise();
  }

  getFieldByZone(id: any) {
    let data: any;
    if (Array.isArray(id)) {
      data = JSON.stringify(id);
    }
    return this.http.get(`field/getByZone/${data}`).toPromise();
  }

  exportData(tName = '', data: any = []) {
    data = JSON.stringify(data);
    return this.http.post(`exportData/${tName}`, data,{responseType: 'blob'}).toPromise();
  }
  sendEmail(data: Array<any>) {
  //   if (!Array.isArray(data)) {
  //     data = [data];
  //   }
  //   return this.http.post(`${environment.emailApiUrl}/sendEmail`, data).toPromise();
   }
}
