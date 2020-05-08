import { Directive, Input, HostBinding, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[vnpsCardImageSize]'
})
export class CardImageSizeDirective {

  @Input() private noCards = 4;

  private twoCardsRatio = 625 / 938;
  private fourCardsRatio = 307 / 460;
  private sixCardsRatio = 200 / 300;
  private eightCardsRatio = 152 / 229;

  private naturalWidth: number;
  private naturalHeight: number;
  private clientWidth: number;
  private clientHeight: number;
  @HostBinding('style.width') private elementWidth: string;
  @HostBinding('style.height') private elementHeight: string;
  @HostBinding('style.margin-left') private leftMargin: string;
  @HostBinding('style.margin-right') private rightMargin: string;
  constructor(private el: ElementRef) {
    if (!this.noCards) {
      this.noCards = 6;
    }
  }

  @HostListener('load') elementLoad() {
    this.naturalWidth = this.el.nativeElement.naturalWidth;
    this.naturalHeight = this.el.nativeElement.naturalHeight;
    this.clientWidth = this.el.nativeElement.clientWidth;
    this.clientHeight = this.el.nativeElement.clientHeight;
    // console.log({ naturalWidth: this.naturalWidth, naturalHeight: this.naturalHeight });
    // console.log({ clientWidth: this.clientWidth, clientHeight: this.clientHeight });
    this.adjustPortratiSize();
  }

  adjustPortratiSize() {
    const isPortrait = this.naturalWidth < this.naturalHeight;
    let HWRatio = 1;
    switch (this.noCards) {
      case 2:
        HWRatio = this.twoCardsRatio;
        break;
      case 4:
        HWRatio = this.fourCardsRatio;
        break;
      case 6:
        HWRatio = this.sixCardsRatio;
        break;
      case 8:
        HWRatio = this.eightCardsRatio;
        break;
      default:
        HWRatio = this.sixCardsRatio;
        break;
    }
    if (isPortrait) {
      const newHeight = Math.round(HWRatio * this.clientWidth);
      const newWidth = Math.round(newHeight * this.clientWidth / this.clientHeight);
      // console.log({ newWidth , newHeight });
      this.elementWidth = `${newWidth}px`;
      this.elementHeight = `${newHeight}px`;
      this.leftMargin = 'auto';
      this.rightMargin = 'auto';
    }
  }

}
