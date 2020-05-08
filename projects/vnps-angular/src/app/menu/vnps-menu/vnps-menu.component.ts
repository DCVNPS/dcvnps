import { Component, OnInit } from '@angular/core';
import { Gallery } from '../../shared/models/interfaces';
import { AuthService } from '../../auth/services/auth.service';
import { ApiService } from '../../api/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vnps-menu',
  templateUrl: './vnps-menu.component.html',
  styleUrls: ['./vnps-menu.component.css']
})
export class VnpsMenuComponent implements OnInit {
  public mGalleries: Array<Gallery> = [];
  public level: string;
  // public username: string;
  public mClasses: Array<any>;
  public hidden = false;
  constructor(
    private authService: AuthService,
    private api: ApiService,
    private router: Router
  ) {
    this.mGalleries = [];
    this.mClasses = [];
  }

  ngOnInit() {
    // this.username = this.getUserName();
    this.api.get('commons/galleries')
      .subscribe(data => {
        Array.from(data).forEach((item: Gallery) => {
          if (!this.mGalleries.some(i => i.gallery === item.gallery)) {
            if (item.gallery !== 'home' && item.gallery !== 'aboutus') {
              this.mGalleries.push(item);
            }
          }
        });
      });
    // console.log(this.mGalleries);
    this.api.get('commons/vnpsclassmenu')
      .subscribe(
        data => {
          this.mClasses = data;
          if (this.mClasses) {
            this.level = this.mClasses[0].level;
          }
        });
  }

  logout() {
    this.authService.logout()
    .subscribe( success => {
      if (success) {
        this.router.navigate(['/home']);
      }
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get siteAdmin(): boolean {
    return this.authService.siteAdmin;
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  get UserName(): string {
    const loggedInUser = this.authService.User;
    const username = loggedInUser ? loggedInUser.email.split('@')[0] : null;
    return username;
  }
}
