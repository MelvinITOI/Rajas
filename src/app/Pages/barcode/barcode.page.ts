import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ResponseData } from 'src/app/helper/dataModal/response';
import { UserApiService } from 'src/app/helper/service/Api/user-api.service';
import { AlertService } from 'src/app/helper/service/alert.service';
import { AuthService } from 'src/app/helper/service/auth.service';
import { RESPONSE_CODE } from 'src/app/helper/utility/app-constant';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.page.html',
  styleUrls: ['./barcode.page.scss'],
})
export class BarcodePage implements OnInit {
  id: any;
  Details: any;
  memberDetails: any;
  profile: any
  name: any;
  membername: any;

  constructor(private navctrl: NavController,private activatedRoute:ActivatedRoute,private userApi:UserApiService,private auth: AuthService,private alertservice: AlertService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.queryParams['id'];
    this.profile = this.auth.currentUserValue;
  }

  ionViewWillEnter() {
    this.getMemberDetails()
  }

  back() {
    this.navctrl.back()
  }

  async getMemberDetails(){
    await this.alertservice.showLoader()
    //@ts-ignore
    this.userApi.getTokenById(this.id).then((res:ResponseData)=>{
      if(res.statusCode == RESPONSE_CODE.SUCCESS){
        this.membername = res.result
        return res
      }
    }).finally(()=>{
      this.alertservice.dismissLoader()
    })
  }

}
