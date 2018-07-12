import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MainPageComponent } from './main-page/main-page.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DescriptionSmallComponent } from './description-small/description-small.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { LoginService } from "./login/login.service";
import { SignupService } from './signup/signup.service';
import { RegistrationLandingComponent } from './registration-landing/registration-landing.component';

@NgModule({
	declarations: [
		MainPageComponent,
		SignupComponent,
		LoginComponent,
		NavbarComponent,
		CarouselComponent,
		DescriptionSmallComponent,
		HowItWorksComponent,
		RegistrationLandingComponent
	],
	imports: [
		FormsModule,
		CommonModule
	],
	exports: [
		MainPageComponent
	],
	providers: [
		LoginService,
		SignupService
	]
})

export class MainPageModule { }