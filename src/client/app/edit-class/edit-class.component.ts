import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { VnpsClass } from '../models/vnps-class';
import { map } from 'rxjs/operators';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']
})
export class EditClassComponent implements OnInit {
  public mClasses: Array<any> = [];
  public classForm: FormGroup;
  public selectForm: FormGroup;
  public currentClass: VnpsClass;
  public editClass: boolean = false;
  public addClass: boolean = false;
  public subHeader: string = "";
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
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.editClass = false;
    this.addClass = false;
    this.currentClass = undefined;
    this.api.get('commons/vnpsclassmenu')
      .subscribe(data => {
        this.mClasses = data;
        // this.mClasses.unshift({id:"",description:"Select a Class to Edit"});
        // console.log(this.mClasses);
      },
        err => {
          console.log(err);
        });
    this.selectForm = this.formBuilder.group({
      selectClass: this.formBuilder.control(null)
    });
    this.classForm = this.formBuilder.group({
      level: this.formBuilder.control(null),
      levelDesc: this.formBuilder.control(null),
      description: this.formBuilder.control(null),
      prerequisite: this.formBuilder.control(null),
      curriculum: this.formBuilder.control(null),
      instructors: this.formBuilder.control(null)
    });
  }

  // convenience getter for easy access to form fields. Good for form validation.
  get f() { return this.classForm.controls; }

  // convenience getter for easy access to form values. Good for submit.
  get formValue() { return this.classForm.value; }

  get sf() { return this.selectForm.controls; }

  //Nice thing of Angular 6 and above. We can patch control's value.
  patchClassValues(classData) {
    // this.classForm.controls.level.patchValue(classData.classLevel);
    // this.classForm.controls.levelDesc.patchValue(classData.classLevelDesc);
    this.classForm.controls.description.patchValue(classData.classDescription);
    this.classForm.controls.prerequisite.patchValue(classData.prerequisite);
    this.classForm.controls.curriculum.patchValue(classData.curriculum);
    this.classForm.controls.instructors.patchValue(classData.instructors);
  }

  onClassChange(event) {
    if (event) {
      this.editClass = true;
      this.addClass = false;
      const classMenuItem = this.mClasses.find( c => c.id === event);
      this.subHeader = `Edit ${classMenuItem.description}`;
      // const apiEnpoint = `classes/bylevel/${event.level}`;
      const apiEnpoint = `vnpsclasses/byid/${classMenuItem.id}`;
      // console.log(apiEnpoint);
      this.api.get(apiEnpoint)
        .subscribe(async data => {
          console.log(data);
          this.currentClass = await data[0];
          if (!this.addClass) {
            this.patchClassValues(this.currentClass);
          }
          // console.log(this.formValue);
        },
          error => {
            console.log(error);
          });
    }
  }

  onSaveClass() {
    if (this.addClass) {
      this.currentClass.classLevel = this.formValue.level;
      this.currentClass.classLevelDesc = this.formValue.levelDesc;
    }
    this.currentClass.classDescription = this.formValue.description;
    this.currentClass.prerequisite = this.formValue.prerequisite;
    this.currentClass.curriculum = this.formValue.curriculum;
    this.currentClass.instructors = this.formValue.instructors;
    if (!this.addClass) {
      // console.log(this.formValue);
      this.api.put('vnpsclasses', this.currentClass)
        .subscribe(success => {
          // console.log('update class successful');
          this.onCancel();
        },
          error => {
            console.log(error);
          });
    } else {
      this.api.post('vnpsclasses', this.currentClass)
        .subscribe(success => {
          // console.log('update class successful');
          // this.mClasses.unshift({'id':this.currentClass.classId, 'description':this.currentClass.classLevelDesc });
          this.buildForm();
        },
          error => {
            console.log(error);
          });
    }
  }

  onAddClass() {
    this.currentClass = new VnpsClass();
    this.addClass = true;
    this.editClass = true;
    this.subHeader = "Add New Class";
    this.selectForm.reset();
    this.classForm.reset();
  }

  onDelete(){
    this.api.delete(`vnpsclasses/${this.currentClass.classId}`)
    .subscribe(
      success =>{
        console.log(`class ${this.currentClass.classLevelDesc} deleted`);
        // const classMenuItem = this.mClasses.find( c => c.id === this.currentClass.classId);
        // const remIndx = this.mClasses.indexOf(classMenuItem);
        // this.mClasses.splice(remIndx,1);
        // this.onCancel();
        this.buildForm();
    },
      error  => { console.log(error);}
      );
  }

  onCancel() {
    this.classForm.reset();
    this.selectForm.reset();
    this.editClass = false;
    this.addClass = false;
    this.currentClass = undefined;
  }

  classFormHasValue(){
    console.log(this.formValue);
  }
}
