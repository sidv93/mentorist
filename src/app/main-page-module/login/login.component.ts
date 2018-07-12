import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { LoginModel } from '../../models/login.model';
import { Router, RouterModule } from '@angular/router';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginObj: LoginModel;

  constructor(private loginService: LoginService, private route: Router,private globalService: GlobalService) {
    this.loginObj = new LoginModel();
  }

  ngOnInit() {
    console.log('In ng oninit');
  }

  public login() {
    console.log('Login obj=' + JSON.stringify(this.loginObj));
    this.loginService.authenticate(this.loginObj).subscribe(
      data => {
        console.log('Data' + JSON.stringify(data));
        this.globalService.loggedInUser= true;
        this.globalService.user= this.loginObj.userId;
        this.route.navigate(['chat']);
      },
      error => {
        console.log('Error=' + JSON.stringify(error));
        alert('Login failure ' + error.json().error);
      }
    )
  }

}
