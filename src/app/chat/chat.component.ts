import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import * as io from 'socket.io-client';
import { ChatsByUser, Chat, ChatList, Username } from '../models/chat.model';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: []
})
export class ChatComponent implements OnInit {

  
  private socket;
  public newChat: Chat;
  public selectedChat: ChatsByUser;
  public selectedUserName: string;
  public chatList: ChatList[]=[];
  public allChats: ChatsByUser[]=[];
  public allUsers: Username[]= [];

  constructor(private chatService: ChatService, private globalService: GlobalService) { 
    this.socket= this.chatService.getSocket();
  }

  ngOnInit() {
    this.socket.on('msg-back', function (data) {
      console.log('Message from backed=' + JSON.stringify(data));
      if(data.status.toLowerCase() === "success") {
        if(data.sender !== this.globalService.user) {
          //this.getChatsByUser();
          let newChat= new Chat();
          newChat.message= data.message;
          newChat.sender= data.sender;
          newChat.receiver= this.globalService.user;
          this.selectedChat.chats.push(newChat);
          this.chatList.filter(chat=> newChat.sender == chat.email)[0].message= this.getLatestMessage();
        } else {
          console.log("Message sent successfully");
        }
      } else if(data.status.toLowerCase() === "failure") {
        if(data.sender === this.globalService.user) {
          console.log("message not sent");
        }
      }
    }.bind(this));
    this.getAllChats();
    this.getAllUsers();
    // let newChat= new Chat();
    // newChat.sender= "sid@gmail.com";
    // newChat.receiver= "ram@gmail.com";
    // newChat.message= "Hey";
    // this.chatService.sendMessage(newChat);
  }

  public getAllChats() {
    this.chatService.getAllChats(this.globalService.user).subscribe(
      (data) => {
        this.allChats= data.data;
        this.selectedChat= this.allChats[0];
        this.chatService.switchChat(this.globalService.user,this.selectedChat.users.filter(user => user.email != this.globalService.user)[0].email);
        this.allChats.forEach((chat) => {
          let chatListObj= new ChatList();
          chatListObj.firstName= chat.users.filter(user=> user.email != this.globalService.user)[0].firstName;
          chatListObj.lastName= chat.users.filter(user=> user.email != this.globalService.user)[0].lastName;
          chatListObj.message= chat.chats[chat.chats.length-1].message;
          chatListObj.timestamp= chat.chats[chat.chats.length-1].timestamp;
          chatListObj.email= chat.users.filter(user=> user.email != this.globalService.user)[0].email;
          this.chatList.push(chatListObj);
        });
        this.selectedUserName= this.selectedChat.users.filter(user=> user.email != this.globalService.user)[0].firstName
        + " " + this.selectedChat.users.filter(user=> user.email != this.globalService.user)[0].lastName;
      }
    )
  }

  public getAllUsers() {
    this.chatService.getAllUsers().subscribe(
      (data)=> {
        this.allUsers= data.data;
        console.log("All users=" + JSON.stringify(this.allUsers));
      }
    )
  }

  public sendMessage(message: string) {
    let chatObj = new Chat();
    chatObj.message = message;
    chatObj.sender = this.globalService.user;
    chatObj.receiver = this.selectedChat.users.filter(user=> user.email != this.globalService.user)[0].email;
    this.chatService.sendMessage(chatObj);
    // this.getChatsByUser();
    this.selectedChat.chats.push(chatObj);
    this.chatList.filter(chat=> chatObj.receiver == chat.email)[0].message= this.getLatestMessage();
  }

  public getChatsByUser() {
    let receiver= this.selectedChat.users.filter(user=> user.email!=this.globalService.user)[0].email;
    this.chatService.getChatsByUser(this.globalService.user, receiver).subscribe(
      (data)=> {
        this.selectedChat= data.data;
        this.chatList.filter(chat=> receiver == chat.email)[0].message= this.getLatestMessage();
      },
      (error) => {
        this.selectedChat.chats=[];
      }
    )
  }

  public changeSelectedChat(chatSelected: string) {
    this.selectedChat= this.allChats.filter(chats=> chats.users.filter(user=> user.email == chatSelected)[0])[0];
    this.selectedUserName= this.selectedChat.users.filter(user=> user.email != this.globalService.user)[0].firstName
    + " " + this.selectedChat.users.filter(user=> user.email != this.globalService.user)[0].lastName;
    this.chatService.switchChat(this.globalService.user,this.selectedChat.users.filter(user => user.email != this.globalService.user)[0].email);
  }

  public getLatestMessage(): string {
    return this.selectedChat.chats[this.selectedChat.chats.length-1].message;
  }

  public openNewChat(newChats: string) {
    let user: Username= this.allUsers[this.allUsers.length-1];
    console.log("adding new chat="+ JSON.stringify(user));
    let newChat= new ChatList();
    newChat.firstName= user.firstName;
    newChat.lastName= user.lastName;
    newChat.email= user.email;
    newChat.message= "hi";
    this.chatList.push(newChat);
    let chat= new ChatsByUser();
    let newUser= new Username();
    newUser.email= "siddhuv93@gmail.com";
    newUser.firstName= "Siddharth";
    newUser.lastName= "Venkatesh" ;
    chat.users=[];
    chat.users.push(newUser);
    newUser= new Username();
    newUser.email= "sid@gmail.com";
    newUser.firstName= "sid";
    newUser.lastName= "ven";
    chat.users.push(newUser);
    let chats= new Chat();
    chats.message="hi";
    chats.receiver= "siddhuv93@gmail.com";
    chats.sender= "sid@gmail.com";
    chat.chats=[];
    chat.chats.push(chats);

    this.allChats.push(chat);
    this.selectedChat= chat;
  }

  public deleteChatFunc(event: string) {
    let dataToSend= {
      "requester": this.globalService.user,
      "requested": this.selectedChat.users.filter(user=> this.globalService.user != user.email)[0].email
    }
    this.chatService.clearConversation(dataToSend).subscribe(
      (data)=> {
        console.log("data=" + JSON.stringify(data.data));
        this.getChatsByUser();
      },
      (error) => {
        console.log("error=" +JSON.stringify(error));
      }
    )
  }
}