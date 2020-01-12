import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-camping-registration',
  templateUrl: './camping-registration.component.html',
  styleUrls: ['./camping-registration.component.scss']
})
export class CampingRegistrationComponent implements OnInit {
public campingForm: FormGroup;
public accompanyNameControls: FormArray;
public states =[];
public numberofguests: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.states= route.snapshot.data.states;
    // add blank decription.
    // this.states.unshift({stateCode:'',description:'Select a State'});
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm(){
    this.campingForm = this.formBuilder.group({
      email: this.formBuilder.control(null ,[Validators.required, Validators.email]),
      fullname: this.formBuilder.control(null,[Validators.required]),
      address: this.formBuilder.control(null,[Validators.required]),
      city: this.formBuilder.control(null,[Validators.required]),
      state: this.formBuilder.control(null,[Validators.required]),
      zipcode: this.formBuilder.control(null,[Validators.required]),
      countrycode: this.formBuilder.control(null,[Validators.required]),
      guests: this.formBuilder.control(0),
      accompanyNames: this.formBuilder.array([ ])
    });
    this.campingForm.controls.state.patchValue(this.states[0].stateCode);
    this.accompanyNameControls = this.campingForm.get('accompanyNames') as FormArray;
  }
    // convenience getter for easy access to form fields. Good for form validation.
    get f() { return this.campingForm.controls; }

    // convenience getter for easy access to form values. Good for submit.
    get formValue() { return this.campingForm.value;}

    onSubmitForm(){
      console.log(this.formValue);
    }
    onAddAccompanyName(){
      this.accompanyNameControls.push(this.formBuilder.control(null));
        // set the selected value
        this.campingForm.controls.guests.patchValue(this.accompanyNameControls.controls.length);
    }
    onRemoveAccompanyName(index){
      this.accompanyNameControls.removeAt(index);
        // set the selected value
        this.campingForm.controls.guests.patchValue(this.accompanyNameControls.controls.length);
    }
    adjustGuestsList(event){
      if( event < this.accompanyNameControls.controls.length ){
        const guestCount = this.accompanyNameControls.controls.length;
        for (let i = guestCount; i >= event; i--){
          this.accompanyNameControls.removeAt(i);
        }
      }
      else {
        for( let i = this.accompanyNameControls.controls.length; i < event; i++){
          this.onAddAccompanyName();
        }
      }
    }
    onResetForm(){
      this.campingForm.reset();
    }
}
