import { Component, OnInit } from '@angular/core';
import { VnpsClass } from '../../../shared/models/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../../api/services/api.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'vnps-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})
export class ClassEditComponent implements OnInit {

  level: string;
  levelDesc: string;
  description: string;
  prerequisite: string;
  curriculum: string;
  instructors: string;
  vnpsClass: VnpsClass;
  classForm: FormGroup;
  private componentDirty = false;
  showDialog = false;
  tinyCurriculumInit = {
    plugins: 'fullscreen image media link insertdatetime advlist lists wordcount imagetools',
    // tslint:disable-next-line: max-line-length
    toolbar: 'formatselect | bold italic forecolor backcolor permanentpen formatpainter | link image media| alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent',
    height: 500
  };
  tinyInstructorsInit = {
    plugins: 'fullscreen image media link insertdatetime advlist lists wordcount imagetools',
    // tslint:disable-next-line: max-line-length
    toolbar: 'formatselect | bold italic forecolor backcolor permanentpen formatpainter | link image media| alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent',
    height: 200
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.initializeData();
    this.buildForm();
  }

  get siteAdmin() {
    return this.auth.siteAdmin;
  }
  get isDirty(): boolean { return this.componentDirty; }

  initializeData() {
    this.vnpsClass = this.route.snapshot.data.classesData[0];
    this.levelDesc = this.vnpsClass.classLevelDesc;
    console.log(this.vnpsClass);
  }

  buildForm() {
    this.classForm = this.formBuilder.group({
      level: this.formBuilder.control(this.vnpsClass.classLevel),
      levelDesc: this.formBuilder.control(this.vnpsClass.classLevelDesc),
      description: this.formBuilder.control(this.vnpsClass.classDescription),
      prerequisite: this.formBuilder.control(this.vnpsClass.prerequisite),
      curriculum: this.formBuilder.control(this.vnpsClass.curriculum),
      instructors: this.formBuilder.control(this.vnpsClass.instructors)
    });
  }

  // convenience getter for easy access to form fields. Good for form validation.
  get f() { return this.classForm.controls; }

  // convenience getter for easy access to form values. Good for submit.
  get formValues() { return this.classForm.value; }

  onSaveClass(): void {
    if (this.classForm.dirty && this.classForm.valid) {
      this.vnpsClass.classLevel = this.formValues.level;
      this.vnpsClass.classLevelDesc = this.formValues.levelDesc;
      this.vnpsClass.classDescription = this.formValues.description;
      this.vnpsClass.prerequisite = this.formValues.prerequisite;
      this.vnpsClass.curriculum = this.formValues.curriculum;
      this.vnpsClass.instructors = this.formValues.instructors;
      // console.log(this.announcement);
      this.api.put('vnpsclasses', this.vnpsClass)
        .subscribe((failed) => {
          if (!!failed) {
            this.componentDirty = false;
            this.onSaveComplete();
          }
        });
    } else if (this.classForm.pristine) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.classForm.reset();
    this.router.navigate(['/admin/classes']);
  }

  onCancelEdit() {
    this.componentDirty = this.classForm.dirty;
    this.classForm.reset();
    this.router.navigate(['/admin/classes']);
  }

  onDeleteClass() {
    this.showDialog = true;
  }

  onAcceptDenyDelete(accept: boolean) {
    this.showDialog = false;
    if (accept) {
      this.api.delete(`vnpsclasses/${this.vnpsClass.classId}`)
        .subscribe((failed) => {
          if (!!failed) {
            alert(`Class ${this.vnpsClass.classLevelDesc} deleted.`);
            this.router.navigate(['/admin/classes']);
          }
        });
    }
  }
}
