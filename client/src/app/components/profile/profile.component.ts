import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public http: HttpService, public userService: UserService, public router: Router) { }

  getHighScores: Subscription;

  loading: boolean = false;

  loadingSub: Subscription = this.http.loading.subscribe(
    (data: boolean) => {
      this.loading = data;
    },
    (err: any) => {
      console.log(err);
      // this.loading = false;
    }
  )

  ngOnInit() {
    this.grabUserHighScores()
  }

  // In case reloading onto this page, recursive user check
  // Might have to change user model and push highscores into array on model
  // One call for sure will get you all of the user infomation that will need
  grabUserHighScores() {
    console.log('running grab user highscores')
    if (this.userService.userInfo) {
      console.log('subbing to userService subscription')
      this.getHighScores = this.http.getHighscoresForUser(this.userService.userInfo.id).subscribe(
        (data: any) => {
          console.log(data)
          this.http.loading.next(false);
        },
        (err: any) => {
          console.log(err)
          this.http.loading.next(false);
          this.router.navigate(['/'])
        })
    } else {
      setTimeout(() => {
        this.grabUserHighScores()
      }, 100)
    }
  }

}
