import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../shared/photo.model';
import { AuthorData } from '../shared/author.data.model';

@Component({
  selector: 'app-author-photo',
  templateUrl: './author-photo.component.html',
  styleUrls: ['./author-photo.component.scss']
})
export class AuthorPhotoComponent implements OnInit {
  @Input() private authorPhotos: AuthorData;
  @Output() showPopupClicked: EventEmitter<Photo[]> = new EventEmitter<Photo[]>();
  public author: string;
  public photos: Array<Photo> = [];
  constructor() { }

  ngOnInit() {
    this.author = this.authorPhotos.author;
    this.photos = this.authorPhotos.photos;
    // console.log(this.photos);
  }
  imageClicked(i: number) {
    this.photos.forEach( photo => { photo.hidden = true; } );
    this.photos[i].hidden = false;
    // console.log(this.photos);
    this.showPopupClicked.emit(this.photos);
  }
}
