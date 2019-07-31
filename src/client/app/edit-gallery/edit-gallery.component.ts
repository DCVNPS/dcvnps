import { Component, OnInit } from '@angular/core';
import { Photo } from '../models/photo.model';
import { AuthorData } from '../models/author.data.model';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { YearData } from '../models/year.data';

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
  private galleryData: Array<YearData> = [];
  public year: string;
  private level: string;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService) { }

  ngOnInit() {
    const parms = this.route.snapshot.params;
    this.author = parms.author;
    this.level = parms.level;
    this.year = parms.year;
    // console.log(parms);
    this.galleryData = this.route.snapshot.data.galleryData;
    // console.log(this.galleryData);
    this.photos = this.galleryData[0].authorData[0].photos;
  }

  deletePhoto(img: Photo) {
    // console.log(img);
    this.api.delete('deletephoto', img)
      .subscribe(res => {
        console.log(res);
        const delIndx = this.photos.indexOf(img);
        this.photos.splice(delIndx, 1);
      });
      console.log(this.galleryData);
      console.log(this.photos);
  }

  editPhoto(img: Photo) {
    console.log(img);
  }
}
