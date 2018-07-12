import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-msg-input',
  templateUrl: './msg-input.component.html',
  styleUrls: ['./msg-input.component.css']
})
export class MsgInputComponent implements OnInit {

  @Output() sendMessageEvent= new EventEmitter<string>();
  public messageToBeSent: string;
  
  constructor() { }

  ngOnInit() {
  }

  public sendMessage() {
    this.sendMessageEvent.emit(this.messageToBeSent);
    this.messageToBeSent= "";
  }

}
