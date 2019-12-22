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
  private class: any;
  public mClasses: Array<any> =[];
  public classForm: FormGroup;
  public selectClass: FormControl;
  public currentClass: PhotoClass;
  public showEdit: boolean = false;
  public description: string;
  public prerequisite: string;
  public curriculum:string;
  public instructors: string;
  public  tinyCurriculumInit = {
    plugins: 'fullscreen image media link insertdatetime advlist lists wordcount imagetools',
    // tslint:disable-next-line: max-line-length
    toolbar: 'formatselect | bold italic forecolor backcolor permanentpen formatpainter | link image media| alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent',
    height: 500
  };
  public  tinyInstructorsInit = {
    plugins: 'fullscreen image media link insertdatetime advlist lists wordcount imagetools',
    // tslint:disable-next-line: max-line-length
    toolbar: 'formatselect | bold italic forecolor backcolor permanentpen formatpainter | link image media| alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent',
    height: 200
  };
  constructor( private formBuilder: FormBuilder, private api: ApiService) {
    this.selectClass = new FormControl(null);
    this.classForm = new FormGroup({selectClass:this.selectClass});
    // this.initForm();
  }

  ngOnInit() {
      this.api.get('photoclassmenu')
      .subscribe( data => {
        this.mClasses = data;
        // console.log(this.mClasses);
      },
      err => {
        console.log(err);
      });  
  }
  onClassChange(event){
    const apiEnpoint = `photoclasses/${event.level}`;
    // console.log(apiEnpoint);
    this.api.get(apiEnpoint)
    .subscribe( data =>{
      this.currentClass = data[0];
      // console.log(this.currentClass);
      this.description = this.currentClass.classDescription;
      this.prerequisite = this.currentClass.prerequisite;
      this.curriculum = this.currentClass.curriculum;
      this.instructors = this.currentClass.instructors;
      this.showEdit = true;
    }, 
      error =>{
        console.log(error);
      });
  }

  onSave(){
    this.currentClass.classDescription = this.description;
    this.currentClass.prerequisite = this.prerequisite;
    this.currentClass.curriculum = this.curriculum;
    this.currentClass.instructors = this.instructors;
    // console.log(this.currentClass);
    const formData = new FormData();
    formData.append('description', this.description);
    this.api.put('photoclasses',this.currentClass)
    .subscribe( success =>{
      // console.log('update class successful');
    },
    error => {
      console.log(error);
    })
  }
  onCancel(){
    this.showEdit = false;
  }
}
