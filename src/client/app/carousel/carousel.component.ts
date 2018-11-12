import { Component, OnInit, AfterContentInit, ContentChildren, QueryList, Input } from '@angular/core';
import { SlideComponent } from '../slide/slide.component';
import { Slide } from '../shared/slide.model';
import { Direction, SlideEventArg } from '../shared/slide-event-arg';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterContentInit {
  // @ContentChildren(SlideComponent) carouselSlideList: QueryList<SlideComponent>;

  private currentInterval: number;
  private isPlaying: boolean;
  private intervalId: any;
  private slideDiection: Direction;
  @Input() public noWrap: boolean;
  @Input() public noPause: boolean;
  @Input() public noTransition: boolean;

  @Input() delay = 500;
  @Input() public slides: Slide[];

  constructor() {
    this.isPlaying = false;
    this.slideDiection = Direction.NEXT;
  }

  ngOnInit() {
    this.isPlaying = true;
    this.startSlideShow();
  }

  ngAfterContentInit() {
  }

  startSlideShow() {
    if (this.slides) {
      let count = 0;
      const max = this.slides.length;
      this.intervalId = setInterval(() => {
        const i = count % max;
        this.slides.forEach(slide => slide.hidden = true);
        this.slides[i].hidden = false;
        count += 1;
      }, this.delay);
    }
  }

  stopSlideShow() {
    this.isPlaying = false;
    clearInterval(this.intervalId);
  }

  onSlideClicked(eventArg: SlideEventArg) {
    this.isPlaying = eventArg.isPlaying;
    switch (eventArg.name) {
      case 'STARTSTOP':
        if (this.isPlaying) {
          this.startSlideShow();
        } else {
          this.stopSlideShow();
        }
        break;
      case 'PREV':
      case 'NEXT':
        this.stopSlideShow();
        this.slideDiection = eventArg.name;
        this.advanceSlide(eventArg);
        break;
    }
  }
  advanceSlide(eventArg: SlideEventArg) {
    // show photo when Next is clicked
    if (eventArg.name === Direction.NEXT) {
      const nextSlideIndex = eventArg.slideIndex + 1 < this.slides.length ? eventArg.slideIndex + 1 : 0;
      this.slides.forEach(slide => slide.hidden = true);
      this.slides[nextSlideIndex].hidden = false;
      // console.log(`Carousel Next Slide index ${nextSlideIndex}, Direction ${this.slideDiection}`);
    }
    // show photo when Prev is clicked
    if (eventArg.name === Direction.PREV) {
      const nextSlideIndex = eventArg.slideIndex - 1 >= 0 ? eventArg.slideIndex - 1 : this.slides.length - 1;
      this.slides.forEach(slide => slide.hidden = true);
      this.slides[nextSlideIndex].hidden = false;
      // console.log(`Carousel Next Slide index ${nextSlideIndex}, Direction ${this.slideDiection}`);
    }
  }
}
