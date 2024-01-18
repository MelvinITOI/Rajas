import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PhotoService } from 'src/app/helper/service/photo.service';
import { UtiltiyService } from 'src/app/helper/service/utiltiy.service';
import { AppConstant } from 'src/app/helper/utility/app-constant';
import { fileCategoryMap, fileCompData, fileInfo, fileType } from '../interface/file';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  imageForm: FormGroup = new FormGroup({
    pimage: new FormControl('', [])
  })
  @Output() uploadedFileInfo: EventEmitter<fileInfo> = new EventEmitter();
  fileInfos: fileInfo = {
    filePath: '',
    fileName: '',
    progress: 0
  };
  fileStatusMessage: string = '';
  data: fileCompData = {
    label: '',
    filePath: '',
    fileType: 'IMAGE'
  }
  fileAccessType: fileCategoryMap<fileType> = {
    IMAGE: {
      pattern: /(jpg|jpeg|png|gif)$/i,
      accessType: ".png, .jpeg,.jpg",
      maxFileSize: AppConstant.MAX_IMAGE_UPLOAD_SIZE
    },
    FILE: {
      pattern: /(doc|docx|pdf|txt)$/i,
      accessType: ".doc, .docx,.pdf,.txt",
      maxFileSize: AppConstant.MAX_FILE_UPLOAD_SIZE
    },
    VIDEO: {
      pattern: /(doc|docx|pdf|txt)$/i,
      accessType: ".doc, .docx,.pdf,.mp4",
      maxFileSize: AppConstant.MAX_VIDEO_UPLOAD_SIZE
    }
  }
  @Input() public set inputFile(data: fileCompData) {
    if (data) {
      console.log('change file', data);
      this.data = data;
      if (data.filePath) {
        this.fileInfos.filePath = data.filePath;
      }
    }
    console.log(this.data)
  }
  @Input() disabled: boolean = false;
  constructor(private utilityService: UtiltiyService, private changeDetect: ChangeDetectorRef, private photoService: PhotoService) { }

  ngOnInit(): void { }
  //assign new value for modal
  setInput(data: any) {
    this.data = data;
    this.fileInfos.filePath = this.data.filePath;
  }

  handleFileInput(e: any) {
    const files = e.target?.files || [];
    if (!this.documentValidation(files[0])) {
      this.resetFileInput();
      return false;
    }
    this.uploadFiles(files[0]);
    this.fileStatusMessage = '';
    return;
  }
  selectImage() {
    this.photoService.addNewToGallery({ allowEditing: false }).then((dataUrl: any) => {
      if (dataUrl) {
        var mime = dataUrl.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
        let mineType = 'text/jpg';
        if (mime && mime.length) {
          mineType = mime[1]
        }
        //@ts-ignore
        this.utilityService.urlToFile(dataUrl, 'temp_file', mineType).then((res:any) => {
          console.log('asdasd', res)
          if (!this.documentValidation(res)) {
            this.resetFileInput();
            return false;
            
          }
          this.uploadFiles(res);
          this.fileStatusMessage = '';
        })
      }
    });
  }

  // For Download PDF

  // downloadAndOpenPdf(){
  //   let downloadUrl = this.fileInfos.filePath;
  //   let path = this.file.dataDirectory;
  //   const transfer = this.ft.create();

  //   transfer.download(downloadUrl, `${path}myfile.pdf`).then(entry => {
  //     let url = entry.toURL();
      
  //     // if (this.platform.is('ios')){   // For IOS
  //     //   this.document.viewDocument(url,'application/pdf', {});
  //     // } 
  //     // else {
  //       this.fileOpener.open(url, 'application/pdf')
  //     // }
  //   })
  // }

  resetFileInput() {
    this.fileInfos.filePath = '';
    this.fileInfos.fileName = '';
    this.imageForm.patchValue({ pimage: null });
  }

  documentValidation(files: File) {
    const fileText = this.data.fileType.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
    const fileType = files.type.split("/").pop() || files.name.split(".").pop();
    console.log('file type',fileType)
    if (files) {
      if (files.size > 1000000) {
        this.fileStatusMessage = fileText + " Size Exceed 1 MB";
        return false;
      } else if (!this.isValidDocument(fileType)) {
        this.fileStatusMessage = fileText + " Type Not Supported";
        return false;
      } else
        return true;
    } return false;
  }

  isValidDocument(image: any) {
    if (image.match(this.fileAccessType[this.data.fileType]?.pattern))
      return true;
    else
      return false;
  }

  uploadFiles(file: any) {
    this.fileInfos.progress = 1;
    this.utilityService.uploadFiles(file).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.fileInfos.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          if (event.body.statusCode == 200) {
            this.fileInfos.progress = 0;
            this.fileStatusMessage = '';
            this.fileInfos.fileName = event.body.result.file_name;
            this.fileInfos.filePath = event.body.result.file_path;
            this.uploadedFileInfo.emit(this.fileInfos);
            console.log(this.fileInfos);
            this.changeDetect.detectChanges();
          }
        }
      },
      err => {
        this.fileInfos.progress = 0;
        this.resetFileInput();
        this.fileStatusMessage = 'Could not upload the file:' + file.name;
      });
  }
}
