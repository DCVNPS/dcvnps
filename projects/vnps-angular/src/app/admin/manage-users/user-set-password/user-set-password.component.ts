import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ManageUserService } from '../user.service';
import { ApiService } from '../../../api/services/api.service';
import { User } from '../../../shared/models/interfaces';

@Component({
  selector: 'vnps-user-set-password',
  templateUrl: './user-set-password.component.html',
  styleUrls: ['./user-set-password.component.css']
})
export class UserSetPasswordComponent implements OnInit {
  user: User;
  passwordForm: FormGroup;
  passwordInvalid: boolean;
  passwordMatched: boolean;
  cnfrmPwdInvalid: boolean;
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
    this.user = this.route.snapshot.data.users[0];
  }

  buildForm() {
    this.passwordForm = this.formBuilder.group({
      password: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)])
    });
  }

  resetForm() {
    this.passwordForm.reset();
  }

  // convenience getter for easy access to form fields. Good for form validation.
  get f() { return this.passwordForm.controls; }

  // convenience getter for easy access to form values. Good for submit.
  get formValues() { return this.passwordForm.value; }

  get isDirty(): boolean {
    return this.componentDirty;
  }

  onSavePwd() {
    if ( this.passwordForm.dirty && this.passwordForm.valid ) {
      this.user.password = this.formValues.password;
      this.componentDirty = false;
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.passwordForm.reset();
    this.router.navigate(['/admin/users']);
  }

  onCancelSetPassword() {
    this.componentDirty = this.passwordForm.dirty;
    if (this.componentDirty ) {
      this.showDialog = true;
    } else {
      this.router.navigate(['/admin/users']);
    }
  }

  onDeleteUser(id: string | undefined) {
    if (id) {
      this.showDialog = true;
    }
  }

  onAcceptDenySetPwd(accept: boolean) {
    this.showDialog = false;
    if (accept) {
      this.componentDirty = false;
      this.passwordForm.reset();
      this.router.navigate(['/admin/users']);
    }
  }

}
