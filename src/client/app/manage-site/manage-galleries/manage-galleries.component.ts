import { Component, OnInit, Input } from '@angular/core';
import { Gallery } from '../../models/gallery.model';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-manage-galleries',
  templateUrl: './manage-galleries.component.html',
  styleUrls: ['./manage-galleries.component.scss']
})
export class ManageGalleriesComponent implements OnInit {
  public isAddGallery: boolean = false;
  public errorMsg: string;
  @Input() public galleries: Array<Gallery>;
  constructor(private api: ApiService) { }

  ngOnInit() {
    // console.log(this.galleries);
  }
  editGallery(index: number) {
    console.log(`Edit gallery at index ${index}`);
    // console.log(this.galleries[index]);
  }

  deleteGallery(index: number) {
    console.log(`Delete gallery at index ${index}`);
    console.log(this.galleries[index]);
    this.api.delete('galleries', {galleryId:this.galleries[index].galleryId, galDirPart:this.galleries[index].gallery.replace(' ','_')})
    .subscribe(
      (success) => { 
        console.log({message: 'Delete success', gallery: this.galleries[index]});
        this.galleries.splice(index,1);
        // this.galleries.splice(index,1);
      },
      error => { console.log(error);}
    );
  }

  onAddNewGallery(){
    this.isAddGallery = true;
  }

  onGalleryAdded(event){
    const {finish, addedGallery, errorMsg } = event;
    this.isAddGallery = !finish;
    this.errorMsg = errorMsg;
    if(addedGallery){
      const g:Gallery = new Gallery(addedGallery.galleryId, addedGallery.gallery, addedGallery.profilePhoto, addedGallery.activeInd, addedGallery.updatedUser, addedGallery.createdDate, addedGallery.updatedDate);
      this.galleries.push(g);
    }
  }
}
