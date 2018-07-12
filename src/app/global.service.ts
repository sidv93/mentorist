import { Injectable } from '@angular/core';
import { SignupModel } from './models/signup.model';

@Injectable()
export class GlobalService {

  constructor() { }

  public loggedInUser: boolean= false;
  public user: string;
  public emailVerfication: boolean= false;
  public signupData: SignupModel;

  public setSignupData(signupData: SignupModel) {
    this.signupData= signupData;
  }

  public getSignupData() {
    return this.signupData;
  }
}
