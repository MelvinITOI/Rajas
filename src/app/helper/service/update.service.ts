import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { getPlatform, Injectable } from '@angular/core';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { confirmBox } from 'src/app/modules/shared/helper/dataModal/shared-interface';
import { environment } from 'src/environments/environment';
import { ResponseData } from '../dataModal/response';
import { User } from '../dataModal/user';
import { RESPONSE_CODE } from '../utility/app-constant';
import { isMobileNative } from '../utility/utility-helper';
import { AlertService } from './alert.service';
import { UserApiService } from './Api/user-api.service';
import { AuthService } from './auth.service';
import { PhotoService } from './photo.service';
import { UtiltiyService } from './utiltiy.service';

export type updateVersion = {
  [key in platform]?: updateRequirement // Note that "key in".
}
export type apiAppVersion = {
  blockList: [] // Note that "key in".
  appVersion: updateVersion
}
export enum platform {
  IOS = 'ios',
  ANDROID = 'android'
}
export interface updateRequirement {
  latest: number,
  maintananceMode: boolean,
  forceToUpdateMode: boolean,
  majorInfo: updateInfo,
  maintanceInfo: updateInfo,
  minorInfo: updateInfo,
  url: string
}
interface updateInfo {
  btn?: string,
  msg: string,
  title: string,
}
@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  minorVersion: any = {
    show: false,
    title: '',
    msg: ''
  }
  blockedList: Array<any> = []
  constructor(private http: HttpClient, private loadingCtrl: AlertService, private auth: AuthService,
    private fileServe: PhotoService, private utilityServe: UtiltiyService) { }

  versionApi() {
    return this.http.get(`/getAppVersion`).toPromise();
  }
  downloadApp(type, version, cat) {
    const request = new HttpRequest('GET', `app/downloadApp/${type}/${version}/${cat}`, {
      reportProgress: true,
      responseType: 'blob',
      observe: 'events',
    });
    return this.http.request(request);
  }

  checkVersion() {
    if (!environment.production) {
      this.versionApi().then(async (r: ResponseData) => {
        if (r.statusCode == RESPONSE_CODE.SUCCESS) {
          const res: apiAppVersion = r.result;
          const appVersion = res.appVersion || {}
          this.blockedList = r.result.blockList || [];
          const platform: any = Capacitor.getPlatform() == 'web' ? 'android' : 'android';
          if (this.isBlock()) {
            const alert: any = {
              header: 'Access Denied',
              message: 'User Prohibited to use',
              button1: 'close',
              backdropDismiss: false
            }
            this.openModal(alert, false);
            this.auth?.logout();
            return;
          }
          console.log(platform, 'update')
          if (appVersion[platform]) {
            const data: updateRequirement = appVersion[platform];
            const ver = String(data.latest);
            const sV = ver.substring(ver.length - 4);
            const minor: number = +sV.substring(0, 2)
            const mV: number = +ver.slice(0, (ver.length - 4));
            if (data.maintananceMode) {
              const alert: any = {
                header: data.maintanceInfo.title || 'Maintenance',
                message: data.maintanceInfo.msg || 'App is under maintenance mode, try again later',
                button1: data.maintanceInfo.btn || 'close',
                backdropDismiss: false
              }
              this.openModal(alert, false);
            } else if ((mV > environment.majorV) || (data.forceToUpdateMode == true)) {
              const alert: any = {
                header: data.majorInfo.title || 'Update',
                message: data.majorInfo.msg || 'New Updates Available, please update and comeback',
                button1: data.majorInfo.btn || 'Download',
                backdropDismiss: false
              }
              this.openModal(alert, true, data.url);
            } else if (minor > environment.minorV) {
              this.minorVersion.show = true;
              this.minorVersion.msg = data.minorInfo.msg;
              this.minorVersion.title = data.minorInfo.title;
              const alert: any = {
                header: data.majorInfo.title || 'Update',
                message: data.majorInfo.msg || 'New Updates Available, please update and comeback',
                button1: data.majorInfo.btn || 'Download',
                backdropDismiss: false
              }
              this.openModal(alert, true, ver);
            }
          }
        }
      })
    }
  }

  isBlock() {
    const user: User = this.auth.currentUserValue
    if (user?.mobile_no) {
      const result = this.blockedList.filter((a: number) => {
        let num: any = a
        if (typeof a != 'string') {
          num = a.toString();
        }
        return num.includes(user.mobile_no)
      }) || []
      return result.length > 0 ? true : false;
    } else {
      return false
    }
  }


  openModal(alert: confirmBox, open = true, ver = '') {
    alert.backdropDismiss = false;
    //alert.type = 'inputs';
    this.loadingCtrl.confirmBox(alert).then(res => {
      if (res.role == 'ok') {
        //silent update
        if (open) {
          this.openPlayStore(ver);
        }
        if (isMobileNative()) {
          App.exitApp();
        }
      }
    })
  }

  openPlayStore(version) {
    this.minorVersion = false;
    this.download(version, true)
    // window.open(url, "_system");
  }

  progress = 0;
  download(version,cat, doOpen: boolean = false) {
    this.progress = 1;
    const type: any = Capacitor.getPlatform() == 'android' ? 1 : 2;
    this.downloadApp(type,version,1).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.DownloadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          if (event.body) {
            this.progress = 0;
            const name = `${version}.${+type== 1 ? 'apk':'ipa'}`;
            this.fileServe.saveFile(event.body, name).then((res: any) => {
              if (doOpen && res.uri) {
                this.fileServe.openFile(res.uri)
              }
              this.loadingCtrl.showToast('File Saved', 'info');
            });
          }
        }
      },
      err => {
        this.progress = 0;
        this.loadingCtrl.showToast('unable to download the file', 'info')
      });
  }
}
