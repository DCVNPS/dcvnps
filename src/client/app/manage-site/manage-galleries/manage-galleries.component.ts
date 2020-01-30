import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Gallery } from '../../models/gallery.model';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-manage-galleries',
  templateUrl: './manage-galleries.component.html',
  styleUrls: ['./manage-galleries.component.scss']
})
export class ManageGalleriesComponent implements OnInit {

  @Input() public galleries: Array<Gallery>;
  @ViewChild('confirmation') confirmDialog: ElementRef;

  public isAddGallery: boolean = false;
  public errorMsg: string;

  private deletedIndex: number = undefined;

  constructor(private api: ApiService, private renderer: Renderer) { }

  ngOnInit() {
    // console.log(this.galleries);
  }
  editGallery(index: number) {
    console.log(`Edit gallery at index ${index}`);
    // console.log(this.galleries[index]);
  }

  deleteGallery(index: number) {
    this.deletedIndex = index;
    this.renderer.setElementClass(this.confirmDialog.nativeElement, 'active', true);
  }

  onAcceptDenyDelete(accept: boolean) {
    // close the modal
    this.renderer.setElementClass(this.confirmDialog.nativeElement, 'active', false);
    if (accept) {
      // console.log(this.galleries[this.deletedIndex]);
      this.api.delete('galleries', {galleryId:this.galleries[this.deletedIndex].galleryId, galDirPart:this.galleries[this.deletedIndex].gallery.replace(' ','_')})
      .subscribe(
        (success) => { 
          // console.log({message: 'Delete success', gallery: this.galleries[this.deletedIndex]});
          this.galleries.splice(this.deletedIndex,1);
        },
        error => { console.log(error);}
      );
    }
    else {
      console.log(`Cancel deletion of gallery ${this.galleries[this.deletedIndex].gallery}`);
    }
  }

  onAddNewGallery() {
    this.isAddGallery = true;
  }

  onGalleryAdded(event) {
    const { finish, addedGallery, errorMsg } = event;
    this.isAddGallery = !finish;
    this.errorMsg = errorMsg;
    if (addedGallery) {
      const g: Gallery = new Gallery(addedGallery.galleryId, addedGallery.gallery, addedGallery.profilePhoto, addedGallery.activeInd, addedGallery.updatedUser, addedGallery.createdDate, addedGallery.updatedDate);
      this.galleries.push(g);
    }
  }
}
