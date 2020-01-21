import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Gallery } from '../models/gallery.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  // public mGalleries: string[];
  public mGalleries: Array<Gallery> = [];
  public level: string;
  public username: string;
  public mClasses: Array<any>;
  public hidden = false;
  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router
  ) {
    this.mGalleries = [];
    this.mClasses = [];
  }

  ngOnInit() {
    this.api.get('galleries')
      .subscribe(data => {
        data.forEach(item => {
          if (!this.mGalleries.some(i => i.gallery === item.gallery)) {
            if (item.gallery !== 'home' && item.gallery !== 'aboutus') {
              this.mGalleries.push(item);
            }
          }
        })
      });
    // console.log(this.mGalleries);
    this.api.get('commons/vnpsclassmenu')
      .subscribe(
        data => {
          this.mClasses = data;
          if(this.mClasses)
            this.level = this.mClasses[0].level;
        },
        err => {
          console.log(err);
        })
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }

  isLogin(): boolean {
    return this.auth.isLogin();
  }

  isAdmin(): boolean {
    return this.auth.siteAdmin();
  }
  // navigateGallery(gallery: Gallery) {
  //   this.router.navigateByUrl('gallery/level', {state: gallery});
  // }
}
