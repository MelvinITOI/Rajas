import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { fileCompData } from 'src/app/helper/core.data.interface';
import { ResponseData } from 'src/app/helper/dataModal/response';
import { UserApiService } from 'src/app/helper/service/Api/user-api.service';
import { AlertService } from 'src/app/helper/service/alert.service';
import { AuthService } from 'src/app/helper/service/auth.service';
import { RESPONSE_CODE } from 'src/app/helper/utility/app-constant';
import { ImageUploadComponent } from 'src/app/modules/image-helper/image-upload/image-upload.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  dataForm: FormGroup = {} as FormGroup
  inputs = [{ colname: 'name', title: 'Name' }, { colname: 'mobile_no', title: 'Mobile No' }, {colname:'food_type',title:'Food'},{ colname: "member_code", title: 'Member Code' }, { colname: 'delegate_categoryName', title: 'Category Name' }, { colname: 'email_id', title: "Email-ID" }, { colname: 'designationName', title: 'Desigination Name' },{ colname: 'address', title: 'Address' },];
  profile: any;
  setTimeout: any;
  memberDetails: any;
  savedMember: any;
  imageData: fileCompData = {
    label: '',
    filePath: '',
    fileType: 'FILE'
  }
  @ViewChild('imageupload') imageupload: ImageUploadComponent | any
  constructor(private navCtrl: NavController, private auth: AuthService, private alertservice: AlertService, private userApi: UserApiService) { }

  ngOnInit() {
    this.profile = this.auth.currentUserValue;
    this.initform()
    console.log('PROFILE', this.profile);
  }

  ionViewWillEnter() {
    this.getMemberDetails()
  }

  initform() {
    this.dataForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      mobile_no: new FormControl('', [Validators.required]),
      food_type: new FormControl('', [Validators.required]),
      member_code: new FormControl('', [Validators.required]),
      delegate_categoryName: new FormControl('', [Validators.required]),
      email_id: new FormControl('', [Validators.required]),
      designationName: new FormControl('', [Validators.required]),
      address: new FormControl('', Validators.required),
    })
  }

  async getMemberDetails() {
    await this.alertservice.showLoader()
    //@ts-ignore
    this.userApi.getMemberDetails(this.profile.member_fk_id).then((res: ResponseData) => {
      if (res.statusCode == RESPONSE_CODE.SUCCESS) {
        this.memberDetails = res.result
        this.memberDetails.member_fk_id = res.result.ppt.member_fk_id
        console.log('MEMBER', this.memberDetails);
        this.mapdata()
      }
    }).finally(() => {
      this.alertservice.dismissLoader()
    })
  }

  async SaveMember() {
    await this.alertservice.showLoader()
    //@ts-ignore
    this.userApi.saveMember(this.apiPayload()).then((res: ResponseData) => {
      if (res.statusCode == RESPONSE_CODE.SUCCESS) {
        this.savedMember = res.result
        this.alertservice.showToast('successfully Saved', 'success')
        this.navCtrl.back()
        console.log('SAVEMEMBER', this.SaveMember);
      }
    }).finally(() => {
      this.alertservice.dismissLoader()
    })
  }

  apiPayload() {
    let payment: any = {}
    payment.currency_type = this.memberDetails.payment[0].currency_type
    payment.amount = this.memberDetails.payment[0].amount
    payment.payment_status = this.memberDetails.payment[0].status
    payment.payment_mode_fk_id = this.memberDetails.payment[0].payment_mode_fk_id
    const payload: any = this.dataForm.value
    payload.document_path = this.imageupload.fileInfos.filePath
    payload.payment = payment
    payload.id = this.memberDetails.id
    return payload
  }

  back() {
    this.navCtrl.back()
  }

  async mapdata() {
    setTimeout(() => {
      this.dataForm?.patchValue(this.memberDetails)
    }, 1000)
  }

}
