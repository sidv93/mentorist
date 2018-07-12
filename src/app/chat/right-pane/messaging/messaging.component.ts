import { Component, OnInit, Input } from '@angular/core';
import { Chat, ChatsByUser } from '../../../models/chat.model';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

  @Input() selectedChat: ChatsByUser;
  
  constructor(private globalService: GlobalService) { }

  ngOnInit() {
  }

}
