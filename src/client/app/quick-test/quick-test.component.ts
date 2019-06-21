import { Component, OnInit } from '@angular/core';
import { Slide } from '../shared/slide.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quick-test',
  templateUrl: './quick-test.component.html',
  styleUrls: ['./quick-test.component.scss']
})
export class QuickTestComponent implements OnInit {
  imgSrc = 'profiles/member/2018/member-2018.jpg';
  public popupInput: Slide[] = [];
  public slides: Array<Slide> = [];
  public showDialog: boolean;
  public carouseConfig: Object = {'delay': 3000, 'showIndicator': true, 'runSlideShow': true};
  constructor(private route: ActivatedRoute) {
    this.popupInput = [new Slide(
      '12345',
      '2017',
      '45678',
      'Testing image',
      1,
      'profiles/member/2018/member-2018.jpg',
      'alternative',
      false,
      false)];
  }
  ngOnInit() {
    // this.getHomePhotos();
    this.slides = this.route.snapshot.data['photos'];
  }
}
