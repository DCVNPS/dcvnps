import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']
})
export class EditClassComponent implements OnInit {
  private class: any;
  public classForm: FormGroup;
  public photoClassId: string ='19f27cc9-2153-11ea-812e-08002764505e';
  public description: string = 'Class description';
  public prerequisite: string = 'None';
  public curriculum = `<p><span style="font-size: 14pt;"><strong>Introduction to Digital Single Lens Reflex (DSLR ) cameras</strong></span></p>
<p><span style="font-size: 14pt;"><strong>Triangle Exposure:</strong></span></p>
<ul>
<li><span style="font-size: 14pt;">Aperture</span></li>
<li><span style="font-size: 14pt;">Shutter</span></li>
<li><span style="font-size: 14pt;">ISO</span></li>
</ul>
<p><strong><span style="font-size: 14pt;">File/Image management under Windows Operating System</span></strong></p>
<p><strong><span style="font-size: 14pt;">Introduction to photography composition:</span></strong></p>
<ul>
<li><span style="font-size: 14pt;">Line, Shape, Form, and Texture</span></li>
<li><span style="font-size: 14pt;">Light and Color</span></li>
</ul>
<p><strong><span style="font-size: 14pt;">Montion in Photography</span></strong></p>
<p><strong><span style="font-size: 14pt;">Introduction to RAW image and modern digital darkroom.</span></strong></p>
<p><strong><span style="font-size: 14pt;">Introduction to image editing using Photoshop</span></strong></p>`;
  public instructors: string = '<p><strong><span style="font-size: 14pt;">Minh Tan Thai</span></strong></p>';
  constructor( private formBuilder: FormBuilder) {
    // this.initForm();
  }

  ngOnInit() {
  }

  onSave(){
    const formData = new FormData();
    formData.append('description', this.description);
  }
  onCancel(){

  }
}
