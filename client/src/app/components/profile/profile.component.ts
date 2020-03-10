import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Profile } from '../../models/profile';
import { Game } from '../../models/game';
import { HighScore } from '../../models/highscore';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('warningModal', { static: false }) warningModal: ElementRef;

  games: Game[] = [];
  highScores: HighScore[] = [];
  userProfile: Profile = null;
  loadedProfile: boolean = false;
  confirmClick: boolean = false;
  warningMessage: string = "";
  warningItem: string = "";
  deleteClicked: boolean = false;

  itemId: string = "";
  op: string = "";
  itemType: string = "";

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
    this.getUserProfile()
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe()
  }

  // In case reloading onto this page, recursive user check
  getUserProfile() {
    this.http.userProfile().subscribe(
      (data: Profile) => {
        this.http.loading.next(false);
        console.log(data);
        this.userProfile = data;
        this.games = data.games;
        this.highScores = data.userData.highScoreArray;
        this.loadedProfile = true;
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  initModal(type, method, id, name) {
    // Type as in Game or HighScore
    // method as in edit or delete
    // id of item being worked on
    this.itemId = id;
    this.itemType = type;
    this.op = method;
    if (type === 'game') {
      // If Game
      if (method === 'edit') {
        // display warning message, asking if they are sure they want to edit game
        this.warningMessage = 'Are you sure you want to edit the following game';
        this.warningItem = name;
        this.deleteClicked = false;

      } else {
        // display warning message, asking if they are sure they want to delete game
        // deleting a game also deletes all highscores associated with the game
        this.warningMessage = 'Are you sure you want to delete the following game';
        this.warningItem = name;
        this.deleteClicked = true;
      }
    } else {
      // only will be able to delete highscore
      // display warning message, asking if they are sure they want to delete highscore
      this.warningMessage = 'Are you sure you want to delete a high score for the following game';
      this.warningItem = name;
      this.deleteClicked = true;
    }
    this.warningModal.nativeElement.classList.add('is-active')
  }

  closeModal() {
    this.warningModal.nativeElement.classList.remove('is-active');
    this.deleteClicked = false;
    this.itemId = "";
    this.op = "";
    this.itemType = "";
  }

  executeMethod() {
    console.log(`would execute ${this.op} on item with id of ${this.itemId}`)
    if (this.itemType === 'highscore' && this.op === 'delete') {
      this.deleteHighscore(this.itemId);
    }
  }

  deleteHighscore(id) {
    this.http.deleteHighscore(id).subscribe(
      (data: any) => {
        this.http.loading.next(false);
        console.log(data);
        this.getUserProfile()
        this.closeModal()
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  deleteGame(id) {

  }

  editGame(id) {

  }
}
