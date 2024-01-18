import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserApiService } from 'src/app/helper/service/Api/user-api.service';
import { AuthService } from 'src/app/helper/service/auth.service';
import { RESPONSE_CODE } from 'src/app/helper/utility/app-constant';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit {
  Details = [{colname:'name',title:'Name'},{ colname: 'mobile_no', title: 'Mobile' },{colname:'food_type',title:'Food'},{colname:"member_code",title:'Member Code'},{colname:'delegate_categoryName',title:'Category'},{colname:'email_id',title:"Email"},{colname:'designationName',title:'Desigination'},{colname:'address',title:'Address'},{colname:'created_at',title:'Register On',type:'date'}];
  memberDetails: any;
  profile: any;
  constructor(private userApi: UserApiService,private auth: AuthService,private navCtrl: NavController) { }

  ngOnInit() {
    this.profile = this.auth.currentUserValue;
    this.getMemberDetails()
  }

  getMemberDetails(){
    //@ts-ignore
    this.userApi.getMemberDetails(this.profile.member_fk_id).then((res:ResponseData)=>{
      if(res.statusCode == RESPONSE_CODE.SUCCESS){
        this.memberDetails = res.result
        console.log('MEMBER',this.memberDetails);
      }
    })
  }

  back(){
    this.navCtrl.back()
  }

}
