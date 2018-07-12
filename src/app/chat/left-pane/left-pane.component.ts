import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatsByUser, ChatList } from '../../models/chat.model';

@Component({
  selector: 'app-left-pane',
  templateUrl: './left-pane.component.html',
  styleUrls: ['./left-pane.component.css']
})
export class LeftPaneComponent implements OnInit {

  @Input() chatList: ChatList[];
  @Output() switchChatEvent= new EventEmitter<string>();
  @Output() openNewChat= new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
  }

  public switchChat(chatName: string) {
    this.switchChatEvent.emit(chatName);
  }

  public openNewChatFunc(newChatEvent: string) {
    console.log(newChatEvent);
    this.openNewChat.emit("newChat");
  }
}
