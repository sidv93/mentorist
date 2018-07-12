import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Input() selectedUserName: string;
  @Output() deleteChatEvent= new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  public deleteChat() {
    this.deleteChatEvent.emit('DeleteChat');
  }

}
