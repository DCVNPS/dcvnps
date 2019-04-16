import { Component, OnInit, ContentChild, ElementRef, AfterContentInit, Input } from '@angular/core';
import { Slide } from '../shared/slide.model';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit, AfterContentInit {
  // tslint:disable-next-line:no-input-rename
  @Input('slide') data: Slide;
  // tslint:disable-next-line:no-inferrable-types
  @Input() isPortrait = false;
  public isActive = false;
  // @ContentChild('carouselImg') imgElement: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
  }
}
