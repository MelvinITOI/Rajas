import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FileOpener } from '@ionic-native/file-opener';
import { FILETYPE, audioExtension, videoExtension,imgExtensions } from 'src/app/modules/image-helper/interface/file';
import { isWeb } from '../utility/utility-helper';
@Injectable({
  providedIn: 'root'
})
export class FilesystemService {

  // directory = 'followWork';
  // constructor() { }

  // requestPermision() {
  //   return new Promise<any>((resolve, reject) => {
  //     Filesystem.requestPermissions().then(res => {
  //       return
  //     })
  //   });
  // }

  // findFileType(url): FILETYPE {
  //   let ext = url.split(".").pop();
  //   if (imgExtensions.includes(ext.toLowerCase())) {
  //     return 'IMAGE';
  //   } else if (audioExtension.includes(ext.toLowerCase())) {
  //     return 'AUDIO';
  //   } else if (videoExtension.includes(ext.toLowerCase())) {
  //     return 'VIDEO';
  //   }
  //   return 'DOCUMENT';
  // }

  // async writeFile(type: 'TASK' | 'PROFILE' | 'EXPORT', fileName, data, mapId: string = ''): Promise<any> {
  //   let path: any = type.toLowerCase();
  //   const fileType = this.findFileType(fileName);
  //   if (mapId) {
  //     path += '/' + mapId + '/';
  //   }
  //   const dat = new Date();
  //   const datP = dat.getFullYear() + '' + dat.getMonth() + '' + dat.getDate() + '' + dat.getHours() + '' + dat.getMinutes() + '' + dat.getSeconds() + '.' + fileName.split('.').pop();
  //   switch (fileType) {
  //     case 'IMAGE':
  //       path += '/IMAGE/'
  //       fileName = 'IMG_' + datP;
  //       break;
  //     case 'AUDIO':
  //       path += '/AUDIO/'
  //       fileName = 'AUD_' + datP;
  //       break;
  //     case 'VIDEO':
  //       path += '/VIDEO/'
  //       fileName = 'VID_' + datP;
  //       break;
  //     case 'DOCUMENT':
  //       fileName = 'DOC_' + datP;
  //       break;
  //   }
  //   const DIRECTORY = type == 'EXPORT' ? 'Download' : this.directory + '/media/' + path;

  //   // Filesystem.readdir({
  //   //   path: DIRECTORY,
  //   //   directory: Directory.Documents,
  //   // }).then(result => {

  //   // }).catch(async err => {

  //   // });
  //   if (type != 'EXPORT') {
  //     const mk = await Filesystem.mkdir({
  //       path: DIRECTORY,
  //       directory: Directory.Documents,
  //       recursive: true
  //     }).catch(err => {
  //       console.log(err, 'file error')
  //     });
  //   }

  //   // to write the storage
  //   const pathFile = DIRECTORY + '/' + fileName;
  //   return new Promise<any>((resolve, reject) => {
  //     Filesystem.writeFile({
  //       path: pathFile,
  //       directory: type == 'EXPORT' ? Directory.ExternalStorage : Directory.Documents,
  //       data: data,
  //       recursive: true
  //     }).then(res => {
  //       console.log('file log url write', res)
  //       if (res) {
  //         //let photoPath = Capacitor.convertFileSrc(res.uri);
  //         console.log(res.uri, 'final url');
  //         resolve(res.uri)
  //       } else {
  //         resolve(false);
  //       }
  //     }).catch(e => {
  //       reject(e);
  //     })
  //   });
  // }

  // async readFile(path: string) {
  //   return await Filesystem.readFile({
  //     path: path,
  //     directory: Directory.Documents,
  //   });
  // }

  // convertFileSrc(path: string) {
  //   return Capacitor.convertFileSrc(path);
  // }

  // openFile(url) {
  //   let ext = url.split(".").pop();
  //   console.log('file opener ',url)
  //   if (!isWeb()) {
  //     let mine = MINETYPE[ext];
  //     if (mine) {
  //       const opener = new FileOpener();
  //       opener.showOpenWithDialog(url, mine)
  //         .then(() => console.log('File is opened', mine))
  //         .catch(e => console.log('Error opening file', e));
  //     }
  //   } else {
  //     window.open(url, "_blank");
  //   }
  // }
}
