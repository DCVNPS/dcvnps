import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GalleryDataService } from '../services/gallery-data.service';
import { Slide } from '../shared/slide.model';

@Component({
  selector: 'app-edit-gallery',
  templateUrl: './edit-gallery.component.html',
  styleUrls: ['./edit-gallery.component.scss']
})
export class EditGalleryComponent implements OnInit {

  public slides: Array<Slide> = [];
  constructor(private location: Location, private galleryData: GalleryDataService) { }

  ngOnInit() {
    this.galleryData.data.subscribe( data => this.slides = data);
    // console.log(this.slides);
  }
  goBack() {
    this.location.back();
  }
}
