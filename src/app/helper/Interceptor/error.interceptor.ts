import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { AlertService } from '../service/alert.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService, private alertService: AlertService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(error => {
      switch (error.status) {
        case 401:
          this.alertService.showToast('Token expired, Please login again.', 'warning');
          this.authenticationService.logout();
          break;
        case 400:
          const message = error?.error?.message || ''
          if (message)
            this.alertService.showToast(message, 'warning');
          break;
        case 500:
          this.alertService.showToast('Internal Server Error', 'warning');
          break;
      }
      const error_msg = error.error.message || error.statusText;
      return throwError(error_msg);
    }));
  }
}