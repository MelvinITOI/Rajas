import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpCallHandleService } from './http-call-handle.service';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivationEnd } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {


  constructor(private authenticationService: AuthService,
    private router: Router,
    private httpcallHandle: HttpCallHandleService) {

    this.router.events.subscribe(event => {
      // An event triggered at the end of the activation part of the Resolve phase of routing.
      if (event instanceof ActivationEnd) {
        // Cancel pending calls
        //this.httpcallHandle.cancelPendingRequests();
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = `${environment.apiUrl}/${request.url}`;
    console.log(request)
    if (request.headers.get("ACCEPT_FULL_URL")) {
      url = request.url
    }
    const token: any = this.authenticationService.getToken();
    if (token) {
      request = request.clone({
        url: url,
        setHeaders: {
          //'Content-Type': 'application/json',
          //'Accept': 'application/json',
          //'Access-Control-Allow-Origin': '*',
          //'X-AppName':  'Inhertiv Initiative Flow',
          'Authorization': 'Bearer ' + token,
        },
        //body : request.headers.get("skipJson") && request.method=='post' ? request.body : JSON.parse(request.body) 
      });
    } else {
      request = request.clone({
        url: url,
      });
    }
    return next.handle(request).pipe(takeUntil(this.httpcallHandle.onCancelPendingRequests()));
  }
}
