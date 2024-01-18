import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseData } from 'src/app/helper/dataModal/response';
import { User } from 'src/app/helper/dataModal/user';
import { AuthApiService } from 'src/app/helper/service/Api/auth-api.service';
import { AlertService } from 'src/app/helper/service/alert.service';
import { AuthService } from 'src/app/helper/service/auth.service';
import { RESPONSE_CODE } from 'src/app/helper/utility/app-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = {} as FormGroup
  userData: any;
  statusMessage: string | null = ''
  status = false
  loading:boolean = false
  IsSubmitted = false
  constructor(private router: Router, private authApiService: AuthApiService, private alertservice: AlertService, private authservice: AuthService) { }

  ngOnInit() {
    this.initform()
  }

  initform() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  apipayload() {
    const payload: any = this.loginForm.value
    return payload
  }

  async gotologin() {
    this.IsSubmitted = true
    this.userData = {} as User;
    if (!this.loginForm.valid) return;
    await this.alertservice.showLoader()
    //@ts-ignore
    this.authApiService.login(this.apipayload()).then(async (res: ResponseData) => {
      if (res.statusCode == RESPONSE_CODE.SUCCESS) {
        this.userData = res.result;
        this.alertservice.showToast('successfully Save', 'success')
        if (res.result.role.length) {
          this.userData.permission = await this.authservice.mapRolePermission(res.result.role);
        }
        if (this.userData.token) {
          if(+this.userData.member_fk_id){
            this.userData.roleType ='MEMBER';
          }else {
            this.userData.roleType ='ADMIN';
          }
          this.authservice.setApplicationUser(this.userData);
          this.alertservice.showToast('Successfully Logged in', 'success')
          this.loading = true
          this.router.navigate(['/tabs/home']);
          // if (this.userData.member_fk_id) {
          // }
        }
      } else {
        this.alertservice.showToast('Your username or password is incorrect');
      }
    }).catch((error: any) => {
      this.clearAll();
      this.alertservice.showToast('Your username or password is incorrect');
    }).finally(() => {
      this.alertservice.dismissLoader()
    });
  }

  get val() {
    return this.loginForm.controls
  }

  clearAll() {
    this.authservice.clearLocalStorage();
    this.authservice.clearSubscribe();
    this.status = false
  }

}


