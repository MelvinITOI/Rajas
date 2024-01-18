import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { ResponseData, tblFilterQuery } from 'src/app/helper/dataModal/response';
import { UserApiService } from 'src/app/helper/service/Api/user-api.service';
import { AuthService } from 'src/app/helper/service/auth.service';
import { RESPONSE_CODE } from 'src/app/helper/utility/app-constant';
import { OverlayEventDetail } from '@ionic/core/components';
import { AlertService } from 'src/app/helper/service/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  moon: boolean = false
  profile: any
  Dashboard_1 = [{colname:'total_member',title:'Total Member'},{colname:'total_accompay',title:'Total Accompay'}]
  Dashboard_2 = [{colname:'male_member',title:'Male'},{colname:'female_member',title:'Female Member'}]
  Dashboard_3 = [{colname:'above_12_Years',title:'Above 12 Years'},{colname:'below_12_Years',title:'Below 12 Years'}]
  Details = [{ colname: 'name', title: 'Name' }, { colname: 'mobile_no', title: 'Mobile' }, { colname: "member_code", title: 'Member Code' }, { colname: 'delegate_categoryName', title: 'Category' }, { colname: 'email_id', title: "Email" }, { colname: 'designationName', title: 'Desigination' }, { colname: 'address', title: 'Address' }, { colname: 'created_at', title: 'Register On', type: 'date' }];
  eventData = [{ colname: 'event_name', title: 'Event' }, { colname: 'from_date', title: 'From Date', type: 'date' }, { colname: 'to_date', title: 'To Date', type: 'date' }, { colname: 'email_id', title: 'Email-ID' }, { colname: 'mobile_no', title: 'Mobile No' }, { colname: 'description', title: "Description" }, { colname: 'web_url', title: 'Web Url' }];
  sessions = [{ colname: 'venu_date_time', title: 'Date', type: 'DATE' }, { colname: 'venu_date_time', title: 'Time', type: 'TIME' }, { colname: 'venueName', title: 'Place' }]
  result: any;
  showfield: boolean = true
  memberDetails: any;
  name: any;
  @ViewChild(IonModal) modal: IonModal | undefined;
  dashboard: any;
  event: any;
  constructor(private auth: AuthService, private userApi: UserApiService, private modalCtrl: ModalController, private alertservice: AlertService) { }

  ngOnInit() {
    this.init()
    console.log('PROFILE', this.profile);
  }

  init() {
    this.profile = this.auth.currentUserValue;
    if (this.profile.member_fk_id == '0') {
      this.showfield = false
    }
    this.getMemberDetails();
    this.getdashboardDetails();
  }

  ionViewWillEnter() {
    this.init();
  }
  //modal 
  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
  confirm() {
    this.modalCtrl.dismiss(this.name, 'confirm');
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  async getMemberDetails() {
    if (this.profile.roleType == 'MEMBER') {
      //@ts-ignore
      this.userApi.getMemberDetails(this.profile.member_fk_id).then((res: ResponseData) => {
        if (res.statusCode == RESPONSE_CODE.SUCCESS) {
          this.memberDetails = res?.result
          console.log('MEMBER', this.memberDetails);
        }
      })
    }
  }

  getdashboardDetails() {
    if (this.profile.roleType == 'ADMIN') {
      //@ts-ignore
      this.userApi.getdashboardDetails().then((res: ResponseData) => {
        this.dashboard = res.result
        console.log('DASHBOARD', this.dashboard);
      })
    }
  }

  darkMode(event: any) {
    console.log(event.detail.checked);
    if (event.detail.checked) {
      this.moon = true
      document.body.setAttribute('color-theme', 'dark')
    } else {
      this.moon = false
      document.body.setAttribute('color-theme', 'light')
    }
  }

}
