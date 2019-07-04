import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-author-photo',
  templateUrl: './author-photo.component.html',
  styleUrls: ['./author-photo.component.scss']
})
export class AuthorPhotoComponent implements OnInit {
@Input() private authorData: any;
  constructor() { }

  ngOnInit() {
  }

}
