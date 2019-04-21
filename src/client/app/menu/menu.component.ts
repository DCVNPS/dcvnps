import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Gallery } from '../shared/gallery.model';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public mGalleries: string[];
  public mPrograms: Array<any>;
  constructor(public auth: AuthService,
    private api: ApiService,
    private router: Router) {
    this.mGalleries = [];
    this.mPrograms = [
      {link:'level1', ariatext:'Basic Photography'},
      {link:'level2',ariatext:'Mid-Level Photography'},
      {link:'level3',ariatext:'Advance Photography'}
    ];
  }

  ngOnInit() {
    this.api.get('/galleries')
      .subscribe(data => {
        data.forEach(item => {
          if (!this.mGalleries.some(i => i === item.gallery)) {
            this.mGalleries.push(item.gallery);
          }
        });
        console.log(this.mGalleries);
      });
  }

  logout() {
    this.auth.logout();
  }
}
