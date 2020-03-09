import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(
    public messageService: MessageService, 
    private auth: AuthService,
    private activatedRoute:ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onMessageOK(){
    if(this.messageService.messages && (this.messageService.messages[0].indexOf("code 401") > -1 || this.messageService.messages[0].indexOf('ERROR 1045') > -1)){
      this.auth.logout().subscribe(
        success => {
          if(success){
            this.messageService.clear();
            const curUrl:string = this.activatedRoute['_routerState'].snapshot.url;
            this.router.navigateByUrl(curUrl);        
          }
        }
      )      
    }
    this.messageService.clear();
  }
}
