import { Component, OnInit, AfterContentInit, ContentChildren, QueryList, Input } from '@angular/core';
import { SlideComponent } from '../slide/slide.component';
import { Slide } from '../shared/slide.model';

export enum Direction {
  UNKOWN,
  NEXT,
  PREV
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterContentInit {
  @ContentChildren(SlideComponent) carouselSlideList: QueryList<SlideComponent>;

  private currentInterval: number;
  private isPlaying: boolean;
  private destroyed: boolean;
  private currentSlide: Slide;
  private intervalId: any;
  private carouselSlides: SlideComponent[];
  private startStopBtnLabel: string;
  @Input() public noWrap: boolean;
  @Input() public noPause: boolean;
  @Input() public noTransition: boolean;

  @Input() delay = 500;
  @Input() public slides: Slide[];

  constructor() {
    this.isPlaying = false;
    this.destroyed = false;
    this.startStopBtnLabel = this.isPlaying ? 'Stop Slide Show' : 'Start Slide Show';
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    // this.carouselSlides = this.carouselSlideList.toArray();
    this.startStopSlideShow();
  }

  startSlideShow = function () {
    if (this.slides) {
      let count = 0;
      const max = this.slides.length;
      this.intervalId = setInterval(() => {
        const i = count % max;
        this.slides.forEach(slide => slide.hidden = true);
        this.slides[i].hidden = false;
        this.currentSlide = this.slides[i];
        count += 1;
        // if (!this.currentSlide.hidden) {
        //   console.log(this.currentSlide);
        // }
      }, this.delay);
    }
  }

  stopSlideShow = function () {
    clearInterval(this.intervalId);
  }

  startStopSlideShow = function () {
    this.isPlaying = !this.isPlaying;
    this.startStopBtnLabel = this.isPlaying ? 'Stop Slide Show' : 'Start Slide Show';
    if (this.isPlaying) {
      this.startSlideShow();
    } else {
      this.stopSlideShow();
    }
  }
}
