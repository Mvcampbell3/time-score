import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('loginModal', { static: true }) loginModal: ElementRef;

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

  login: boolean = true;

  loginModalTitle: string;
  loginModalSubtitle: string;
  loginModalBodyMsgs: string[]


  loading: boolean;
  loadingSub: Subscription = this.http.loading.subscribe(
    (data: boolean) => {
      this.loading = data;
    },
    (err: any) => {
      console.log(err)
    }
  )

  constructor(public http: HttpService, public userServive: UserService, public router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
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

  /* To Do:
    Incorperate Http Loader observable and app-loader

    Login success
      redirect to homepage
      set user service info to logged in user

    Sign up success
      launch modal explaining successful signup
      explain must login
      switch form to login
      values will still be in inputs

    Handle Failures with Modal, on screen elements?

    Error and Success display
    Make modal display condiditonal information
  */

  loginAction() {
    const sendObj = {
      email: this.email,
      password: this.password1
    }
    if (this.emailValid && this.passwordLength && this.passwordNumber && this.passwordCapital) {
      console.log('would send login request')
      this.http.loginUser(sendObj).subscribe(
        (data: { token: string, userInfo: User }) => {
          // set token to local storage for retrieval in http service
          localStorage.setItem('time-score-token', JSON.stringify(data.token))
          this.userServive.setUser(true, data.userInfo)
          this.http.loading.next(false);
          this.router.navigate(['/']);

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
      this.http.createUser(sendObj).subscribe(
        (data: any) => {
          console.log(data)
          this.http.loading.next(false)
          this.login = true;
          // Display create success modal which tells user that they were created, need to login

          this.loginModalTitle = 'Successful Signup!';
          this.loginModalSubtitle = 'Congratulations';
          this.loginModalBodyMsgs = [
            'You have Successfully signed up here at Time Score.',
            'The only step left is to login to your account.',
            'Your account information is saved in your browser for 1 week at a time.',
            'Have fun!'
          ]

          this.showModal();
        },
        (err: any) => {
          console.log(err)
          this.http.loading.next(false)
        }
      )
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

  closeModal() {
    this.loginModal.nativeElement.classList.remove('is-active');
  }

  showModal() {
    this.loginModal.nativeElement.classList.add('is-active');
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
