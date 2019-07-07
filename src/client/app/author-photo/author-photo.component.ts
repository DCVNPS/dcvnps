import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../shared/photo.model';
import { AuthorData } from '../shared/author.data.model';
import { AuthService } from '../services/auth.service';
import { GalleryDataService } from '../services/gallery-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-photo',
  templateUrl: './author-photo.component.html',
  styleUrls: ['./author-photo.component.scss']
})
export class AuthorPhotoComponent implements OnInit {
  @Input() private authorPhotos: AuthorData;
  @Output() showPopupClicked: EventEmitter<Photo[]> = new EventEmitter<Photo[]>();
  public author: string;
  public photos: Array<Photo> = [];
  public isAdmin = false;
  constructor(
    private router: Router,
    private auth: AuthService,
    private galleryDataService: GalleryDataService
  ) { }

  ngOnInit() {
    this.author = this.authorPhotos.author;
    this.photos = this.authorPhotos.photos;
    this.isAdmin = this.auth.levelAdmin();
    // console.log(this.photos);
    // console.log({ 'isAdmin ': this.isAdmin });
  }
  imageClicked(i: number) {
    this.photos.forEach(photo => { photo.hidden = true; });
    this.photos[i].hidden = false;
    // console.log(this.photos);
    this.showPopupClicked.emit(this.photos);
  }

  editPhotos() {
    this.galleryDataService.updateData(this.authorPhotos);
    console.log(`Edit Author ${this.author} photos`);
    this.router.navigateByUrl('/editgallery');
  }
}
