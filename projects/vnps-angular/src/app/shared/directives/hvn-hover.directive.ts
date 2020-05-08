import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[hvnHover]'
})
export class HvnHoverDirective {
  private isHovering: boolean;
 @Input('hvnHover') config = {
  querySelector: '.dimmer'
};
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseover') onMouseOver() {
    const part = this.el.nativeElement.querySelector(this.config.querySelector);
    // this.renderer.setElementStyle(part, 'display', 'block');
    // this.renderer.setElementClass(part, 'active', true);
    // migrate to Renderer2
    this.renderer.addClass(part, 'active');
    this.isHovering = true;
  }

  @HostListener('mouseout') onMouseOut() {
    const part = this.el.nativeElement.querySelector(this.config.querySelector);
    // this.renderer.setElementStyle(part, 'display', 'none');
    // this.renderer.setElementClass(part, 'active', false);
    // migrate to render2
    this.renderer.removeClass(part, 'active');
    this.isHovering = false;
  }

}
