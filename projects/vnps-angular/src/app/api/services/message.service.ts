import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  private acceptDenied = false;

  constructor() {
    this.acceptDenied = false;
  }

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  get AcceptDenied(): boolean {
    return this.acceptDenied;
  }

  set AcceptDenied(answer: boolean) {
    if (answer) {
      this.acceptDenied = answer;
    }
  }
}
