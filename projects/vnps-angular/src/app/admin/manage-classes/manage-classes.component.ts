import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VnpsClass } from '../../shared/models/interfaces';
import { ApiService } from '../../api/services/api.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'vnps-manage-classes',
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.css']
})
export class ManageClassesComponent implements OnInit {

  deletedClass: VnpsClass;
  vnpsClasses: Array<VnpsClass>;
  showDialog = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.initializeData();
    this.deletedClass = this.vnpsClasses[0];
  }

  levelAdmin(level: string): boolean {
    return this.auth.levelAdmin(level);
  }

  get siteAdmin(): boolean {
    return this.auth.siteAdmin;
  }
  initializeData() {
    const classes = this.route.snapshot.data.classesData;
    if ( this.auth.siteAdmin) {
      this.vnpsClasses = classes;
    } else {
      this.vnpsClasses = classes.filter( (c: VnpsClass) => c.classLevel === this.auth.adminLevel?.level);
    }
    console.log(this.vnpsClasses);
    }

  onDeleteClass(id: string) {
    this.deletedClass = this.vnpsClasses.filter(c => c.classId === id)[0];
    this.showDialog = true;
  }

  onAcceptDenyDelete(accept: boolean) {
    this.showDialog = false;
    if (accept) {
      this.api.delete(`vnpsclasses/${this.deletedClass.classId}`)
        .subscribe((failed) => {
          if (!!failed) {
            alert(`Class ${this.deletedClass.classLevelDesc} deleted.`);
            const delIndex = this.vnpsClasses.indexOf(this.deletedClass);
            this.vnpsClasses.splice(delIndex, 1);
          }
        });
    }
  }
}
