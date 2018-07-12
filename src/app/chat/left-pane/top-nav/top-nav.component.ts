import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  @Output() openNewChatEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  public openNewChatFunc() {
    console.log("in open new chat");
    this.openNewChatEvent.emit("openNewChat");
  }
}
