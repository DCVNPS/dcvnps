import { Component, OnInit } from '@angular/core';
import { Headers } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Contact } from '../models/contact.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  loading: Boolean = false;
  newContact: Contact;

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    const formValues = Object.assign({}, form.value);

    const contact: Contact = {
      name: `${formValues.firstName} ${formValues.lastName}`,
      address: formValues.address,
      phone: `${formValues.areaCode} ${formValues.prefix} ${formValues.lineNumber}`,
      photoUrl: formValues.photo,
      createdDate: null,
      updatedDate: null
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.api.post('/contacts', contact )
    // .pipe(map((res: Response) => res.json()))
    .subscribe( data => {
      form.reset();
      this.loading = false;
      this.newContact = data;
    });
  }
}
