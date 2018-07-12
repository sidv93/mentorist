import { Component, OnInit } from '@angular/core';
import { SignupModel } from '../../models/signup.model';
import { GlobalService } from '../../global.service';
import { SignupService } from '../signup/signup.service';

@Component({
  selector: 'app-registration-landing',
  templateUrl: './registration-landing.component.html',
  styleUrls: ['./registration-landing.component.css']
})
export class RegistrationLandingComponent implements OnInit {

  private signupData: SignupModel;

  constructor(private globalService: GlobalService, private signupService: SignupService) { }

  ngOnInit() {
  }

  public resendMail() {
    this.signupData= this.globalService.getSignupData();
    let dataToSend= {
      "email": this.signupData.email,
      "firstName": this.signupData.firstName,
      "lastName": this.signupData.lastName
    };
    this.signupService.resendMail(dataToSend).subscribe(
      (data)=> {
        console.log("response=" + data.data);
        alert("email sent");
      },
      (error) => {
        console.log("Error="+ JSON.stringify(error));
      }
    );
  }
}
