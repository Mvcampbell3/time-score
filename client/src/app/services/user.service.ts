import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new BehaviorSubject<boolean>(false);
  userInfo: User;

  constructor() { }

  setUser(successLogin: boolean, userInfo: User): void {
    this.user.next(successLogin);
    this.userInfo = userInfo;
  }

  logOutUser(): void {
    this.user.next(false);
    this.userInfo = null;
  }
}
