import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Announcement } from '../../../shared/models/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../api/services/api.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'vnps-announcement-edit',
  templateUrl: './announcement-edit.component.html',
  styleUrls: ['./announcement-edit.component.css']
})
export class AnnouncementEditComponent implements OnInit {

  // tslint:disable-next-line: ban-types
  tinyEditAncmntInit: Object;
  title: string;
  content: string;
  postedBy: string;
  postdDate: Date;
  announcement: Announcement;
  ancmtForm: FormGroup;
  showDialog = false;

  private componentDirty = false;
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  initializeComponent() {
    this.announcement = this.route.snapshot.data.announcements[0];
    // console.log(this.announcement);
    this.tinyEditAncmntInit = {
      plugins: 'fullscreen image media link insertdatetime advlist lists wordcount imagetools',
      // tslint:disable-next-line: max-line-length
      toolbar: 'formatselect | bold italic forecolor backcolor permanentpen formatpainter | link image media| alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent',
      height: 400
    };
    this.buildForm();
  }

  buildForm() {
    this.ancmtForm = this.formBuilder.group({
      title: this.formBuilder.control(this.announcement.title || null),
      content: this.formBuilder.control(this.announcement.content || null)
    });
  }

  get formControls() { return this.ancmtForm.controls; }

  get formValues() { return this.ancmtForm.value; }

  get isDirty(): boolean { return this.componentDirty; }

  saveAnnouncement(): void {
    if ( this.ancmtForm.dirty && this.ancmtForm.valid ) {
      this.announcement.title = this.formValues.title;
      this.announcement.content = this.formValues.content;
      this.componentDirty = false;
      // console.log(this.announcement);
      this.api.put('announcements', this.announcement )
      .subscribe( () => this.onSaveComplete());
    } else if ( !this.ancmtForm.dirty ) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.ancmtForm.reset();
    this.router.navigate(['/admin/announcements']);
  }

  onCancelEdit() {
    this.componentDirty = this.ancmtForm.dirty;
    this.router.navigate(['/admin/announcements']);
  }

  onDelAnnouncement() {
    this.showDialog = true;
  }

  onAcceptDenyDelete(accept: boolean) {
    this.showDialog = false;
    if (accept) {
      // alert(`Annoucement: <${this.announcement.title}> deleted.`);
      this.api.delete(`announcements/${this.announcement.announcementId}`)
        .subscribe((failed) => {
          if (!!failed) {
            this.onSaveComplete();
          }
        });
    }
  }

}
