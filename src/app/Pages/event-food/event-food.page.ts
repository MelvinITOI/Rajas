import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ResponseData } from 'src/app/helper/interface/response';
import { UserApiService } from 'src/app/helper/service/Api/user-api.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AuthService } from 'src/app/helper/service/auth.service';
import { User } from 'src/app/helper/dataModal/user';
import { ActivatedRoute } from '@angular/router';
import { RESPONSE_CODE } from 'src/app/helper/utility/app-constant';
import { AlertService } from 'src/app/helper/service/alert.service';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-event-food',
  templateUrl: './event-food.page.html',
  styleUrls: ['./event-food.page.scss'],
})
export class EventFoodPage implements OnInit {
  venue: any;
  col_venue = [{ colname: 'venueName' }]
  scanActive: boolean = false;
  member_id = new FormControl('', [Validators.required]);
  userDetails: User = {} as User
  type: 1 | 2 | 3 = 1
  header: any
  showsuccess: boolean = false
  Visitors: any;
  showinput: boolean = false
  memberDetails: any;
  Details = [{ colname: 'member_code', title: 'Member Code' }, { colname: 'accompay_id', title: 'Accompay ID' }]
  dateTime: any;
  accompay: any;
  isAccompaySubmit: boolean = false
  loading: boolean = false
  constructor(private navCtrl: NavController, private userApi: UserApiService, private auth: AuthService,
    private activateRoute: ActivatedRoute, private alertservice: AlertService) { }

  ngOnInit() {
    this.type = this.activateRoute.snapshot.queryParams['type'] || ''
    this.userDetails = this.auth.currentUserValue
    this.header = this.type == 1 ? 'Visitor' : this.type == 2 ? 'Food Collector' : 'Event Manager'
    console.log('userdata', this.userDetails)
    this.getVenue();
    this.getMemberDetails();
    setTimeout(() => {
      this.dateTime = new Date().toISOString();
    });
    this.member_id.valueChanges.subscribe((res: any) => {
      if (res.length == 6) {
        this.getaccampay()
      }
    })
  }

  ngAfterViewInit() {
    BarcodeScanner.prepare();
  }

  ngOnDestroy() {
    BarcodeScanner.stopScan()
  }

  getMemberDetails() {
    //@ts-ignore
    this.userApi.getMemberDetails(this.userDetails.user_id).then((res: ResponseData) => {
      if (res.statusCode == RESPONSE_CODE.SUCCESS) {
        this.memberDetails = res?.result?.accompay
        console.log('MEMBER', this.memberDetails);
      }
    })
  }

  back() {
    this.navCtrl.back()
  }

  getVenue() {
    //@ts-ignore
    this.userApi.getVenue().then((res: ResponseData) => {
      this.venue = res.result[0]
    })
  }

  getmember() {
    this.showinput = true
  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  async startScanner() {

    const allowed = await this.checkPermission();
    if (allowed) {
      
      this.scanActive = true;
      BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan();
      console.log('bar code', this.scanActive, result);
      
      if (result.hasContent) {
        this.scanActive = false;
        this.member_id.setValue(result.content)
        if (this.member_id.value) {
          this.getaccampay();
        }
        alert(result.content); //The QR content will come out here
        //Handle the data as your heart desires here
      } else {
        alert('NO DATA FOUND!');
      }
    } else {
      alert('NOT ALLOWED!');
    }
  }

  submit() {
    if (this.type == 1) {
      this.getvisitors()
    }
    else if (this.type == 2) {
      this.getfoodtoken()
    } else {
      this.getEventManager()
    }
  }

  //Visitors
  async getvisitors() {
    await this.alertservice.showLoader()
    this.userApi.getVisitors(this.member_id.value).then((res: ResponseData) => {
      if (res.statusCode == RESPONSE_CODE.SUCCESS) {
        this.Visitors = res.result
        this.showsuccess = true
        setTimeout(() => {
          this.navCtrl.back();
        }, 1000);
        console.log('VISITORS', this.Visitors);
      }
    }).finally(() => {
      this.alertservice.dismissLoader()
    })
  }
  //Food Collector
  async getfoodtoken() {
    await this.alertservice.showLoader()
    //@ts-ignore
    this.userApi.getfoodToken(this.member_id.value).then((res: ResponseData) => {
      if (res.statusCode == RESPONSE_CODE.SUCCESS) {
        this.showsuccess = true
        setTimeout(() => {
          this.navCtrl.back();
        }, 1000);
        console.log('FOOD', res);
      }
    }).finally(() => {
      this.alertservice.dismissLoader()
    })
  }
  //Event Manager
  async getEventManager() {
    await this.alertservice.showLoader()
    //@ts-ignore
    this.userApi.getEventManager(this.member_id.value).then((res: ResponseData) => {
      if (res.statusCode == RESPONSE_CODE.SUCCESS) {
        this.showsuccess = true
        setTimeout(() => {
          this.navCtrl.back();
        }, 1000);
        console.log('EVENT', res);
      }
    }).finally(() => {
      this.alertservice.dismissLoader()
    })
  }

  async getaccampay() {
    this.loading = true
    await this.alertservice.showLoader()
    this.isAccompaySubmit = true
    //@ts-ignore
    this.userApi.getaccompay(this.member_id.value).then((res: ResponseData) => {
      if (res.statusCode == RESPONSE_CODE.SUCCESS) {
        this.accompay = res.result
        console.log('ACCOMPAY', res);
      }
    }).finally(() => {
      this.alertservice.dismissLoader()
      this.loading = false
    })
  }

  select_accompay(i: any) {
    console.log(i, 'index');

  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  // checkbox



}
