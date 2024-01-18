import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { User } from 'src/app/helper/dataModal/user';
import { OverlayEventDetail } from '@ionic/core/components';
import { AlertService } from 'src/app/helper/service/alert.service';
import { AuthService } from 'src/app/helper/service/auth.service';
import { confirmBox } from 'src/app/helper/shared-interface';
import { UrlServices } from 'src/app/helper/utility/urlservices';
import { RESPONSE_CODE } from 'src/app/helper/utility/app-constant';
import { UserApiService } from 'src/app/helper/service/Api/user-api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  userData: User = {} as User;
  @ViewChild(IonModal) modal: IonModal | any
  showfield:boolean = false
  memberDetails: any;
  constructor(private router: Router, private alertservic: AlertService, private auth: AuthService,private userApi: UserApiService) { }

  ngOnInit() {
    this.userData = this.auth.currentUserValue;
    console.log('PROFILE',this.userData);
    this.init()
  }

  init(){
    this.getMemberDetails();
  }

  getMemberDetails() {
    if (this.userData.roleType == 'MEMBER') {
      this.showfield = true
      //@ts-ignore
      this.userApi.getMemberDetails(this.userData.member_fk_id).then((res: ResponseData) => {
        if (res.statusCode == RESPONSE_CODE.SUCCESS) {
          this.memberDetails = res?.result
          console.log('MEMBER', this.memberDetails);
        }
      })
    }
  }

  gotologout() {
    const alert: confirmBox = {
      header: 'Log Out',
      message: 'Are you sure want to Logout ?',
      button1: 'cancel',
      button2: 'Logout',
      type: 'confirm',
      backdropDismiss: false
    }
    this.alertservic.confirmBox(alert).then((res: any) => {
      if (res?.role == 'confirm') {
        this.router.navigate([UrlServices.AUTH_PAGE.LOGIN_URL])
      }
    })
  }

  //modal

  cancel() {
    this.modal.dismiss();
  }

  confirm() {
    this.modal.dismiss();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this.message = `Hello, ${ev.detail.data}!`;
    }
  }

}
