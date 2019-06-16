import { Directive, Input, HostBinding, ElementRef, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[elementDimensions]'
})
export class ElementDimensionsDirective {
// tslint:disable-next-line: no-input-rename
  @Input('dimensions') config: Object = {
    'width': 300,
    'height': 200
  };

  @HostBinding('width') private elementWidth: number;
  @HostBinding('height') private elementHeight: Number;
  constructor(private el: ElementRef) {
  }

  @HostListener('load') elementLoad() {
    const natWidth = this.el.nativeElement.naturalWidth;
    const natHeight = this.el.nativeElement.naturalHeight;
    const configWidth = this.config['width'];
    const configHeight = this.config['height'];
    console.log({ naturalWidth: natWidth, naturalHeight: natHeight });
    // console.log({ configWidth: configWidth, configHeight: configHeight });
    console.log({clientWidth: this.el.nativeElement.clientWidth, clientHeight: this.el.nativeElement.clientHeight});
    // console.log({ elementWidth: newWidth, elementHeight: newHeight });
    // this.elementWidth = this.config['width'];
    // this.elementHeight = this.config['height'];
  }
}
