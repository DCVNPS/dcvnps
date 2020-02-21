import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user-model';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  @Input() roles: Array<any> = [];
  @Output() userAdded: EventEmitter<User> = new EventEmitter<User>();
  @Output() cancelNewUser: EventEmitter<any> = new EventEmitter();
  public userForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.userForm = this.formBuilder.group({
      firstName: this.formBuilder.control(null, [Validators.required]),
      lastName: this.formBuilder.control(null,[Validators.required]),
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)]),
      roleCode: this.formBuilder.control(null, [Validators.required]),
      activeInd: this.formBuilder.control('N',[Validators.required])
    })
  }

  resetForm() {
    this.userForm.reset();
  }

  // convenience getter for easy access to form fields. Good for form validation.
  get f() { return this.userForm.controls; }

  // convenience getter for easy access to form values. Good for submit.
  get formValue() { return this.userForm.value;}

  onCreateUser(){
    const newUser: User = new User(
       null,  //userid
       this.formValue.email,
       this.formValue.password,
       this.formValue.lastName,
       this.formValue.firstName,
       this.formValue.roleCode,
      null, //role desc
      this.formValue.activeInd,
      null,
      null,
      null,
      null
    );
    this.userAdded.emit(newUser);
    this.resetForm();
  }

  onCancel(){
    this.cancelNewUser.emit();
  }
}
