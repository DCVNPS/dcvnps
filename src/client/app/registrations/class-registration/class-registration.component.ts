import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class-registration',
  templateUrl: './class-registration.component.html',
  styleUrls: ['./class-registration.component.scss']
})
export class ClassRegistrationComponent implements OnInit {
  classRegForm: FormGroup;
  public classes = [];
  public states = [];
  public yearLov:Array<number> = [];
  public curYear = (new Date()).getFullYear();
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.getYearLov();
    this.classes = route.snapshot.data.classMenu;
    // this.classes.unshift({ level: '', description: 'Select a Class Level' });
    this.states = route.snapshot.data.states;
    // this.states.unshift({ stateCode: '', description: 'Select a State' });
    this.buildForm();
  }
  ngOnInit() {
  }

  getYearLov(){
    for(let i = this.curYear - 10; i < this.curYear + 10; i++){
      this.yearLov.push(i);
    }
    console.log(this.yearLov);
  }

  buildForm() {
    this.classRegForm = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      surname: this.formBuilder.control(null, [Validators.required]),
      givenname: this.formBuilder.control(null, [Validators.required]),
      phone: this.formBuilder.control(null, [Validators.required, Validators.pattern('^[0-9]{3}-[0-9]{3}-[0-9]{4}$')]),
      address: this.formBuilder.control(null, [Validators.required]),
      city: this.formBuilder.control(null, [Validators.required]),
      state: this.formBuilder.control(null, [Validators.required]),
      zipcode: this.formBuilder.control(null, [Validators.required]),
      countrycode: this.formBuilder.control(null, Validators.required),
      classlevel: this.formBuilder.control(null, [Validators.required]),
      year: this.formBuilder.control(null,[Validators.required])
    });
    this.classRegForm.controls.state.patchValue(this.states[0].stateCode);
    this.classRegForm.controls.classlevel.patchValue(this.classes[0].level);
  }
  // convenience getter for easy access to form fields. Good for form validation.
  get f() { return this.classRegForm.controls; }

  // convenience getter for easy access to form values. Good for submit.
  get formValue() { return this.classRegForm.value; }

  onResetForm() {
    this.classRegForm.reset();
    this.classRegForm.controls.state.patchValue(this.states[0].stateCode);
    this.classRegForm.controls.classlevel.patchValue(this.classes[0].level);
  }
  onSubmitForm(){
    console.log(this.formValue);
  }
}
