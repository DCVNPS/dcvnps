import { Component, OnInit, Input } from '@angular/core';
import { Gallery } from '../../models/gallery.model';
@Component({
  selector: 'app-edit-gallery-profiles',
  templateUrl: './manage-gallery-profiles.component.html',
  styleUrls: ['./manage-gallery-profiles.component.scss']
})
export class ManageGalleryProfilesComponent implements OnInit {

  @Input() public galleries: Array<Gallery>;
  constructor() { }

  ngOnInit() {
    // console.log(this.galleries);
  }
  editGallery(index: number) {
    console.log(`Edit gallery at index ${index}`);
    // console.log(this.galleries[index]);
  }

  deleteGallery(index: number) {
    console.log(`Delete gallery at index ${index}`);
    // console.log(this.galleries[index]);
  }

  onAddNewGallery(){
    alert("New Gallery Added.");
  }
}
