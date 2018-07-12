import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatsByUser } from '../../models/chat.model';

@Component({
  selector: 'app-right-pane',
  templateUrl: './right-pane.component.html',
  styleUrls: ['./right-pane.component.css']
})
export class RightPaneComponent implements OnInit {

  @Input() selectedUserName: string;
  @Input() selectedChat: ChatsByUser;
  @Output() messageEvent= new EventEmitter<string>();
  @Output() deleteChat= new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  public sendMessage(message: string) {
    this.messageEvent.emit(message);
  }

  public deleteChatFunc(event: string) {
    this.deleteChat.emit('deleteChat');
  }
}
