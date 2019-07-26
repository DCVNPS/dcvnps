import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GalleryDataService } from '../services/gallery-data.service';
import { Photo } from '../models/photo.model';
import { AuthorData } from '../models/author.data.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-edit-gallery',
  templateUrl: './edit-gallery.component.html',
  styleUrls: ['./edit-gallery.component.scss']
})
export class EditGalleryComponent implements OnInit {

  public authorData: AuthorData;
  public isAdmin: boolean;
  public author: string;
  public photos: Array<Photo> = [];
  public year: string;
  private level: string;

  constructor(
    private location: Location,
    private api: ApiService,
    private galleryData: GalleryDataService
  ) { }

  ngOnInit() {
    this.galleryData.data.subscribe(data => {
      this.authorData = data;
      // console.log(this.authorData);
      this.level = this.authorData['level'];
      this.year = this.authorData['authorPhotos'].year;
      this.author = this.authorData['authorPhotos'].author;
      this.photos = this.authorData['authorPhotos'].photos;
    });
  }
  goBack() {
    this.location.back();
  }

  deletePhoto(img: Photo) {
    console.log(img);
  }

  editPhoto(img: Photo) {
    console.log(img);
  }
}
