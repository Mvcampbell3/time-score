export class User {
  public email: string;
  public id: string;
  public username: string;

  constructor(email: string, id: string, username: string) {
    this.email = email;
    this.id = id;
    this.username = username;
  }
}

export default User;