import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  private title: string;
  private content: string;
  private tinyInit: Object;
  constructor(private auth: AuthService) {
    this.tinyInit = {
      plugins: 'fullscreen image media link insertdatetime advlist lists wordcount imagetools',
      // tslint:disable-next-line: max-line-length
      toolbar: 'formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter | link image media pageembed | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcommentt'
    }
   }
  ngOnInit() {
  }

  siteAdmin() {
    return this.auth.siteAdmin();
  }
  onSubmit(mForm: NgForm) {
    const formValues = Object.assign({}, mForm.value);
    this.title = formValues.title;
    this.content = formValues.content;
    console.log(this.title);
    console.log(this.content);
  }
}
