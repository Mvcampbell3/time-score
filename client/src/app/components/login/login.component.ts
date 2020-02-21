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

  loginAction() {

    if (this.emailValid && this.passwordLength && this.passwordNumber && this.passwordCapital) {
      const sendObj = {
        email: this.email,
        password: this.password1
      };
      console.log('would send login request')
      this.http.loginUser(sendObj).subscribe(
        (data: { token: string, userInfo: User }) => {
          localStorage.setItem('time-score-token', JSON.stringify(data.token))
          this.userServive.setUser(true, data.userInfo)
          this.http.loading.next(false);
          this.router.navigate(['/']);

        },
        (err: any) => {
          console.log(err);
          this.http.loading.next(false);
          this.populateModal('Login Failure', "Uh Oh!", [
            'Your login attempt failed!',
            'Check the spelling of your email and/or password and try again'
          ])

          this.showModal();
        }
      )
    } else {
      console.log('login not valid, would not send request')
    }
  }

  signupAction() {
    if (
      this.emailValid &&
      this.passwordLength &&
      this.passwordNumber &&
      this.passwordCapital &&
      this.passwordMatch &&
      this.usernameValid
    ) {
      console.log('would send sign up request');
      const sendObj = {
        username: this.username,
        email: this.email,
        password: this.password1
      };
      this.http.createUser(sendObj).subscribe(
        (data: any) => {
          // data can contain dupicate prop which means there was a duplicate email and/or username already in db;
          this.http.loading.next(false)

          console.log(data)
          if (!data.duplicate) {
            // Successful User Creation
            this.login = true;

            this.populateModal('Successful Signup', "Congratualtions", [
              'You have Successfully signed up here at Time Score.',
              'The only step left is to login to your account.',
              'Your account information is saved in your browser for 1 week at a time.',
              'Have fun!'
            ])

            this.showModal();
          } else {
            // Failed User Creation because of dup email/username
            let msgArrDB = [];
            data.username > 0 ? msgArrDB.push('That username is already in use!') : null;
            data.email > 0 ? msgArrDB.push('That email is already in use!') : null;
            this.populateModal('Unsuccessful Signup', "Uh Oh!", msgArrDB)

            this.showModal();
          }
        },
        (err: any) => {
          console.log(err)
          // Failed User Creation for another reason
          this.http.loading.next(false);
          this.populateModal('Unsuccessful Sign Up', 'Uh Oh!', ['Something went wrong, please try again!'])
          this.showModal()
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

  populateModal(title, subtitle, msgArr) {
    this.loginModalTitle = title;
    this.loginModalSubtitle = subtitle;
    this.loginModalBodyMsgs = msgArr;
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
