import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../api/services/message.service';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vnps-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(
    public messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  get Messages(): string[] {
    return this.messageService.messages;
  }

  get active(): boolean {
    return this.Messages.length > 0;
  }
  onMessageOK() {
    // tslint:disable-next-line: max-line-length
    const thisMsg = this.messageService.messages[0];
    if ( this.authService.isLoggedIn && (thisMsg.indexOf('code 401') > -1 || thisMsg.indexOf('jwt malformed') > -1)) {
      this.authService.logout().subscribe(() => {
        // console.log(this.messageService.messages[0]);
        this.router.navigateByUrl(this.authService.redirectUrl);
      });
    }
    this.messageService.clear();
  }
}
