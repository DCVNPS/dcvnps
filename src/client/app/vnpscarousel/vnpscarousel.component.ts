import { Component, OnInit, Input } from '@angular/core';
import { Slide } from '../shared/slide.model';

@Component({
  selector: 'vnps-carousel',
  templateUrl: './vnpscarousel.component.html',
  styleUrls: ['./vnpscarousel.component.scss']
})
export class VnpscarouselComponent implements OnInit {

  @Input() data: Array<Slide>;
  @Input() delay = 500;
  @Input() carouselSize: Object;
  public isRunning = true;
  public cWidth: number = 600;
  public cHeight: number = 400;
  private intervalID: any;
  private isPrev = false;
  private curIdx: number;
  private count: number;
  private max: number;

  constructor() {
  }

  ngOnInit() {
    if (this.data.length) {
      console.log('Start runing slide show');
      this.count = 0;
      this.max = this.data.length;
      this.StartSlide();
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
