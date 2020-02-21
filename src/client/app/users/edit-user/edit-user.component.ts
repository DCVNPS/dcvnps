import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user-model';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  @Input() user: User;
  @Input() roles: Array<any>;
  @Output() userEdited: EventEmitter<User> = new EventEmitter<User>();
  @Output() cancelEditUser: EventEmitter<void> = new EventEmitter<void>();

  public userForm: FormGroup;
  public cnfrmPwdInvalid: boolean = false;
  public passwordInvalid: boolean = false;
  public passwordMatched: boolean = true;
  public mUser: User;
  constructor(
    private formBuilder: FormBuilder, 
    private api: ApiService, 
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit() {
    // this.mUser = this.user;
    console.log({user: this.user, roles: this.roles});
    this.buildForm();
    this.setFormValues(this.user);
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      firstName: this.formBuilder.control(null, [Validators.required]),
      lastName: this.formBuilder.control(null, [Validators.required]),
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null),
      confirmPassword: this.formBuilder.control(null),
      activeInd: this.formBuilder.control(null),
      roleCode: this.formBuilder.control(null, [Validators.required])
    });
    // using reactive java script to capture changes.
    this.userForm.controls.confirmPassword.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
      .subscribe(data => {
        // reset password not matched notification.
        this.passwordMatched = true;
        if (data) {
          if (data.length < 8) {
            this.cnfrmPwdInvalid = true;
            console.log('password must be minimum 8 characters.');
            if (this.formValue.password !== data) {
              this.passwordMatched = true;
            }
            else {
              this.passwordMatched = false;
            }
          }
          else if (data.length === 0) {
            this.cnfrmPwdInvalid = true;
          }
        }
        else {
          this.cnfrmPwdInvalid = false;
        }
      });

    this.userForm.controls.password.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
      .subscribe(data => {
        // reset password not matched notification.
        this.passwordMatched = true;
        if (data) {
          if (data.length < 8) {
            this.passwordInvalid = true;
            console.log('password must be minimum 8 characters.');
          }
          else if (data.length === 0) {
            this.passwordInvalid = true;
          }
        }
        else {
          this.passwordInvalid = false;
        }
      });
  }

  setFormValues(user: User) {
    this.userForm.controls.firstName.setValue(user.userGivenName);
    this.userForm.controls.lastName.setValue(user.userSurname);
    this.userForm.controls.email.setValue(user.email);
    this.userForm.controls.roleCode.patchValue(user.roleCode);
  }

  resetForm() {
    this.userForm.reset();
  }

  // convenience getter for easy access to form fields. Good for form validation.
  get f() { return this.userForm.controls; }

  // convenience getter for easy access to form values. Good for submit.
  get formValue() { return this.userForm.value; }

  onSubmitForm() {
    this.mUser.userSurname = this.formValue.lastName;
    this.mUser.userGivenName = this.formValue.firstName;
    this.mUser.email = this.formValue.email;
    this.mUser.roleCode = this.formValue.roleCode;

    if (isNullOrUndefined(this.formValue.password) && isNullOrUndefined(this.formValue.confirmPassword)) {
      this.passwordMatched = true;
      this.passwordInvalid = false;
      this.cnfrmPwdInvalid = false;
      // this.mUser.password = null;
    }
    else if (this.formValue.password === this.formValue.confirmPassword &&
      this.userForm.controls.password.value.length > 0 &&
      this.userForm.controls.confirmPassword.value.length > 0) {
      console.log({ password: this.formValue.password, confirmPassword: this.formValue.confirmPassword });
      this.mUser.password = this.formValue.password;
    }
    else {
      this.passwordMatched = false;
    }
    this.userEdited.emit(this.mUser);
    // console.log(this.mUser);
    // this.api.put('admin/user',this.mUser)
    // .subscribe(
    //   data => {
    //     console.log(data); 
    //     this.resetForm();
    //     this.location.back(); // may be better user router navigate
    //   },
    //   error => { console.log(error); }
    // )
  }

  onCancelEdit(){
    // this.setFormValues(this.mUser);
    // this.location.back();
    this.cancelEditUser.emit();
  }
}
