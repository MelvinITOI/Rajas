import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserApiService } from 'src/app/helper/service/Api/user-api.service';
import { AuthService } from 'src/app/helper/service/auth.service';
import { RESPONSE_CODE } from 'src/app/helper/utility/app-constant';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  profile: any;
  paymentDetails: any;
  payment = [{colname:'memberName',name:'Name'},{colname:'payment_id',name:'Payment'},{colname:'payment_modeName',name:'Payment Mode'},{colname:'statusName',name:'Status'},{colname:'transaction_ref',name:'Transaction Ref'},{colname:'payment_date',name:'Payment Date',type:'DATE'}]
  constructor(private userApi: UserApiService,private auth: AuthService,private navctrl: NavController) { }

  ngOnInit() {
    this.profile = this.auth.currentUserValue;
    this.getMemberDetails()
  }

  async getMemberDetails() {
    if (this.profile.roleType == 'MEMBER') {
      //@ts-ignore
      this.userApi.getMemberDetails(this.profile.member_fk_id).then((res: ResponseData) => {
        if (res.statusCode == RESPONSE_CODE.SUCCESS) {
          this.paymentDetails = res?.result.payment.map((a: any) => {
            a.statusName = a.status == 1 ? 'Paid' : a.status == 2 ? 'Pending' : ''
            return a
          })
          console.log('PAYMENT', this.paymentDetails);
          return res
        }
      })
    }
  }

  submit(){
    this.navctrl.back()
  }

}
