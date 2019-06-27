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
  public mPrograms: Array<any>;
  public isAdmin: boolean;
  constructor(private auth: AuthService,
    private api: ApiService,
    private router: Router) {
    this.mGalleries = [];
    this.mPrograms = [
      {level: 'level1', ariatext: 'Basic Photography'},
      {level: 'level2', ariatext: 'Mid-Level Photography'},
      {level: 'level3', ariatext: 'Advance Photography'}
    ];
  }

  ngOnInit() {
    this.isAdmin = this.auth.siteAdmin();
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
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
