import { Injectable } from '@angular/core';
import { FileOpener } from '@capacitor-community/file-opener';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { ActionSheetController, Platform } from '@ionic/angular';
import { photoConfig } from 'src/app/modules/image-helper/interface/file';
import { getMineType } from '../utility/utility-helper';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  IMAGE_DIR: any = 'GEMS';
  constructor(public actionSheetCtrl: ActionSheetController, private plt: Platform) { }
  async openActionSheet() {
    let buttons = [{
      text: 'Gallery',
      role: 'Photos',
      icon: 'aperture-outline',
      handler: () => { }
    }, 
    {
      text: 'Camera',
      role: 'Camera',
      icon: 'camera-outline',
      handler: () => { }
    }
  ];

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose',
      cssClass: 'my-custom-class',
      buttons: buttons
    });
    await actionSheet.present();
    const { role } = await actionSheet.onDidDismiss();
    return role;
  }

  public async addNewToGallery(config: photoConfig) {
    //Take a photo
    const role = await this.openActionSheet();
    if (role == 'Photos' || role == 'Camera') {
      // check permission
      // const status =await Camera.checkPermissions();
      // if(status[role] !='granted'){
      //   // ask permission
      //   const permission = await Camera.requestPermissions({permissions :['camera','photos']});
      //   if(permission[role] != 'granted'){
      //     return;
      //   }
      // }
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource[role],
        quality: 50,
        allowEditing: config?.allowEditing || false,
      });
      return capturedPhoto.dataUrl
    } else {
      return '';
    }
  }

  read(file: { type: any; }): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader:any = new FileReader();
      reader.onload = () => {
        const blob = new Blob([reader.result], {
          type: file.type
        });
        resolve(blob)
      };
      reader.onerror = () => {
        reject(false)
      }
      reader.readAsArrayBuffer(file);
    });
  }

  async saveFile(file: any, fileName: string) {
    let base64Data = file;
    if (!(file instanceof Blob)) {
      base64Data = await this.convertBlobToBase64(file);
    }
    const savedFile = await Filesystem.writeFile({
      path: `${this.IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Documents
    });
    return { url: savedFile.uri, mineType: getMineType(fileName), fileName: fileName, extension: fileName.split('.').pop()?.toLocaleLowerCase() };
  }

  openFile(uri: string) {
    FileOpener.open({ filePath: uri }).then(res => {
      console.log('file opened');
    })
  }

  async getFileUri(fileName: string) {
    const file_uri = await Filesystem.getUri({
      directory: Directory.Documents,
      path: `${this.IMAGE_DIR}/${fileName}`,
    });
    console.log('file uri' , file_uri)
    return file_uri
    // let contents = await Filesystem.readFile({
    //   path: `${this.IMAGE_DIR}/${fileName}`,
    //   directory: Directory.Documents,
    // });
    // return contents;
  }

  private async readAsBase64(photo: Photo | any) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}