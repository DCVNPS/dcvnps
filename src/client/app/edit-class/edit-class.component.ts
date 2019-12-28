import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { PhotoClass } from '../models/photo-class';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']
})
export class EditClassComponent implements OnInit {
  public mClasses: Array<any> = [];
  public classForm: FormGroup;
  public selectForm: FormGroup;
  public currentClass: PhotoClass;
  public showEdit: boolean = false;
  public tinyCurriculumInit = {
    plugins: 'fullscreen image media link insertdatetime advlist lists wordcount imagetools',
    // tslint:disable-next-line: max-line-length
    toolbar: 'formatselect | bold italic forecolor backcolor permanentpen formatpainter | link image media| alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent',
    height: 500
  };
  public tinyInstructorsInit = {
    plugins: 'fullscreen image media link insertdatetime advlist lists wordcount imagetools',
    // tslint:disable-next-line: max-line-length
    toolbar: 'formatselect | bold italic forecolor backcolor permanentpen formatpainter | link image media| alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent',
    height: 200
  };
  constructor(private formBuilder: FormBuilder, private api: ApiService) {
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm(){
    this.api.get('photoclassmenu')
      .subscribe(data => {
        this.mClasses = data;
        // console.log(this.mClasses);
      },
        err => {
          console.log(err);
        });
        this.classForm = this.formBuilder.group({
          description: this.formBuilder.control(null),
          prerequisite: this.formBuilder.control(null),
          curriculum: this.formBuilder.control(null),
          instructors: this.formBuilder.control(null)
        });
        this.selectForm = this.formBuilder.group({
          selectClass: this.formBuilder.control(null)
        });    
  }

  // convenience getter for easy access to form fields. Good for form validation.
  get f() { return this.classForm.controls; }

  // convenience getter for easy access to form values. Good for submit.
  get formValue() { return this.classForm.value; }

  //Nice thing of Angular 6 and above. We can patch control's value.
  patchClassValues(classData) {
    this.classForm.controls.description.patchValue(classData.classDescription);
    this.classForm.controls.prerequisite.patchValue(classData.prerequisite);
    this.classForm.controls.curriculum.patchValue(classData.curriculum);
    this.classForm.controls.instructors.patchValue(classData.instructors);
  }
  onClassChange(event) {
    // const apiEnpoint = `classes/bylevel/${event.level}`;
    const apiEnpoint = `classes/byid/${event.id}`;
    // console.log(apiEnpoint);
    this.api.get(apiEnpoint)
      .subscribe(data => {
        this.currentClass = data[0];
        this.patchClassValues(this.currentClass);
        this.showEdit = true;
        // console.log(this.formValue);
      },
        error => {
          console.log(error);
        });
  }

  onSubmitClass() {
    this.currentClass.classDescription = this.formValue.description;
    this.currentClass.prerequisite = this.formValue.prerequisite;
    this.currentClass.curriculum = this.formValue.curriculum;
    this.currentClass.instructors = this.formValue.instructors;
    // console.log(this.formValue);
    this.api.put('classes', this.currentClass)
      .subscribe(success => {
        // console.log('update class successful');
      },
        error => {
          console.log(error);
        })
  }

  onCancel() {
    this.classForm.reset();
    this.showEdit = false;
  }
}
