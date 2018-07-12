import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { MainPageComponent } from './main-page-module/main-page/main-page.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuardService } from './auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'api/verifyEmail/:email',
    component: ChatComponent
  }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);


