import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { AppConstant } from '../utility/app-constant';

@Directive({
  selector: '[imageLoad]'
})
export class ImageLoadDirective {
imageSrc = {AUDIO : ''}
  @Input('imageLoad') public imgType: string;
  constructor(private renderer: Renderer2,
    private el: ElementRef) {
    this.el.nativeElement.classList.add('loading');
  }

  @HostListener('load') onLoad() {
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.el.nativeElement.src);
    this.el.nativeElement.classList.remove('loading');
  }

  @HostListener('error') onError() {
    if (this.imgType == 'group') {
      this.renderer.setAttribute(this.el.nativeElement, 'src', AppConstant.DEFAULT_GROUP_IMAGE);
    } else {
      this.renderer.setAttribute(this.el.nativeElement, 'src', AppConstant.DEFAULT_PROFILE_IMAGE);
    }
    this.el.nativeElement.classList.remove('loading');
  }
}
