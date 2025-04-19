import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appHighlightInvalid]'
})
export class HighlightInvalidDirective {

  constructor(private el: ElementRef, private renderer: Renderer2, private control: NgControl) { }

  @HostListener('input')
  onInput() {
    if (this.control && this.control.invalid && this.control.touched) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid red');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'border');
    }
  }

}
