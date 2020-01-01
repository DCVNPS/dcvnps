import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user-model';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  @Input() user: User;
  public userForm: FormGroup;
  public roles: Object = {};
  public cnfrmPwdInvalid: boolean = false;
  public passwordInvalid: boolean = false;
  public passwordMatched: boolean = true;
  private mUser: User;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private route: ActivatedRoute) {
    // this.user = new User(
    //   "30f16bf0-c98e-11e9-aa81-08002764505e",
    //   "nguyen.valery@gmail.com",
    //   "$2b$10$NdoqYyu2YWHeWo0RvaPicuMS0Eqo8anskRBbwy4bmhIFcJ4XBJEUu",
    //   "nguyen",
    //   "valery",
    //   "LVL3ADM",
    //   "7cb5e812-6eb2-11e9-8849-848f69b86260",
    //   new Date("2019-08-28T12:20:16.000Z"),
    //   "7cb5e812-6eb2-11e9-8849-848f69b86260",
    //   new Date("2019-08-28T12:20:16.000Z")
    // );
  }

  ngOnInit() {
    this.mUser = this.user;
    this.roles = this.route.snapshot.data['roles'];
    this.buildForm();
    if (this.user) {
      this.setFormValues(this.user);
    }
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      firstName: this.formBuilder.control(null, [Validators.required]),
      lastName: this.formBuilder.control(null, [Validators.required]),
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null),
      confirmPassword: this.formBuilder.control(null),
      roleCode: this.formBuilder.control(null, [Validators.required])
    });
    // using reactive java script to capture changes.
    this.userForm.controls.confirmPassword.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe( data =>{ 
      // reset password not matched notification.
      this.passwordMatched = true;
      if( data.length < 8){
        this.cnfrmPwdInvalid = true;
        console.log('password must be minimum 8 characters.');
        if( this.formValue.password !== data){
          this.passwordMatched = true;
        }
        else{
          this.passwordMatched = false;
        }
      }
      else if(data.length === 0){
        this.cnfrmPwdInvalid = true;
      }
      else{
        this.cnfrmPwdInvalid = false;
      }
    });
    this.userForm.controls.password.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe( data =>{ 
      // reset password not matched notification.
      this.passwordMatched = true;
      if( data.length < 8){
        this.passwordInvalid = true;
        console.log('password must be minimum 8 characters.');
      }
      else if( data.length === 0){
        this.passwordInvalid = true;
      }
      else{
        this.passwordInvalid = false;
      }
    });
  }

  setFormValues(user: User) {
    this.userForm.controls.firstName.setValue(this.user.userGivenName);
    this.userForm.controls.lastName.setValue(this.user.userSurname);
    this.userForm.controls.email.setValue(this.user.email);
    this.userForm.controls.roleCode.patchValue(this.user.roleCode);
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
    
    if( isNullOrUndefined(this.formValue.password) && isNullOrUndefined(this.formValue.confirmPassword)){
      this.passwordMatched = true;
      this.passwordInvalid = false;
      this.cnfrmPwdInvalid = false;
      this.mUser.password = null;
    }
    else if(this.formValue.password === this.formValue.confirmPassword && 
      this.userForm.controls.password.value.length > 0 && 
      this.userForm.controls.confirmPassword.value.length > 0){
      console.log({password: this.formValue.password, confirmPassword: this.formValue.confirmPassword});
      this.mUser.password = this.formValue.password;
    }
    else{
      this.passwordMatched = false;
    }
    console.log(this.mUser);
  }

}
