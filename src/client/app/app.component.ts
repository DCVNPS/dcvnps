import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'dcvnps';

  constructor(private auth: AuthService) { }

  ngOnDestroy() {
    this.auth.logout();
  }
}
