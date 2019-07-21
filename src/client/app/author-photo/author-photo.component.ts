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
  @Input() private authorData: Object = {};
  @Output() showPopupClicked: EventEmitter<Photo[]> = new EventEmitter<Photo[]>();
  public author: string;
  public photos: Array<Photo> = [];
  public year: string;
  public isAdmin = false;
  private level: string;
  constructor(
    private router: Router,
    private auth: AuthService,
    private galleryDataService: GalleryDataService
  ) { }

  ngOnInit() {
    // console.log(this.authorData);
    this.level = this.authorData['level'];
    this.year = this.authorData['authorPhotos'].year;
    this.author = this.authorData['authorPhotos'].author;
    this.photos = this.authorData['authorPhotos'].photos;
    this.isAdmin = this.auth.isAdmin(this.level) || this.auth.siteAdmin();
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
    this.galleryDataService.updateData(this.authorData['authorPhotos']);
    console.log(`Edit Author ${this.author} photos`);
    this.router.navigateByUrl('/editgallery');
  }
}
