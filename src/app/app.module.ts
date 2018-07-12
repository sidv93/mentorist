import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutes } from "./app.routing";
import { RouterModule, Routes } from "@angular/router";
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/chat.service';
import { AuthService } from './auth.service';
import { MainPageModule } from './main-page-module/main-page.module';
import { LeftPaneComponent } from './chat/left-pane/left-pane.component';
import { RightPaneComponent } from './chat/right-pane/right-pane.component';
import { ConversationComponent } from './chat/left-pane/conversation/conversation.component';
import { TopBarComponent } from './chat/right-pane/top-bar/top-bar.component';
import { MessagingComponent } from './chat/right-pane/messaging/messaging.component';
import { TopNavComponent } from './chat/left-pane/top-nav/top-nav.component';
import { MsgInputComponent } from './chat/right-pane/msg-input/msg-input.component';
import { GlobalService } from './global.service';
import { AuthGuardService } from './auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LeftPaneComponent,
    RightPaneComponent,
    ConversationComponent,
    TopBarComponent,
    MessagingComponent,
    TopNavComponent,
    MsgInputComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutes,
    FormsModule,
    MainPageModule
  ],
  providers: [ChatService,AuthService,GlobalService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
