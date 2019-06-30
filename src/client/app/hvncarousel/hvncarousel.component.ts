import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { Slide } from '../shared/slide.model';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'hvn-carousel',
  templateUrl: './hvncarousel.component.html',
  styleUrls: ['./hvncarousel.component.scss']
})
export class HvncarouselComponent implements OnInit {

  @Input() data: Array<Slide>;
  // @Input() delay = 500;
  @Input() config: any = { 'delay': 3000, 'showIndicator': true, 'runSlideShow': true};

  private delay: number;
  public isRunning = true;
  public cWidth = 600;
  public cHeight = 400;
  private intervalID: any;
  private isPrev = false;
  private curIdx: number;
  private count: number;
  private max: number;
  private runSlideShow: boolean;

  constructor() {
  }

  ngOnInit() {
    this.delay = this.config['delay'] || 3000;
    this.runSlideShow = this.config['runSlideShow'] || false;
    this.max = this.data.length;
    if (this.runSlideShow) {
      // console.log('Start runing slide show');
      this.count = 0;
      this.StartSlide();
    } else {
      // If not run slide show, set current index to the current active imsage's index
      const curImg = this.data.find( img => img.hidden === false);
      this.curIdx = this.data.indexOf(curImg);
      this.count = this.curIdx + 1;
      // console.log(this.curIdx);
    }
  }
  StartSlide() {
    if (this.max > 0) {
      // this trick is to load the carousel fast at startup (1 milisecond)
      // then change to call RunSlide() with delay interval.
      // Should make the delay interval in the environment file.
      this.intervalID = setInterval(() => {
        this.curIdx = this.count % this.max;
        this.data.forEach((item) => item.hidden = true);
        this.data[this.curIdx].hidden = false;
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
        this.data.forEach((item) => item.hidden = true);
        this.data[this.curIdx].hidden = false;
        this.count += 1;
        if (this.count >= this.max) {
          this.count = 0;
        }
      }, this.delay);
    }
  }
  toggleSlideshow() {
    this.isRunning = !this.isRunning;
    if (this.isRunning) {
      this.StartSlide();
    } else {
      this.StopSlide();
    }
  }
  StopSlide() {
    clearInterval(this.intervalID);
    // console.log(`Stop slide  --  Is Running: ${this.isRunning}`);
  }
  NextSlide() {
    clearInterval(this.intervalID);
    // console.log(`NextSlide - Before Adjusting Current Index: ${this.curIdx}\n Current Count: ${this.count}`);
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
      // console.log(`NextSlide - After Adjusting Current Index: ${this.curIdx}\n  Current Count: ${this.count}`);
      this.data.forEach((item) => item.hidden = true);
      this.data[this.curIdx].hidden = false;
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
      this.data.forEach((item) => item.hidden = true);
      this.data[this.curIdx].hidden = false;
    }
  }
}
