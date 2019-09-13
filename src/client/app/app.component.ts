import { Component, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';
import { pureFunction5 } from '@angular/core/src/render3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'dcvnps';

  // This works with Ctl+pureFunction5. Not a good solution
  // @HostListener("window:beforeload",["$event"]) clearLocalStorage(event){
  //   if(this.auth.isLogin) {
  //     this.auth.logout();
  //   }
  // }
  constructor(private auth: AuthService) { }

  ngOnDestroy() {
  }
}
