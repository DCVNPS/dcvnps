import { Component, OnInit, Input } from '@angular/core';
import { Gallery } from '../../models/gallery.model';
@Component({
  selector: 'app-manage-galleries',
  templateUrl: './manage-galleries.component.html',
  styleUrls: ['./manage-galleries.component.scss']
})
export class ManageGalleriesComponent implements OnInit {
  public isAddGallery: boolean = false;
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
    this.isAddGallery = true;
  }

  onGalleryAdded(event){
    this.isAddGallery = !event;
  }
}
