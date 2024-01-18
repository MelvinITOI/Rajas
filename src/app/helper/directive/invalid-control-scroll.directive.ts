import { Directive, ElementRef, HostListener, Input, Optional } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
declare const window:any;
@Directive({
  selector: '[appInvalidControlScroll]'
})
export class InvalidControlScrollDirective {
  @Input('appInvalidControlScroll') formDiv: any;
  // private get containerEl(): HTMLElement {
  //   return this.scrollContainerDir
  //     ? this.scrollContainerDir.containerEl
  //     : window;
  // }

  constructor(
    private el: ElementRef,
    private formGroupDir: FormGroupDirective
  ) {}

  @HostListener("click") onSubmit() {
    if (this.formGroupDir.control.invalid) {
      this.scrollToFirstInvalidControl();
    }
  }

  private scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
      ".ion-invalid"
    ) || this.formDiv.querySelector(
      ".ion-invalid"
    );
    window.scroll({
      top: this.getTopOffset(firstInvalidControl),
      left: 0,
      behavior: "smooth"
    });

    fromEvent(window, "scroll")
      .pipe(
        debounceTime(100),
        take(1)
      )
      .subscribe(() => firstInvalidControl.focus());
  }

  private getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 50;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
  }
}
