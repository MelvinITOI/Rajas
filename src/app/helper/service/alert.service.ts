import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { confirmBox } from 'src/app/modules/shared/helper/dataModal/shared-interface';
import { isEmptyObj } from '../utility/utility-helper';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  loaderInstance: any = {}
  constructor(private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController) { }
  async presentLoading() {
    this.loaderInstance = await this.loadingController.create({
      cssClass: "my-custom-class",
      //message: 'Please wait...',
      //duration: 2000
    });
    await this.loaderInstance.present();
    return this.loaderInstance;
  }

  
  confirmBox(b: confirmBox): Promise<any> {
    const buttons = [
      {
        text: b.button1 || 'ok',
        role: 'ok'
      }
    ];
    if (b.type == 'confirm') {
      buttons.push({
        text: b.button2 || 'Delete',
        role: 'confirm'
      });
    }
    return new Promise((resolve, reject) => {
      this.alertController.create({
        header: b.header,
        message: b.message,
        buttons: buttons,
        inputs: b.inputs || [],
        backdropDismiss: b.backdropDismiss ? true : false
      }).then(res => {
        res.present();
        res.onDidDismiss().then(res => {
          resolve(res);
        });
      });
    });
  }


  async dismissLoader(inst: any = {}) {
    if (!isEmptyObj(inst)) {
      await inst.dismiss();
    } else {
      await this.loaderInstance?.dismiss();
    }
  }
  async alert(msg: string, btns?: any) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      //header: 'Alert',
      //subHeader: 'Subtitle',
      message: msg,
      buttons: btns && btns[0] ? btns : ["OK"],
    });
    await alert.present();
  }

  async showToast(message: string, type: 'success' | 'warning' | 'failed' | 'info' = 'info') {
    let classApp = 'myToast';
    switch (type) {
      case 'success':
        classApp += ' infoToast'
        break;
      case 'warning':
        classApp += ' infoToast'
        break;
      case 'failed':
        classApp += ' errorToast'
        break;
      default:
        classApp += ' infoToast'
        break;
    }
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      keyboardClose: false,
      cssClass: classApp,
    });
    toast.present();
  }

  async showLoader(msg = 'Please wait...') {
    if (!isEmptyObj(this.loaderInstance)) {
      this.loaderInstance?.dismiss();
    }
    this.loaderInstance = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: msg,
      //duration: 2000
    });
    await this.loaderInstance.present();
    return this.loaderInstance;
  }
}