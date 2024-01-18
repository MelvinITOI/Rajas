import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ImageUploadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    // SharedModule
  ], exports: [ImageUploadComponent]
})
export class ImageHelperModule { }
