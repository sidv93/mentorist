import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable()
export class AuthService {

  constructor(private globalService: GlobalService) { }

  public isAuthenticated(): boolean {
    // const token = localStorage.getItem('token');
    return this.globalService.loggedInUser
  }

  public saveUser(user: string) {
    localStorage.setItem('user', user);
  }

  public logout() {
    localStorage.removeItem('user');
  }
}
