import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Announcement } from '../../models/announcement-model';
import { ApiService } from '../../services/api.service';

// 'https://www.youtube.com/embed/3FEs2IFnkEw'
// 'https://www.youtube.com/embed/okceADa846I'

@Component({
  selector: 'app-add-announce',
  templateUrl: './add-announce.component.html',
  styleUrls: ['./add-announce.component.scss']
})
export class AddAnnounceComponent implements OnInit {
  private tinyInit: Object;
  private title: string;
  private content: string;
  private ancmnt: Announcement;
  @Output() addAncmntEvent: EventEmitter<Object> = new EventEmitter<Object>();
  constructor(private api: ApiService) {
   }

  ngOnInit() {
    this.tinyInit = {
      plugins: 'fullscreen image media link insertdatetime advlist lists wordcount imagetools',
      // tslint:disable-next-line: max-line-length
      toolbar: 'formatselect | bold italic forecolor backcolor permanentpen formatpainter | link image media| alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent',
      height: 400
    };
  }
  onSubmit() {
    // console.log({ 'title': this.title, 'content': this.content });
    this.ancmnt = {
      'announcementId': null,
      'title': this.title,
      'content': this.content,
      'userId': null,
      'postedBy': null,
      'postedDate': null,
      'updatedDate': null
    };
    this.api.post('announcements', this.ancmnt)
    .subscribe( data => {
      console.log(data);
      this.resetForm();
      this.addAncmntEvent.emit(data);
    });
  }
  onCancel() {
    this.addAncmntEvent.emit();
  }
  resetForm() {
    this.title = null;
    this.content = null;
  }
}
