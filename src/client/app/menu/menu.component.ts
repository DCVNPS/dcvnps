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
  public mGalleries: string[];
  public level: string;
  public username:string;
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
      .subscribe(    data => {
        // console.log(data);
          data.forEach(item => {
            if (!this.mGalleries.some(i => i === item.gallery)) {
              if (item.gallery !== 'home' && item.gallery !== 'aboutus') {
                this.mGalleries.push(item.gallery);
              }
            }
          })
        });

    this.api.get('commons/vnpsclassmenu')
      .subscribe(
        data => {
          this.mClasses = data;
          const level1 = this.mClasses.find(c => c.level === 'level1');
          this.level = level1.level;
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
}
