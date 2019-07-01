import { Directive, Input, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSlideImageSize]'
})
export class SlideImageSizeDirective {

  /* 
    @Input config object is contains columnSpan which is the width of the image in term of
    SemanticsUI of grid columns(16 columns in the grid)
  */
  @Input() private config: object = {};

  private naturalWidth: number;
  private naturalHeight: number;
  private clientWidth: number;
  private clientHeight: number;
  private columnSpan = 8;
  @HostBinding('style.width') private elementWidth: string;
  @HostBinding('style.height') private elementHeight: string;
  @HostBinding('style.margin-left') private leftMargin: string;
  @HostBinding('style.margin-right') private rightMargin: string;
  constructor(private el: ElementRef) {
    this.columnSpan = this.config['columnSpan'] || 8;
  }

  @HostListener('load') elementLoad() {
    this.clientWidth = Math.round(this.columnSpan * 0.94*window.innerWidth / 16);
    this.clientHeight = Math.round(this.clientWidth * 2 / 3);
    this.naturalWidth = this.el.nativeElement.naturalWidth;
    this.naturalHeight = this.el.nativeElement.naturalHeight;
    // console.log({ naturalWidth: this.naturalWidth, naturalHeight: this.naturalHeight });
    // console.log({ clientWidth: this.clientWidth, clientHeight: this.clientHeight });
    this.adjustPortratiSize();
  }

  @HostListener('window:resize', ['$event']) onResize() {
    this.clientWidth = Math.round(this.columnSpan * window.innerWidth / 16);
    this.clientHeight = Math.round(this.clientWidth * 2 / 3);
    this.naturalWidth = this.el.nativeElement.naturalWidth;
    this.naturalHeight = this.el.nativeElement.naturalHeight;
    // console.log({ naturalWidth: this.naturalWidth, naturalHeight: this.naturalHeight });
    this.adjustPortratiSize();
  }

  adjustPortratiSize() {
    if ( this.naturalWidth < this.naturalHeight) {
      const newHeight = this.clientHeight;
      const newWidth = Math.round(newHeight * this.naturalWidth / this.naturalHeight);
      this.clientWidth = newWidth;
      this.clientHeight = newHeight;
      this.leftMargin = 'auto';
      this.rightMargin = 'auto';
      // console.log({ naturalWidth: this.naturalWidth, naturalHeight: this.naturalHeight });
      // console.log({ 'Client Widht': this.clientWidth , 'Client Heigh': this.clientHeight });
    }
    this.elementWidth = `${this.clientWidth}px`;
    this.elementHeight = `${this.clientHeight}px`;
  }
}
