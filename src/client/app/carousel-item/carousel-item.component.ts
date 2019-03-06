import { Component, OnInit, ContentChild, ElementRef, AfterContentInit } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit, AfterContentInit {
  public isActive = false;
  // @ContentChild('carouselImg') imgElement: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    // const carouselImage: HTMLImageElement = this.imgElement.nativeElement;
    // console.log(`CarouselItem - AfterContentInit ${carouselImage} `);
    // console.log(carouselImage);
  }
}
