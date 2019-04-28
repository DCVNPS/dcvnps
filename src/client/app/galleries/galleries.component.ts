import { Component, OnInit } from '@angular/core';
import { Gallery } from '../shared/gallery.model';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
})
export class GalleriesComponent implements OnInit {
  public galleries: Gallery[] = [];
  constructor(private api: ApiService,
    private router: Router) { 
      
    }

  ngOnInit() {
    this.api.get('/galleries')
      .subscribe(data => {
        data.forEach(item => {
          const g = this.galleries.find(i => i.gallery === item.gallery);
          if (!g) {
            this.galleries.push(new Gallery(
              item._id,
              item.gallery,
              item.year,
              `profiles/${item.gallery}/${item.year}/${item.profilePhoto}`,
              item.createDate,
              item.updateDate))
          }
        });
        console.log(this.galleries);
      });
  }
  navigateGallery(gallery: string){
    console.log(`Galleries clicked ${gallery}`);
    this.router.navigate(['gallery', {level: gallery}]);
  }
}
