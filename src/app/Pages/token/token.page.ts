import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { dataColum, tblFilterQuery } from 'src/app/helper/dataModal/response';
import { dataBuilder } from 'src/app/helper/interface/response';
import { UserApiService } from 'src/app/helper/service/Api/user-api.service';
import { AuthService } from 'src/app/helper/service/auth.service';
import { RESPONSE_CODE } from 'src/app/helper/utility/app-constant';
import { DataListComponent } from 'src/app/modules/shared/form/component/data-list/data-list.component';

@Component({
  selector: 'app-token',
  templateUrl: './token.page.html',
  styleUrls: ['./token.page.scss'],
})
export class TokenPage implements OnInit {
  memberDetails: any;
  token = [ { colname: 'event_date', title: 'Event', type: 'date' }, { colname: 'statusName', title: 'Status' }]
  profile: any;
  foodtoken: any;
  colum: dataColum[] = [{ colName: 'ref_name', colType: 'HEADING' }, { colName: 'ref_name', colType: 'LEFT', dataType: 'IMAGE' },
  { colName: 'token_id', colType: 'DESCRIPTION' }, { colName: 'statusName', colType: 'BADGE' }, { colName: 'food_typeName', colType: 'RIGHT_BOTTOM' }]
  dataConfig: dataBuilder = {
    name: 'Sponsorship',
    column: this.colum,
    showImage: true,
    swipeBtn: [],
    isLazy: true
  }
  isAdmin: boolean = false
  @ViewChild('dataList') dataList: DataListComponent | undefined
  constructor(private userApi: UserApiService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.profile = this.auth.currentUserValue;
    this.isAdmin = this.profile.roleType == 'ADMIN' ? true : false
    this.getTokenDetails()
  }

  getTokenDetails() {
    if (+this.profile.member_fk_id) {
      //@ts-ignore
      this.userApi.getMemberDetails(this.profile.member_fk_id).then((res: ResponseData) => {
        if (res.statusCode == RESPONSE_CODE.SUCCESS) {
          const token = res.result.food_token || [];
          this.foodtoken = token?.map((a: any) => {
            a.statusName = a.status == 1 ? 'Complete' : a.status == 2 ? 'Pending' : ''
            return a
          })
          console.log('FOOD_TOKEN', this.foodtoken);
          return res
        }
      })
    }
  }

  getFoodTokenList = async (ev: tblFilterQuery): Promise<any> => {
    //@ts-ignore
    return await this.userApi.getFoodTokenList(ev)
    // { statusCode: 200, result: { data: this.foodtoken } }
  }

  gotobarcode(i: any) {
    console.log('INDX', i);
    const id = this.foodtoken[i].id
    this.router.navigate(['/barcode'], { queryParams: { id: id } })
  }

}
