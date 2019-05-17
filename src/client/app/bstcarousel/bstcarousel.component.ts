import { Component, OnInit, Input } from '@angular/core';
import { Slide } from '../shared/slide.model';

@Component({
  selector: 'app-bstcarousel',
  templateUrl: './bstcarousel.component.html',
  styleUrls: ['./bstcarousel.component.scss']
})
export class BstcarouselComponent implements OnInit {

  @Input() slides: Array<Slide> = [];
  constructor() { }

  ngOnInit() {
  }

}
