import { CardImageSizeDirective } from './card-image-size.directive';
import { ElementRef } from '@angular/core';

describe('CardImageSizeDirective', () => {
  it('should create an instance', () => {
    const el: ElementRef<any> = this.nativeElement;
    const directive = new CardImageSizeDirective(el);
    expect(directive).toBeTruthy();
  });
});
