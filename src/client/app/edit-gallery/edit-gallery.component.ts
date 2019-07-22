import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GalleryDataService } from '../services/gallery-data.service';
import { Photo } from '../shared/photo.model';
import { AuthorData } from '../shared/author.data.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-gallery',
  templateUrl: './edit-gallery.component.html',
  styleUrls: ['./edit-gallery.component.scss']
})
export class EditGalleryComponent implements OnInit {

  public authorData: AuthorData;
  public isAdmin: boolean;
  constructor(
    private auth: AuthService,
    private location: Location,
    private galleryData: GalleryDataService
  ) { }

  ngOnInit() {
    this.galleryData.data.subscribe(data => {
      this.authorData = data;
      console.log(this.authorData);
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
