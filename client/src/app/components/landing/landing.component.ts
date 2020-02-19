import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import baseballTeams from '../../gameSeeds/baseball';
import footballTeams from '../../gameSeeds/football';
import presidents from '../../gameSeeds/presidents';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import User from 'src/app/models/user';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

  @ViewChild('roller1', { static: true }) roller1: ElementRef;
  @ViewChild('roller2', { static: true }) roller2: ElementRef;
  @ViewChild('roller3', { static: true }) roller3: ElementRef;
  @ViewChild('roller4', { static: true }) roller4: ElementRef;
  @ViewChild('roller5', { static: true }) roller5: ElementRef;
  @ViewChild('roller6', { static: true }) roller6: ElementRef;

  @Output() landingClick: EventEmitter<void> = new EventEmitter;

  rollerContent1: string = 'Theodore Roosevelt';
  rollerContent2: string = 'Tampa Bay Rays';
  rollerContent3: string = 'Atlant Braves';
  rollerContent4: string = 'Tampa Bay Buccaneers';
  rollerContent5: string = 'Kansas City Chiefs';
  rollerContent6: string = 'Thomas Jefferson';

  presidentArray: string[] = [];
  mlbArray: string[] = [];
  nflArray: string[] = [];
  nameChangeTimer: any;

  userLogged: boolean;

  constructor(public http: HttpService, public router: Router, public userService: UserService) { }

  ngOnInit() {
    this.userService.user.subscribe(
      (data: boolean) => {
        console.log(data)
      }
    )
    this.checkAuth();
    this.loadLists();
    this.startNameChangeTimer();
    setTimeout(() => {
      this.rollerRemoveAddClass('a', 'b')
    }, 800)
  }

  ngOnDestroy() {
    if (this.nameChangeTimer) {
      clearInterval(this.nameChangeTimer);
    }
  }

  loadLists() {
    presidents.answers.forEach(president => this.presidentArray.push(president.display_value));
    baseballTeams.answers.forEach(team => this.mlbArray.push(team.display_value));
    footballTeams.answers.forEach(team => this.nflArray.push(team.display_value))
  }

  checkAuth() {
    this.userService.user.subscribe(
      (data: boolean) => {
        if (!data) {
          this.http.checkToken().subscribe(
            (data: { savedTokenValid: boolean, userInfo: User }) => {
              console.log(data)
              this.userService.setUser(true, data.userInfo);
            },
            (err: any) => {
              console.log(err)
            }
          )
        } else {
          console.log('user was already logged in')
        }
      }
    )

  }


  rollerRemoveAddClass(classname1, classname2) {
    this.roller1.nativeElement.classList.remove(`${classname1}-1`)
    this.roller1.nativeElement.classList.add(`${classname2}-1`)
    this.roller2.nativeElement.classList.remove(`${classname1}-2`)
    this.roller2.nativeElement.classList.add(`${classname2}-2`)
    this.roller3.nativeElement.classList.remove(`${classname1}-3`)
    this.roller3.nativeElement.classList.add(`${classname2}-3`)
    this.roller4.nativeElement.classList.remove(`${classname1}-4`)
    this.roller4.nativeElement.classList.add(`${classname2}-4`)
    this.roller5.nativeElement.classList.remove(`${classname1}-5`)
    this.roller5.nativeElement.classList.add(`${classname2}-5`)
    this.roller6.nativeElement.classList.remove(`${classname1}-6`)
    this.roller6.nativeElement.classList.add(`${classname2}-6`)
  }

  startNameChangeTimer() {
    this.nameChangeTimer = setInterval(() => {
      this.rollerContent1 = this.presidentArray[this.randomNumberForArray(this.presidentArray)]
      this.rollerContent2 = this.mlbArray[this.randomNumberForArray(this.mlbArray)];
      this.rollerContent3 = this.mlbArray[this.randomNumberForArray(this.mlbArray)];
      this.rollerContent4 = this.nflArray[this.randomNumberForArray(this.nflArray)];
      this.rollerContent5 = this.nflArray[this.randomNumberForArray(this.nflArray)];
      this.rollerContent6 = this.presidentArray[this.randomNumberForArray(this.presidentArray)];
    }, 2000)
  }

  randomNumberForArray(array: string[]): number {
    return Math.floor(Math.random() * array.length);
  }

  toGamesList() {
    console.log('clicked')
    this.router.navigate(['/gameslist'])
  }
}
