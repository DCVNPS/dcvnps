import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Slide } from '../shared/slide.model';
import { Direction, SlideEventArg } from '../shared/slide-event-arg';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
  @Output() slideClicked = new EventEmitter<SlideEventArg>();
  @Input() slide: Slide;
  @Input() isPlaying: boolean;
  private playing: boolean;
  private startStopBtnLabel: string;
  constructor() {
    this.playing = true;
  }
  ngOnInit() {
    this.startStopBtnLabel = this.playing ? 'Stop Slide Show' : 'Start Slide Show';
  }
  startStopSlideShow() {
    this.playing = !this.playing;
    this.startStopBtnLabel = this.playing ? 'Stop Slide Show' : 'Start Slide Show';
    this.slideClicked.emit(new SlideEventArg(Direction.STARTSTOP, this.slide.photoIndex, this.playing));
    // console.log(`Currently Playing ${this.playing} Button Clicked START-STOP`);
  }

  prevSlide() {
    this.playing = false;
    this.startStopBtnLabel = 'Start Slide Show';
    // console.log(`Prev Slide Clicked. Slide Index ${this.slide.photoIndex}, Direction ${Direction.PREV}`);
    this.slideClicked.emit(new SlideEventArg(Direction.PREV, this.slide.photoIndex, this.playing));
  }

  nextSlide() {
    this.playing = false;
    this.startStopBtnLabel = 'Start Slide Show';
    // console.log(`Next Slide Clicked. Slide Index ${this.slide.photoIndex}, Direction ${Direction.NEXT}`);
    this.slideClicked.emit(new SlideEventArg(Direction.NEXT, this.slide.photoIndex, this.playing));
  }
}
