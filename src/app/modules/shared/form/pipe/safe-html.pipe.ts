import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) { }
    
      transform(v: any): any {
        return this._sanitizer.bypassSecurityTrustHtml(v);
      }

}
