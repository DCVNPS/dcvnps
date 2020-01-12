import { Component, OnInit } from '@angular/core';
import { Gallery } from '../models/gallery.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-site',
  templateUrl: './manage-site.component.html',
  styleUrls: ['./manage-site.component.scss']
})
export class ManageSiteComponent implements OnInit {

  public isPhotoUpload: boolean;
  public isGallery: boolean;
  public isClasses: boolean;
  public isAnnouncements: boolean;
  public isUsers: boolean;
  private galleries: Array<Gallery> = [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.isPhotoUpload = true;
    this.galleries = this.route.snapshot.data['galleries'];
  }

  onUploadClick() {
    this.isPhotoUpload = true;
    this.isGallery = false;
    this.isClasses = false;
    this.isAnnouncements = false;
    this.isUsers = false;
  }
  onGalleryClick() {
    this.isPhotoUpload = false;
    this.isGallery = true;
    this.isClasses = false;
    this.isAnnouncements = false;
    this.isUsers = false;
  }
  onAnnouncements() {
    this.isPhotoUpload = false;
    this.isGallery = false;
    this.isClasses = false;
    this.isAnnouncements = true;
    this.isUsers = false;
  }

  onClasses() {
    this.isPhotoUpload = false;
    this.isGallery = false;
    this.isClasses = true;
    this.isAnnouncements = false;
    this.isUsers = false;
  }

  onUsers() {
    this.isPhotoUpload = false;
    this.isGallery = false;
    this.isClasses = false;
    this.isAnnouncements = false;
    this.isUsers = true;
  }
}
