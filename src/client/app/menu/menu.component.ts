import { Component, OnInit } from '@angular/core';
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
          if (this.mClasses)
            this.level = this.mClasses[0].level;
        });
  }

  logout() {
    this.auth.logout()
    .subscribe( success =>{
      if(success){
        this.router.navigateByUrl('/home');
      }
    });
  }

  isLogin(): boolean {
    return this.auth.isLogin();
  }

  isSiteAdmin(): boolean {
    return this.auth.siteAdmin();
  }
}
