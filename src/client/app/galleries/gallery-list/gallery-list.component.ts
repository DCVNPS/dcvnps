import { Component, OnInit, Input } from '@angular/core';
import { Gallery } from '../../models/gallery.model';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss']
})
export class GalleryListComponent implements OnInit {
  @Input() galleries: Array<Gallery> = [];
  constructor() { }

  ngOnInit() {
  }

}
