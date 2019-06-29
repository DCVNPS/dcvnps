import { HvnHoverDirective } from './hvn-hover.directive';
import { ElementRef, Renderer } from '@angular/core';

describe('HvnHoverDirective', () => {
  it('should create an instance', () => {
    const el: ElementRef = null;
    const renderer: Renderer = null;
    const directive = new HvnHoverDirective( el, renderer);
    expect(directive).toBeTruthy();
  });
});
