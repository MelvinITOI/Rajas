import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { roleMap, User } from '../dataModal/user';
import { UrlServices } from '../utility/urlservices';
import { isEmptyObj } from '../utility/utility-helper';
import { RolePermissionService } from './role-permission.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RolePermissionService {
  dbProfileName: string = '_gemsAppUser_dev';
  user: User = ({}) as User;
  private userBS: BehaviorSubject<User> = new BehaviorSubject<User>(({}) as User);
  public currentUser: Observable<User>;
  constructor(private router: Router) {
    super();
    this.userBS = new BehaviorSubject<User>(({}) as User);
    this.currentUser = this.userBS.asObservable();
    this.setUserBS(this.getUser());
  }

  public get currentUserValue(): User {
    return this.userBS.value;
  }

  setUserBS(user: User) {
    this.userBS.next(user)
    this.userRoleData = this.currentUserValue.permission || {} as roleMap;
  }

  getUser() {
    const res: any = localStorage.getItem(this.dbProfileName);
    return JSON.parse(res) || {};
  }
  setApplicationUser(user: User) {
    this.clearLocalStorage();
    if (user.staff) {
      user.fname = user.staff?.name || '';
      user.lname = user.staff?.last_name || '';
      user.imageUrl = user.staff.profile_image || '';
    }
    this.setUserBS(user);
    localStorage.setItem(this.dbProfileName, JSON.stringify(user));
  }

  loginStatus() {
    if (isEmptyObj(this.currentUserValue)) {
      this.setUserBS(this.getUser());
    }
    if (this.currentUserValue && this.currentUserValue.token) {
      return true;
    }
    return false;
  }

  async getUserDetails() {
    return new Promise((resolve, reject) => {
      if (!isEmptyObj(this.currentUserValue)) {
        console.log(this.currentUserValue, 'currentr user value')
        resolve(this.currentUserValue);
      } else {
      }
    });
  }

  getToken() {
    return this.currentUserValue.token || '';
  }

  clearLocalStorage() {
    localStorage.removeItem(this.dbProfileName);
    localStorage.clear();
  }

  clearSubscribe() {
    this.userBS.next(({}) as User);
    this.user = ({}) as User;
  }

  logout() {
    this.clearLocalStorage();
    this.clearSubscribe();
    this.router.navigate([UrlServices.AUTH_PAGE.LOGIN_URL]);
  }

  redirectToLogin() {
    this.router.navigate([UrlServices.AUTH_PAGE.LOGIN_URL]);
  }
  redirectToDashboard() {
    this.router.navigate([UrlServices.DASHBOARD_ROUTE]);
  }

  redirectToDenied() {
    this.router.navigate([UrlServices.ACCESS_DENIED_ROUTE]);
  }
}
