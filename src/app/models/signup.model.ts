export class SignupModel {
	public firstName: string;
	public lastName: string;
	public dob: string;
	public userId: string;
	public password: string;
	public email: string;
	public mobileNumber: string;
	public profilePicture: string;
	public linkedinUrl: string;
	public isMentor: boolean;
	public field: string;
	public institution: string;
	public qualification: string;
	public areOfInterest: string[];
	public organisation: string;
	public yearsOfExperience: Number;
	public areaOfExpertise: string[];
	public rating: Number[];
	public comments: string[];
	public currentlyMentoring: Number;
	public currentlyMentoringWith: Number;
	public maxStudents: Number;
	public location: Location;
}

export class Location {
	public areaName: string;
	public city: string;
	public state: string;
	public latitude: string;
	public location: string;
}