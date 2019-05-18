import { Directive, Input, HostBinding, ElementRef, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[elementDimensions]'
})
export class ElementDimensionsDirective {
  @Input('elementDimensions') config: Object = {
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
    // const newHeight = configHeight;
    // let newWidth = Math.round(natWidth * configHeight / natHeight);
    // if (newWidth !== configWidth) {
    //   newWidth = configWidth;
    // }
    // if (natWidth < natHeight) {
    //   newWidth = Math.round(newHeight * natWidth / natHeight);
    // }
    console.log({ naturalWidth: natWidth, naturalHeight: natHeight });
    console.log({ configWidth: configWidth, configHeight: configHeight });
    console.log({clientWidth: this.el.nativeElement.clientWidth, clientHeight: this.el.nativeElement.clientHeight});
    // console.log({ elementWidth: newWidth, elementHeight: newHeight });
    // this.elementWidth = this.config['width'];
    // this.elementHeight = this.config['height'];
  }
}
