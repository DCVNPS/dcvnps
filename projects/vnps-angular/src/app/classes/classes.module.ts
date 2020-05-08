import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// import { ClassesRoutingModule } from './classes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ClassComponent } from './class/class.component';
import { ClassesResolverService } from './classes-resolver.service';
import { ClassMenuResolverService } from './class-menu-resolver.service';

const classRoutes: Routes = [
  {
    path: '',
    component: ClassComponent,
    resolve: {
      classesData: ClassesResolverService,
      classMenu: ClassMenuResolverService
    }
  }
];

@NgModule({
  declarations: [ClassComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(classRoutes)
  ]
})
export class ClassesModule { }
