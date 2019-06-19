import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Slide } from '../shared/slide.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  animations: [
    trigger('popup', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class PopupComponent {
  public closable = true;
  private max: number;
  @Input() data: Slide[];
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  prevImage() {
    this.max = this.data.length;
    const curImg = this.data.find(i => !i.hidden);
    // console.log('Current Photo', curImg);
    let nextPhotoIndx = curImg.photoIndex - 1;
    if (nextPhotoIndx < 0) {
      nextPhotoIndx = this.max - 1;
    }
    this.data[curImg.photoIndex].hidden = true;
    this.data[nextPhotoIndx].hidden = false;
    // console.log('Previous Photo ', this.data[nextPhotoIndx]);
  }

  nextImage() {
    this.max = this.data.length;
    const curImg = this.data.find(i => !i.hidden);
    // console.log('Current Photo', curImg);
    let nextPhotoIndx = curImg.photoIndex + 1;
    if (nextPhotoIndx >= this.max) {
      nextPhotoIndx = 0;
    }
    this.data[curImg.photoIndex].hidden = true;
    this.data[nextPhotoIndx].hidden = false;
    // console.log('Nex Photo ', this.data[nextPhotoIndx]);
  }
}