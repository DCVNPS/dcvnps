import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GalleryDataService } from '../services/gallery-data.service';
import { Photo } from '../shared/photo.model';

@Component({
  selector: 'app-edit-gallery',
  templateUrl: './edit-gallery.component.html',
  styleUrls: ['./edit-gallery.component.scss']
})
export class EditGalleryComponent implements OnInit {

  public photos: Array<Photo> = [];
  constructor(private location: Location, private galleryData: GalleryDataService) { }

  ngOnInit() {
    // this.galleryData.data.subscribe( data => this.photos = dataPhoto // console.log(this.slides);
  }
  goBack() {
    this.location.back();
  }
}
