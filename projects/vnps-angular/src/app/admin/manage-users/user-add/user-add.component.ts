import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { User, Role } from '../../../shared/models/interfaces';
import { ApiService } from '../../../api/services/api.service';
import { ManageUserService } from '../user.service';

@Component({
  selector: 'vnps-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user: User;
  roles: Role[] = [];
  userForm: FormGroup;
  passwordMatched: boolean;
  componentDirty: boolean;
  showDialog: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private api: ApiService,
    public userService: ManageUserService
  ) { }

  ngOnInit(): void {
    this.initializeData();
    this.buildForm();
    this.passwordMatched = true;
  }

  initializeData(): void {
    this.roles = this.route.snapshot.data.roles;
    //  console.log(this.roles);
  }

  buildForm() {
    // set default role to Site User(SITEUSR)
    const defaultRole = this.roles.filter(r => r.roleCode === 'SITEUSR')[0].roleCode;
    this.userForm = this.formBuilder.group({
      firstName: this.formBuilder.control(null, [Validators.required]),
      lastName: this.formBuilder.control(null, [Validators.required]),
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)]),
      activeInd: this.formBuilder.control('N', [Validators.required]),
      roleCode: this.formBuilder.control(defaultRole, [Validators.required])
    });
    // using reactive java script to capture changes.
    this.userForm.controls.confirmPassword.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
      .subscribe(data => {
        // reset password not matched notification.
        this.passwordMatched = true;
        if (data && this.f.confirmPassword.valid) {
          this.passwordMatched = this.formValues.password === data;
        }
      });

    this.userForm.controls.password.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
      .subscribe(data => {
        // reset password not matched notification.
        this.passwordMatched = true;
        if (data && this.f.password.valid) {
          this.passwordMatched = this.formValues.confirmPassword === data;
        }
      });
  }

  resetForm() {
    this.userForm.reset();
  }

  // convenience getter for easy access to form fields. Good for form validation.
  get f() { return this.userForm.controls; }

  // convenience getter for easy access to form values. Good for submit.
  get formValues() { return this.userForm.value; }

  get isDirty(): boolean {
    return this.componentDirty;
  }

  onSaveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      this.user = {
        userGivenName: this.formValues.firstName,
        userSurname: this.formValues.lastName,
        email: this.formValues.email,
        password: this.formValues.password,
        activeInd: this.formValues.activeInd,
        roleCode: this.formValues.roleCode
      };
      // console.log(this.formValues);
      this.api.post('users', this.user)
      .subscribe( (failed) => {
        if (!!failed) {
          this.onSaveComplete();
        }
      });
    }
  }

  onSaveComplete(): void {
    this.componentDirty = false;
    this.userForm.reset();
    this.router.navigate(['/admin/users']);
  }

  onCancelUserAdd() {
    this.showDialog = this.userForm.dirty;
    if (!this.showDialog) {
      this.router.navigate(['/admin/users']);
    }
  }

  onAcceptDenyDelete(accept: boolean) {
    this.showDialog = false;
    if (accept) {
      this.userForm.reset();
      this.router.navigate(['/admin/users']);
    }
  }

}
