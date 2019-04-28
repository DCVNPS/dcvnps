import { Component, OnInit } from '@angular/core';
import { Slide } from '../shared/slide.model';

@Component({
  selector: 'app-quick-test',
  templateUrl: './quick-test.component.html',
  styleUrls: ['./quick-test.component.scss']
})
export class QuickTestComponent implements OnInit {
  imgSrc = 'profiles/member/2018/member-2018.jpg';
  public popupInput: Slide[];
  public showDialog: boolean;
  constructor() {
    this.popupInput = [new Slide(
      '12345',
      '45678',
      'Testing image',
       1,
      'profiles/member/2018/member-2018.jpg',
      'alternative',
      false,
      false)];
  }
  ngOnInit() {
  }

}
