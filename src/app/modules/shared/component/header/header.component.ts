import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Params, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
export interface headerInfo {
  title: string,
  backBtn?: boolean
}
interface backBtn {
  name?: string,
  icon?: string,
  url?: string,
  queryParms?: Params
}
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() pageTitle: string = '';
  @Input() backBtn: backBtn = {} as backBtn;
  @Input() showBackBtn: boolean = false;
  @Input() onBackEvent: boolean = false;
  @Output() onBack: EventEmitter<any> = new EventEmitter();
  constructor(private navCtrl: NavController, private route: Router) { }
  ngOnInit() { }
  goToBack() {
    this.onBack.emit(true)
    if (this.onBackEvent) {
      return;
    }
    if (this.backBtn.url) {
      //@ts-ignore
      this.route.navigateByUrl(this.backBtn.url, { queryParams: this.backBtn?.queryParms || {} });
    } else {
      this.navCtrl.back();
    }
  }
}