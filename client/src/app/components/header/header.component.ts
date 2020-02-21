import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpService } from 'src/app/services/http.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  loggedInUser: boolean = false;
  loggedKnown: boolean = false;

  @ViewChild('navBurger', { static: true }) navBurger: ElementRef;
  @ViewChild('navMenu', { static: true }) navMenu: ElementRef;

  constructor(public userService: UserService, public http: HttpService) { }

  ngOnInit() {
    this.checkAuth()
    this.userService.user.subscribe(
      (data: boolean) => {
        this.loggedInUser = data;
        this.loggedKnown = true;
      },
      (err: any) => {
        this.loggedKnown = false;
      }
    )
  }

  ngOnDestroy() {
    this.userService.user.unsubscribe();
  }

  shutNavMobile() {
    this.navBurger.nativeElement.classList.remove('is-active');
    this.navMenu.nativeElement.classList.remove('is-active');
  }

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }

  checkAuth() {
    // Might have to set this to user bool, not bs so it wont re run everytime user changes
    // checking with user info works, move to app.component?
    console.log(this.userService.userInfo)
    if (this.userService.userInfo === null) {
      console.log('running token check')
      this.http.checkToken().subscribe(
        (data: { savedTokenValid: boolean, userInfo: User }) => {
          console.log(data)
          this.userService.setUser(data.savedTokenValid, data.userInfo);
        },
        (err: any) => {
          console.log(err)
        }
      )
    } else {
      console.log('user was already logged in')
    }
  }

  logoutUser() {
    this.userService.logOutUser()
  }

}
