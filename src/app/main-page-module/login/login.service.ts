import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {LoginModel} from "../../models/login.model";


@Injectable()
export class LoginService {

  public headers = new Headers();

  constructor(private http: Http) {
  	this.headers.append('Content-Type','application/json;charset=UTF-8');
  }

  public authenticate(loginObj: LoginModel) {
  	console.log("login object=" + JSON.stringify(loginObj));
  	return this.http.post('/api/authenticate',JSON.stringify(loginObj), {headers : this.headers}).map((res:Response) =>res.json());
  }
}
