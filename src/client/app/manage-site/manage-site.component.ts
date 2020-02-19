import { Component, OnInit } from '@angular/core';
import { Gallery } from '../models/gallery.model';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user-model';
import { ApiService } from '../services/api.service';

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
  public isSiteUsers: boolean;
  public roles: Array<any> =[];
  public siteUsers: Array<User> = [];
  private galleries: Array<Gallery> = [];
  private apiEndpoint: string;
  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isPhotoUpload = true;
    this.galleries = this.route.snapshot.data['galleries'];
    this.roles = Array.from(this.route.snapshot.data['roles']);
    this.siteUsers = this.getUsers();
  }

  onUploadClick() {
    this.isPhotoUpload = true;
    this.isGallery = false;
    this.isClasses = false;
    this.isAnnouncements = false;
    this.isSiteUsers = false;
  }
  onGalleryClick() {
    this.isPhotoUpload = false;
    this.isGallery = true;
    this.isClasses = false;
    this.isAnnouncements = false;
    this.isSiteUsers = false;
  }
  onAnnouncements() {
    this.isPhotoUpload = false;
    this.isGallery = false;
    this.isClasses = false;
    this.isAnnouncements = true;
    this.isSiteUsers = false;
    // this.isAdminUsers = false;
  }

  onClasses() {
    this.isPhotoUpload = false;
    this.isGallery = false;
    this.isClasses = true;
    this.isAnnouncements = false;
    this.isSiteUsers = false;
  }

  onUsers(userType: string) {
    this.isPhotoUpload = false;
    this.isGallery = false;
    this.isClasses = false;
    this.isAnnouncements = false;
    this.isSiteUsers = (userType === 'siteuser');
  }

  getUsers() {
    // console.log(this.apiEndpoint);
    this.apiEndpoint = 'admin/user/siteusers';
    const users: Array<User> = []; // reset users array
    this.api.get(this.apiEndpoint)
      .subscribe(
        data => {
          data.forEach(au => {
            const aUser: User = new User(
              au.userId,
              au.email,
              au.password,
              au.userSurname,
              au.userGivenName,
              au.roleCode,
              au.roleDescription,
              au.activeInd,
              au.createdUserId,
              au.createdDate,
              au.updatedUserId,
              au.updatedDate
            );
            users.push(aUser);
          });
          // console.log(this.users);
        },
        error => { console.log(error); }
      );
      return users;
  }

}
