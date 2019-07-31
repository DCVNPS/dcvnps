import { Component, OnInit, Input } from '@angular/core';
import { Gallery } from 'client/app/models/gallery.model';

@Component({
  selector: 'app-edit-gallery-profiles',
  templateUrl: './edit-gallery-profiles.component.html',
  styleUrls: ['./edit-gallery-profiles.component.scss']
})
export class EditGalleryProfilesComponent implements OnInit {

  @Input() private galleries: Array<Gallery>;
  constructor() { }

  ngOnInit() {
  }

}
