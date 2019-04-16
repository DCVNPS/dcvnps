import { Component, OnInit, AfterContentInit, Input, ContentChildren, QueryList } from '@angular/core';
import { CarouselItemComponent } from '../carousel-item/carousel-item.component';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterContentInit {
  @ContentChildren(CarouselItemComponent) carouselItems: QueryList<CarouselItemComponent>;
  @Input() delay = 500;
  private intervalID: number = undefined;
  public isRunning = true;
  private isPrev = false;
  private childItems: CarouselItemComponent[];
  private curIdx: number;
  private count: number;
  private max: number;
  constructor() { }

  ngAfterContentInit() {
    this.childItems = this.carouselItems.toArray();
    console.log(`Carousel - AfterContentInit delay miliseconds: ${this.delay}
    ChildItems Count : ${this.childItems.length} --  Is Running: ${this.isRunning}`);
    this.count = 0;
    this.max = this.childItems.length;
    this.StartSlide();
  }
  StartSlide() {
    this.isRunning = true;
    if (this.max > 0) {
    // this trick is to load the carousel fast at startup (1 milisecond)
    // then change to call RunSlide() with delay interval.
    // Should make the delay interval in the environment file.
    this.intervalID = setInterval(() => {
        this.curIdx = this.count % this.max;
        this.childItems.forEach((item) => item.isActive = false);
        this.childItems[this.curIdx].isActive = true;
        this.count += 1;
        if (this.count >= this.max) {
          this.count = 0;
        }
        clearInterval(this.intervalID);
        this.RunSlide();
      }, 1);
    }
    // console.log(`Start slide  --  Is Running: ${this.isRunning}`);
  }
  RunSlide() {
    if (this.max > 0) {
      this.intervalID = setInterval(() => {
        this.curIdx = this.count % this.max;
        this.childItems.forEach((item) => item.isActive = false);
        this.childItems[this.curIdx].isActive = true;
        this.count += 1;
        if (this.count >= this.max) {
          this.count = 0;
        }
      }, this.delay);
    }
  }
  StopSlide() {
    this.isRunning = false;
    clearInterval(this.intervalID);
    // console.log(`Stop slide  --  Is Running: ${this.isRunning}`);
  }
  NextSlide() {
    clearInterval(this.intervalID);
    console.log(`NextSlide - Before Adjusting Current Index: ${this.curIdx}
        Current Count: ${this.count}`);
    // If carousel is running mean interval is set. Clear interval
    if (this.isRunning) {
      this.isRunning = false;
    }
    if (this.max > 0) {
      if (this.isPrev) {
        this.count += 1;
        this.isPrev = false;
      }
      if (this.count > this.max - 1) {
        this.count = 0;
      }
      this.curIdx = this.count % this.max;
      console.log(`NextSlide - After Adjusting Current Index: ${this.curIdx}
        Current Count: ${this.count}`);
      this.childItems.forEach((item) => item.isActive = false);
      this.childItems[this.curIdx].isActive = true;
      this.count += 1;
    }
  }
  PrevSlide() {
    clearInterval(this.intervalID);
    // If carousel is running mean interval is set. Clear interval
    console.log(`PrevSlide - Before Adjusting Current Index: ${this.curIdx}
    Current Count: ${this.count}`);
    if (this.isRunning) {
      this.isRunning = false;
    }
    if (this.max > 0) {
      if (!this.isPrev) {
        this.count -= 1;
        this.isPrev = true;
      }
      this.count -= 1;
      if (this.count < 0) {
        this.count = this.max - 1;
      }
      this.curIdx = this.count % this.max;
      console.log(`PrevSlide - After Adjusting Current Index: ${this.curIdx}
      Current Count: ${this.count}`);
      this.childItems.forEach((item) => item.isActive = false);
      this.childItems[this.curIdx].isActive = true;
    }
  }
}
