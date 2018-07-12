import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { ChatsByUser,Chat } from '../models/chat.model';

@Injectable()
export class ChatService {

  private socket: SocketIOClient.Socket;
  public headers = new Headers(); 

  constructor(private http: Http) { 
  	this.socket = io('http://localhost:3000');
    this.headers.append('Content-Type','application/json;charset=UTF-8');
  }

  public getSocket() {
    return this.socket;
  }

  public sendMessage(newChat: Chat) {
  	console.log("emitting eventfor " + newChat.sender);
  	this.socket.emit('chat-msg',newChat);
  }

  public getAllChats(userId: string) {
  	console.log("User Id=" + userId);
  	return this.http.get('/api/getAllChatsByUser/' + userId,{headers:this.headers}).map((res) => res.json());
  }

  public getAllUsers() {
    return this.http.get('/api/getAllUsers').map((res) => res.json());
  }

  public saveChat(chatObj: Chat) {
  	console.log("Sending chat to backend=" + JSON.stringify(chatObj));

  	return this.http.post('/api/saveChat',chatObj,{headers: this.headers}).map((res) => res.json());
  }

  public getChatsByUser(requester: string,requested: string) {
    console.log("getchat");
    return this.http.get('/api/getSelectedChat/'+requester+'/'+requested,{headers: this.headers}).map((res) => res.json());
  }

  public switchChat(user1:string, user2: string) {
    let chatRoomName= user1>user2?user1+user2:user2+user1;
    console.log("chatRoomName =" + chatRoomName);
    this.socket.emit('switch-chat',chatRoomName);
  }

  public clearConversation(toSend: any) {
    console.log("to delete=" + JSON.stringify(toSend));
    return this.http.put('/api/clearConversation', toSend, {headers: this.headers}).map((res:Response) => res.json());
  }
}
