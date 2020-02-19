import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';

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

  usernameValid: boolean = false;
  emailValid: boolean = false;

  passwordLength: boolean = false;
  passwordNumber: boolean = false;
  passwordCapital: boolean = false;

  passwordMatch: boolean = false;

  login: boolean = false;

  constructor(public http: HttpService) { }

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
    const sendObj = {
      email: this.email,
      password: this.password1
    }
    if (this.emailValid && this.passwordLength && this.passwordNumber && this.passwordCapital) {
      console.log('would send login request')
      this.http.loginUser(sendObj).subscribe(
        (data: { token: string }) => {
          console.log(data.token);
          // set token to local storage for retrieval in http service
          localStorage.setItem('time-score-token', JSON.stringify(data.token))
        },
        (err: any) => {
          console.log(err)
        }
      )
    } else {
      console.log('login not valid, would not send request')
    }
  }

  signupAction() {
    const sendObj = {
      username: this.username,
      email: this.email,
      password: this.password1
    }
    if (
      this.emailValid &&
      this.passwordLength &&
      this.passwordNumber &&
      this.passwordCapital &&
      this.passwordMatch &&
      this.usernameValid
    ) {
      console.log('would send sign up request')
    } else {
      console.log('sign up not valid, would not send request')
    }
  }

  usernameValidate() {
    if (this.username.length < 6) {
      return this.usernameValid = false;
    }
    return this.usernameValid = true;
  }

  emailValidate() {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailTest = emailRegEx.test(String(this.email).toLowerCase());
    if (emailTest) {
      return this.emailValid = true
    }
    return this.emailValid = false;
  }

  password1Validate() {
    if (this.password1.length < 6) {
      this.passwordLength = false;
    } else {
      this.passwordLength = true;
    }

    if (this.password1.toLowerCase() === this.password1) {
      this.passwordCapital = false;
    } else {
      this.passwordCapital = true
    }

    const numbers: string[] = '0123456789'.split('');
    let hasNumbers: boolean[] = [];
    numbers.forEach(number => hasNumbers.push(this.password1.includes(number)))
    if (hasNumbers.includes(true)) {
      this.passwordNumber = true;
    } else {
      this.passwordNumber = false;
    }

    this.password2Validate()
  }

  password2Validate() {
    if (this.password1 === this.password2 && this.password1 !== '') {
      return this.passwordMatch = true;
    }
    return this.passwordMatch = false;
  }

}
