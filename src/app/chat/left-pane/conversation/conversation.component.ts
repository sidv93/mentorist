import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '../../../global.service';
import { Chat,ChatsByUser, ChatList } from '../../../models/chat.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  public selectedChat: ChatsByUser;
  public selectedUserName: string;
  @Input() chatList:ChatList[];
  @Output() switchChat= new EventEmitter<string>();
  
  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    console.log("chats in conversation=" + JSON.stringify(this.chatList));
  }

  public getUsername(users: string[]) {
    return users.filter(user=>this.globalService.user != user)[0];
  }

  public changeSelectedChat(chatSelected: string) {
    this.switchChat.emit(chatSelected);
  }
}
