import { Component, OnInit } from '@angular/core';
import { SignupModel } from '../../models/signup.model';
import { SignupService } from './signup.service';
import { GlobalService } from '../../global.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

	public signupObj: SignupModel;
	public confirmPassword: string;

  	constructor(private signupService: SignupService, public globalservice:GlobalService) {
			this.signupObj = new SignupModel(); 
  	}

	ngOnInit() {
	  }

	public signup() {
		console.log("form data=" + JSON.stringify(this.signupObj));
		this.signupService.register(this.signupObj).subscribe(
			(data) => {
				console.log("response=" + JSON.stringify(data));
				alert("Signup success=" + data.data);
				this.globalservice.emailVerfication = true;
				this.globalservice.setSignupData(this.signupObj);
			},
			(error) => {
				console.log("error=" + JSON.stringify(error));
				alert("Signup failure=" + error.json().error);
			}
		)
	}
}
