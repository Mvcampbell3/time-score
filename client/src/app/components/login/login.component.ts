import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  username: string = '';
  password1: string = '';
  password2: string = '';

  login: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  switchForms() {
    this.login = !this.login;
  }

  submitForm() {
    if (this.login) {
      this.loginAction();
    } else {
      this.signupAction()
    }
  }

  loginAction() {

  }

  signupAction() {

  }

}
