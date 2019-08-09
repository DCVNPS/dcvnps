import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  @Output() announcementAdded: EventEmitter<Object> = new EventEmitter<Object>();
  constructor() { }

  ngOnInit() {
    this.tinyInit = {
      plugins: 'fullscreen image media link insertdatetime advlist lists wordcount imagetools',
      // tslint:disable-next-line: max-line-length
      toolbar: 'formatselect | bold italic forecolor backcolor permanentpen formatpainter | link image media| alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent',
      height: 400
    }
  }
  onSubmit(mForm: NgForm) {
    const formValues = Object.assign({}, mForm.value);
    this.title = formValues.title;
    this.content = formValues.content;
    // console.log({ 'title': this.title, 'content': this.content });
    // call api to post announcement content
    this.announcementAdded.emit({ 'title': this.title, 'content': this.content });
    mForm.reset();
  }

}
