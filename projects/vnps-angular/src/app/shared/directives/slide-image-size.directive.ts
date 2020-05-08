import { Directive, OnInit, Input, HostBinding, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[vnpsSlideImageSize]'
})
export class SlideImageSizeDirective implements OnInit {

  /*
    @Input config object is contains columnSpan which is the width of the image in term of
    SemanticsUI of grid columns(16 columns in the grid)
  */
  @Input() private columnSpan = 8;

  private naturalWidth: number;
  private naturalHeight: number;
  private clientWidth: number;
  private clientHeight: number;

  @HostBinding('style.width') private elementWidth: string;
  @HostBinding('style.height') private elementHeight: string;
  @HostBinding('style.margin-left') private leftMargin: string;
  @HostBinding('style.margin-right') private rightMargin: string;

  constructor(private el: ElementRef) {
  }
  ngOnInit() { }
  @HostListener('load') elementLoad() {
    this.clientWidth = Math.round(this.columnSpan * window.innerWidth / 16);
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
    if (this.naturalWidth < this.naturalHeight) {
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
