import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/helper/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  Details = [{ colname: 'first_name', title: 'Name', icon: 'person' }, { colname: 'email_id', title: 'E-mail', icon: 'mail' }, { colname: 'mobile_no', title: 'Mobile No', icon: 'call' }, { colname: 'last_login_date', title: 'Login Date', type: 'DATE', icon: 'calendar' }]
  profile: any;
  constructor(private auth: AuthService, private navCtrl: NavController) { }

  ngOnInit() {
    this.profile = this.auth.currentUserValue
    console.log('PROFILE', this.profile);
  }

  back() {
    this.navCtrl.back()
  }

}
