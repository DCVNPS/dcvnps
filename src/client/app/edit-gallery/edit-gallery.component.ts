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
  // public year: string;
  // public level: string;
  public dzconfig:any ={};

  constructor(
    private route: ActivatedRoute,
    private api: ApiService) 
    { 
      const parms = this.route.snapshot.params;
      this.author = parms.author;
      this.dzconfig={'gallery': parms.gallery, 'year': parms.year};
      // console.log(this.dzconfig);
      this.galleryData = this.route.snapshot.data.galleryData;
      // console.log(this.galleryData);
      this.photos = this.galleryData[0].authorData[0].photos;
  
    }

  ngOnInit() {
  }

  deletePhoto(img: Photo) {
    // console.log(img);
    this.api.delete('galleries/deletephoto', img)
      .subscribe(res => {
        const delIndx = this.photos.indexOf(img);
        this.photos.splice(delIndx, 1);
      },
      error => {
        console.log(`Delete photo Id: ${img.photoId}_${img.imgalt}`);
        // Should log into a database table for later analys
        console.log(error);
      });
      // console.log(this.galleryData);
      // console.log(this.photos);
  }
  onPhotoAdded(event) {
    // console.log(event);
    this.photos.push(event);
  }
  editPhoto(img: Photo) {
    console.log(img);
  }
}
