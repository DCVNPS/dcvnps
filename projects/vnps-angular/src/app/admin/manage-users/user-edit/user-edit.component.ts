import { Component, OnInit } from '@angular/core';
import { User, Role } from '../../../shared/models/interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ApiService } from '../../../api/services/api.service';
import { ManageUserService } from '../user.service';

@Component({
  selector: 'vnps-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User;
  roles: Role[] = [];
  userForm: FormGroup;
  passwordInvalid: boolean;
  passwordMatched: boolean;
  cnfrmPwdInvalid: boolean;
  // componentDirty: boolean;
  showDeleteConfirmDialog: boolean;
  showCancelEditDialog: boolean;

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
    this.setFormValues(this.user);
    this.passwordMatched = true;
  }

  initializeData(): void {
    this.user = this.route.snapshot.data.users[0];
    this.api.get('commons/roles')
      .subscribe((data: Array<Role>) => {
        data.forEach(d => {
          this.roles.push(d);
        });
      });
    // console.log(this.roles);
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      firstName: this.formBuilder.control(null, [Validators.required]),
      lastName: this.formBuilder.control(null, [Validators.required]),
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      activeInd: this.formBuilder.control(null, [Validators.required]),
      roleCode: this.formBuilder.control(null, [Validators.required])
    });
  }

  setFormValues(user: User) {
    this.f.firstName.setValue(user.userGivenName);
    this.f.lastName.setValue(user.userSurname);
    this.f.email.setValue(user.email);
    this.f.activeInd.setValue(user.activeInd);
    this.f.roleCode.patchValue(user.roleCode);
  }

  resetForm() {
    this.userForm.reset();
  }

  // convenience getter for easy access to form fields. Good for form validation.
  get f() { return this.userForm.controls; }

  // convenience getter for easy access to form values. Good for submit.
  get formValues() { return this.userForm.value; }

  // get isDirty(): boolean {
  //   return this.componentDirty;
  // }

  onSaveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      // this.componentDirty = false;
      this.user.userSurname = this.formValues.lastName;
      this.user.userGivenName = this.formValues.firstName;
      this.user.email = this.formValues.email;
      this.user.activeInd = this.formValues.activeInd;
      this.user.roleCode = this.formValues.roleCode;
      console.log(this.formValues);
      this.api.put('users', this.user)
        .subscribe(() => this.onSaveComplete());
    }
  }

  onSaveComplete(): void {
    this.userForm.reset();
    this.router.navigate(['/admin/users']);
  }

  onCancelEdit() {
    // this.componentDirty = this.userForm.dirty;
    if (this.userForm.dirty) {
      this.showCancelEditDialog = true;
    } else {
      this.router.navigate(['/admin/users']);

    }
  }

  onDeleteUser(id: string | undefined) {
    if (id) {
      this.showDeleteConfirmDialog = true;
    }
  }

  onAcceptDenyDelete(accept: boolean) {
    this.showDeleteConfirmDialog = false;
    if (accept) {
      this.api.delete(`users/${this.user.userId}`)
        .subscribe((failed) => {
          if (!!failed) {
            alert(`User ${this.user.email} deleted.`);
            // this.componentDirty = false;
            this.router.navigate(['/admin/users']);
          }
        });
    }
  }

  onAcceptDenyCancelEdit(accept: boolean) {
    this.showCancelEditDialog = false;
    if (accept) {
      this.router.navigate(['/admin/users']);
    }
  }

}
