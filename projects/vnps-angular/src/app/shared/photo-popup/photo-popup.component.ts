import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Photo } from '../models/interfaces';

@Component({
  selector: 'vnps-photo-popup',
  templateUrl: './photo-popup.component.html',
  styleUrls: ['./photo-popup.component.css'],
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
export class PhotoPopupComponent implements OnInit {
  public closable = true;
  private max: number;
  @Input() data: Photo[];
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
