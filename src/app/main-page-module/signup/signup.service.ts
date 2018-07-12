import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { SignupModel } from '../../models/signup.model';

@Injectable()
export class SignupService {

  private headers= new Headers();

  constructor(private http: Http) {
  	this.headers.append('Content-Type','application/json;charset=UTF-8');
   }

  public register(signUpObj: SignupModel) {
  	console.log("signup object=" + JSON.stringify(signUpObj));
  	return this.http.post('/api/register',signUpObj,{headers: this.headers}).map((res:Response) => res.json());
  }

  public resendMail(signUpObj: any): Observable<any> {
    console.log("in resend email=" + JSON.stringify(signUpObj));
    return this.http.post('/api/resendMail', signUpObj,{headers: this.headers}).map((res:Response) => res.json());
  }
}
