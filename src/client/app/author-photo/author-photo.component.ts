import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../shared/photo.model';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-author-photo',
  templateUrl: './author-photo.component.html',
  styleUrls: ['./author-photo.component.scss']
})
export class AuthorPhotoComponent implements OnInit {
  @Input() private authorData: any;
  public author: string;
  public photos: Array<Photo> = [];
  constructor() { }

  ngOnInit() {
    this.author = this.authorData.author;
    this.photos = this.authorData.photos;
    console.log(this.photos);
  }
  imageClicked(i: number) {

  }
}
