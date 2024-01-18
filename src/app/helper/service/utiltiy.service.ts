import { HttpClient, HttpContext, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtiltiyService {
  constructor(private http: HttpClient) { }
  uploadFiles(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('files', file);
    const request = new HttpRequest('POST', `/uploadFile`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(request);
  }
  //return a promise that resolves with a File instance
  urlToFile(url: RequestInfo | URL, filename: string, mimeType: string) {
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  }

  downloadFiles(url: string): Observable<HttpEvent<any>> {
    const request = new HttpRequest('GET', url, {
      reportProgress: true,
      responseType: 'blob',
      observe: 'events',
    },{headers : new HttpHeaders({ACCEPT_FULL_URL : 'true'})});
    return this.http.request(request);
  }
}