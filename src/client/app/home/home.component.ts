import { Component, OnInit } from '@angular/core';
import { Slide } from '../shared/slide.model';
import { ActivatedRoute } from '@angular/router';
import { Gallery } from '../shared/gallery.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public slides: Array<Slide> = [];
  public galleries: Array<Gallery> = [];
  public carouseConfig: Object = { 'delay': 3000, 'showIndicator': true, 'runSlideShow': true };
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.slides = this.route.snapshot.data['photos'];
    this.galleries = this.route.snapshot.data['galleries'];
  }
}
