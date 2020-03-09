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
  grabUserHighScores() {
    console.log('running grab user highscores')

  }

}
