export class UserRegistration {

  constructor(
      public name: string,
      public email: string,
      public password: string
    ) {  }
}
export interface IUser {
  email: string;
  displayName: string;
  token: string;
}
