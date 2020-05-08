import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo, AuthorPhotos } from '../models/interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'vnps-author-photo',
  templateUrl: './author-photo.component.html',
  styleUrls: ['./author-photo.component.css']
})
export class AuthorPhotoComponent implements OnInit {

  @Input() private authorData: AuthorPhotos;
  @Input() private enablePopup = false;
  @Input() public enableDelete = false;
  @Output() photoDeleted: EventEmitter<AuthorPhotos> = new EventEmitter<AuthorPhotos>();
  author: string;
  photos: Array<Photo> = [];
  year: string;
  isAdmin = false;
  showDialog = false;
  private level: string | undefined;
  constructor(
    private router: Router,
    private auth: AuthService  ) { }

  ngOnInit() {
    this.level = this.authorData.gallery;
    this.year = this.authorData.year;
    this.author = this.authorData.author.replace('.', ' ');
    this.photos = this.authorData.photos;
    this.isAdmin = this.auth.siteAdmin || this.auth.siteAdmin;
  }

  imageClicked(i: number) {
    if (!this.enablePopup) {
      return;
    }
    // hide all photo except the one that is clicked
    this.photos.forEach(photo => { photo.hidden = true; });
    this.photos[i].hidden = false;
    // console.log(this.photos);
    // this.showPopupClicked.emit(this.photos);
    this.showDialog = true;
  }

  // editPhotos() {
  //   // this.galleryDataService.updateData(this.authorData);
  //   // Need to join the author's name parts together. js will automatically join with ',' as default.
  //   const editUrl = `/editpersonalgallery/${this.level}/${this.year}/${this.authorData.author}`;
  //   // console.log(`Edit Photos ${editUrl}`);
  //   this.router.navigateByUrl(editUrl);
  // }

  onDeletePhoto(photo: Photo) {
    // remove the photo from component data array.
    // emit the photoid back to manage-photo-edit component to delete from server.
    const authorPhotos: AuthorPhotos = { author: this.author.replace(' ', '.'), year: this.year, gallery: photo.gallery, photos: [photo] };
    this.photoDeleted.emit(authorPhotos);
  }
}
