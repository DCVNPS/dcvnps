import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../models/photo.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
// this component is the child component of GalleryComponent
// The output showPopupClicked is to trigger parent component
// to display the popup Modal.
@Component({
  selector: 'app-author-photo',
  templateUrl: './author-photo.component.html',
  styleUrls: ['./author-photo.component.scss']
})
export class AuthorPhotoComponent implements OnInit {
  @Input() private authorData: Object = {};
  @Output() showPopupClicked: EventEmitter<Photo[]> = new EventEmitter<Photo[]>();
  public author: Array<string>;
  public photos: Array<Photo> = [];
  public year: string;
  public isAdmin = false;
  private level: string;
  constructor(
    private router: Router,
    private auth: AuthService  ) { }

  ngOnInit() {
    // console.log(this.authorData);
    this.level = this.authorData['level'];
    this.year = this.authorData['authorPhotos'].year;
    this.author = this.authorData['authorPhotos'].author.split('.');
    this.photos = this.authorData['authorPhotos'].photos;
    this.isAdmin = this.auth.isAdmin() || this.auth.siteAdmin();
  }
  imageClicked(i: number) {
    // hide all photo except the one that is clicked
    this.photos.forEach(photo => { photo.hidden = true; });
    this.photos[i].hidden = false;
    // console.log(this.photos);
    this.showPopupClicked.emit(this.photos);
  }

  editPhotos() {
    // this.galleryDataService.updateData(this.authorData);
    // Need to join the author's name parts together. js will automatically join with ',' as default.
    const editUrl = `/editpersonalgallery/${this.level}/${this.year}/${this.author.join('.')}`;
    // console.log(`Edit Photos ${editUrl}`);
    this.router.navigateByUrl(editUrl);
  }
}
