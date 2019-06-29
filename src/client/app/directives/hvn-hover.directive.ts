import { Directive, Input, ElementRef, Renderer, HostListener } from '@angular/core';

@Directive({
  selector: '[appHvnHover]'
})
export class HvnHoverDirective{
  private isHovering: boolean;
 @Input('appHvnHover') config: Object = {
  querySelector: '.dimmer'
}
  constructor(private el: ElementRef, private renderer: Renderer) { }

  @HostListener('mouseover') onMouseOver() {
    let part = this.el.nativeElement.querySelector(this.config['querySelector']);
    // this.renderer.setElementStyle(part, 'display', 'block');
    this.renderer.setElementClass(part, 'active', true);
    this.isHovering = true;
  }

  @HostListener('mouseout') onMouseOut() {
    let part = this.el.nativeElement.querySelector(this.config['querySelector']);
    // this.renderer.setElementStyle(part, 'display', 'none');
    this.renderer.setElementClass(part, 'active', false);
    this.isHovering = false;
  }

}
