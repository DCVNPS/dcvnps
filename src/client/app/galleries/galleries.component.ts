import { Component, OnInit } from '@angular/core';
import { Gallery } from '../shared/gallery.model';
import { ApiService } from '../shared/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Slide } from '../shared/slide.model';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
})
export class GalleriesComponent implements OnInit {
  public galleries: Gallery[] = [];
  public level: string;
  public year: string;
  public slides: Slide[];
  public showDialog = false;
  constructor(private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { 
      this.level = this.activatedRoute.params['level'];
      this.year = this.activatedRoute.params['year'];
      console.log({level:this.level, year:this.year});
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
