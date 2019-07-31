import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Gallery } from '../models/gallery.model';

@Component({
  selector: 'app-manage-site',
  templateUrl: './manage-site.component.html',
  styleUrls: ['./manage-site.component.scss']
})
export class ManageSiteComponent implements OnInit {

  public isPhotoUpload: boolean;
  public isGallery: boolean;
  public isPrograms: boolean;
  public isAnnouncements: boolean;
  private galleries: Array<Gallery> = [];
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.isPhotoUpload = true;
  }

  onUploadClick() {
    this.isPhotoUpload = true;
    this.isGallery = false;
    this.isPrograms = false;
    this.isAnnouncements = false;
  }
  onGalleryClick() {
    this.isPhotoUpload = false;
    this.isGallery = true;
    this.isPrograms = false;
    this.isAnnouncements = false;
    this.galleries = this.api.getGalleries();
  }
  onAnnouncements() {
    this.isPhotoUpload = false;
    this.isGallery = false;
    this.isPrograms = false;
    this.isAnnouncements = true;
  }

  onPrograms() {
    this.isPhotoUpload = false;
    this.isGallery = false;
    this.isPrograms = true;
    this.isAnnouncements = false;
  }

}
