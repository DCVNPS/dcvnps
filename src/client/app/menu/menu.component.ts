import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public mGalleries: string[];
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
          if (!this.mGalleries.some(i => i === item.gallery)) {
            if (item.gallery !== 'home' && item.gallery !== 'aboutus') {
              this.mGalleries.push(item.gallery);
            }
          }
        });
      });
      this.api.get('photoclassmenu')
      .subscribe( data => {
          this.mClasses = data;
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
