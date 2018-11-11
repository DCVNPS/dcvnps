import { Component, Input, OnInit } from '@angular/core';
import { Slide } from '../shared/slide.model';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit{
  @Input() slide: Slide;
  constructor() {
  }
  ngOnInit(){
    console.log(this.slide);
  }
}
