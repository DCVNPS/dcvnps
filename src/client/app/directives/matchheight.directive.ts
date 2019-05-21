import { Directive, Input, HostListener, AfterViewChecked, ElementRef } from '@angular/core';

@Directive({
  selector: '[matchHeight]'
})
export class MatchHeightDirective implements AfterViewChecked {

  @Input() className:string;
  constructor(private el: ElementRef) { }
  @HostListener('window:resize',['$event']) onResize(event?){
    this.matchHeight(this.el.nativeElement, this.className);
  }

  ngAfterViewChecked(){
    this.matchHeight(this.el.nativeElement, this.className);
  }

  matchHeight(parent: HTMLElement, className: string){
    if(!parent){
      return;
    }
    const children = parent.getElementsByClassName(className);
    if(!children){
      return;
    }
    Array.from(children).forEach((c:HTMLElement)=> c.style.height = 'initial');
    const elementHeights = Array.from(children).map(x=>x.getBoundingClientRect().height);
    const maxHeight = elementHeights.reduce((prev,cur) =>{
      return prev > cur ? prev: cur;
    });
    Array.from(children).forEach((c:HTMLElement)=> c.style.height = `${maxHeight}px;`);
  }
}
