import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { Slide } from '../shared/slide.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public level: string;
  public slides: Slide[];
  public showDialog = false;
  constructor(
    private api: ApiService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.level = params['level'];
      if(this.level){
        this.api.get(`/galleryphotosbyname/${this.level}`)
        .subscribe(data => {
          let cnt = 0;
          data.forEach(item => {
            this.slides.push(new Slide(item._id,
              item.galleryId,
              'dummy note',
              cnt,
              `galleries/${item.gallery}/${item.year}/${item.photo}`,
              `${item.photo.replace(/\.jpg$|\.bmp$/i, '')}`,
              item.portrait,
              true));
            cnt += 1;
          });
          console.log(this.slides);
        });       
      }
    });
   }

  ngOnInit() {
  }
  showPopup(sIndex: number) {
    const currentSlide = this.slides.find(s => s.photoIndex === sIndex);
    if (currentSlide) {
      this.showDialog = true;
      this.slides.forEach(s => s.hidden = true);
      this.slides[sIndex].hidden = false;
    }
  }
}
