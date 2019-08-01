import { Component, OnInit, Input } from '@angular/core';
import { Gallery } from '../../models/gallery.model';
@Component({
  selector: 'app-edit-gallery-profiles',
  templateUrl: './edit-gallery-profiles.component.html',
  styleUrls: ['./edit-gallery-profiles.component.scss']
})
export class EditGalleryProfilesComponent implements OnInit {

  @Input() private galleries: Array<Gallery>;
  constructor() { }

  ngOnInit() {
    // console.log(this.galleries);
  }
  editGallery(index: number) {
    console.log(`Edit gallery at index ${index}`);
    console.log(this.galleries[index]);
  }

  deleteGallery(index: number) {
    console.log(`Delete gallery at index ${index}`);
    console.log(this.galleries[index]);
  }
}
