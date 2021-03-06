import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Game } from '../../models/game';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Answer } from 'src/app/models/answer';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss']
})
export class GameEditComponent implements OnInit, OnDestroy {
  @ViewChild('answerModal', { static: false }) answerModal: ElementRef;

  game: Game = null;
  loading: boolean = false;
  loadingSub: Subscription = this.http.loading.subscribe(
    (data: boolean) => {
      this.loading = data;
    }
  )

  updateName: string = "";


  updateDisplay: string = '';
  updateAccepted1: string = '';
  updateAccepted2: string = '';
  updateAccepted3: string = '';
  answerIndex: number = 0;

  constructor(
    public http: HttpService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.getGameInfo(id)
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }

  getGameInfo(id: string) {
    this.http.editGameInfo(id).subscribe(
      (data: Game) => {
        console.log(data)
        this.game = { ...data };
        this.http.loading.next(false)
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  testEdit() {
    console.log(this.game)
    let originalGame: Game;
    this.http.getOneGame(this.game._id).subscribe(
      (data: Game) => {
        originalGame = data;
        console.log(this.game);
        console.log(originalGame);
        this.http.loading.next(false);
        this.compareGames(this.game, originalGame)
      },
      (err: any) => {
        console.log(err);
        this.http.loading.next(false)
      }
    )
  }

  closeEditAnswersModal() {
    this.answerModal.nativeElement.classList.remove('is-active');
    this.game.answers[this.answerIndex].accepted_values = this.game.answers[this.answerIndex].accepted_values.filter(accepted => accepted.trim() !== "");
  }

  displayAnswerModal(index: number) {
    this.answerIndex = index;
    this.answerModal.nativeElement.classList.add('is-active')
  }

  compareGames(newGame: Game, originalGame: Game) {
    let updateObj = {};
    let keyArr = Object.keys(newGame);
    keyArr.forEach(keyItem => {
      console.log(newGame[keyItem]);
      console.log(originalGame[keyItem]);
      if (newGame[keyItem] !== originalGame[keyItem]) {
        updateObj[keyItem] = newGame[keyItem];
      }
    })
    console.log(updateObj)
    this.http.updateGame(this.game._id, updateObj).subscribe(
      (data: any) => {
        console.log(data);
        this.http.loading.next(false);
        this.router.navigate(['/profile']);
      },
      (err: any) => {
        console.log(err);
        this.http.loading.next(false)
      }
    )
  }

  moveAnswer(up: boolean, index: number) {
    if (up && index > 0) {
      let placeholder = this.game.answers[index];
      this.game.answers[index] = this.game.answers[index - 1];
      this.game.answers[index - 1] = placeholder;
    } else if (!up && index < this.game.answers.length - 1) {
      let placeholder = this.game.answers[index];
      this.game.answers[index] = this.game.answers[index + 1];
      this.game.answers[index + 1] = placeholder;
    }
  }

  addAnswer() {
    console.log(this.updateDisplay, this.updateAccepted1, this.updateAccepted2, this.updateAccepted3)
    if (this.updateDisplay.trim() !== "") {
      if (this.updateAccepted1.trim() !== "" || this.updateAccepted2.trim() !== "" || this.updateAccepted3.trim() !== "") {
        const newAnswer: Answer = new Answer("", []);
        newAnswer.display_value = this.updateDisplay;
        const acceptables = [this.updateAccepted1, this.updateAccepted2, this.updateAccepted3];
        const filled = acceptables.filter(answer => answer !== "");
        filled.forEach(one => newAnswer.accepted_values.push(one));
        console.log(newAnswer)
        this.game.answers.push(newAnswer)
        this.clearAnswer()
      } else {
        // this.missingAnswerInfo()
      }
    } else {
      // this.missingAnswerInfo()
    }
  }

  removeAnswer(index: number) {
    this.game.answers.splice(index, 1);
  }

  clearAnswer() {
    this.updateDisplay = "";
    this.updateAccepted1 = "";
    this.updateAccepted2 = "";
    this.updateAccepted3 = "";
  }
}
