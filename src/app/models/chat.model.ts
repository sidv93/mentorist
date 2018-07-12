export class ChatsByUser {
	public chats: Chat[];
	public users: Username[];
}

export class Chat {
	public message: string;
	public sender: string;
	public receiver: string;
	public timestamp: string;
	public constructor() { }	
}

export class Username { 
	public firstName: string;
	public lastName: string;
	public email: string;
	public constructor() { }
}

export class ChatList {
	public firstName: string;
	public lastName: string;
	public message: string;
	public timestamp: string;
	public email: string;
	public constructor() { }
}