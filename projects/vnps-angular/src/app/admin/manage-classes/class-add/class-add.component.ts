import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api/services/api.service';
import { VnpsClass } from '../../../shared/models/interfaces';

@Component({
  selector: 'vnps-class-add',
  templateUrl: './class-add.component.html',
  styleUrls: ['./class-add.component.css']
})
export class ClassAddComponent implements OnInit {

  level: string;
  levelDesc: string;
  description: string;
  prerequisite: string;
  curriculum: string;
  instructors: string;
  vnpsClass: VnpsClass;
  classForm: FormGroup;
  private componentDirty = false;
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
    private formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.classForm = this.formBuilder.group({
      level: this.formBuilder.control(null, [Validators.required] ),
      levelDesc: this.formBuilder.control(null, [Validators.required] ),
      description: this.formBuilder.control(null, [Validators.required] ),
      prerequisite: this.formBuilder.control(null, [Validators.required] ),
      curriculum: this.formBuilder.control(null, [Validators.required] ),
      instructors: this.formBuilder.control(null, [Validators.required])
    });
  }

  // convenience getter for easy access to form fields. Good for form validation.
  get f() { return this.classForm.controls; }

  // convenience getter for easy access to form values. Good for submit.
  get formValues() { return this.classForm.value; }

  get isDirty(): boolean {
    return this.componentDirty;
  }

  onAddClass() {
    if ( this.classForm.dirty && this.classForm.valid){
      this.vnpsClass = {
        classLevel: this.formValues.level,
        classLevelDesc: this.formValues.levelDesc,
        classDescription: this.formValues.description,
        prerequisite: this.formValues.prerequisite,
        curriculum: this.formValues.curriculum,
        instructors: this.formValues.instructors
      };
      // console.log(this.vnpsClass);
      this.api.post('vnpsclasses', this.vnpsClass)
      .subscribe( (failed) => {
        if (!!failed) {
          this.componentDirty = false;
          this.onSaveComplete();
        }
      });
    }
  }

  onSaveComplete(): void {
    this.classForm.reset();
    this.router.navigate(['/admin/classes']);
  }

  onCancelAddClass() {
    this.componentDirty = this.classForm.dirty;
    this.router.navigate(['/admin/classes']);
    this.classForm.reset();
  }
}
