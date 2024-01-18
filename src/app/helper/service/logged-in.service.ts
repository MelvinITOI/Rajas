import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService implements CanActivate {
  constructor(private router: Router, private auth: AuthService) { }
  async canActivate() {
    if (this.auth.loginStatus()) {
      return true;
    } else {

      this.router.navigateByUrl("/login",{ skipLocationChange: true });
      return false;
    }
  }
}
