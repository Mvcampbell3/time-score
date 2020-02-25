import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Game } from '../../models/game';
import { Answer } from '../../models/answer';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})

export class GamePageComponent implements OnInit, OnDestroy {
  @ViewChild('gameInput', { static: false }) gameInputEl: ElementRef;
  @ViewChild('endGameModal', { static: false }) endGameModal: ElementRef;
  @Output() back: EventEmitter<void> = new EventEmitter;

  game: Game;
  guess: string;
  timer: any;
  time: number = 60;
  scoreGame: number = 0;
  play: boolean = true;
  firstLoad: boolean = true;
  ongoing: boolean = false;

  loading: boolean;

  loadingSub: Subscription = this.http.loading.subscribe(
    (data: boolean) => {
      this.loading = data;
    }
  );

  constructor(
    public http: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.getGameFromDB(id);
  }

  getGameFromDB(id) {
    this.http.getOneGame(id).subscribe(
      (data: Game) => {
        console.log(data);
        this.game = data;
        this.game.answers = this.game.answers.map(answer => new Answer(answer.display_value, answer.accepted_values))
        console.log(this.game.answers)
        this.http.loading.next(false);
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
    this.game = null;
    this.resetGame()
  }

  clearGameAnswers() {

  }

  startGame() {
    this.ongoing = true;
    if (this.firstLoad) {
      this.firstLoad = false;
      this.initTimer()
    } else {
      this.game.answers.forEach(answer => answer.guessed = false);
      this.resetGame()
      this.initTimer()
    }

  }

  resetGame() {
    this.time = 60;
    this.play = true;
    this.guess = '';
    clearInterval(this.timer)
  }

  leaveGame() {
    this.clearGameAnswers();
    this.game = null;
    this.resetGame()
    this.back.emit();
  }

  initTimer() {
    this.gameInputEl.nativeElement.disabled = false;
    this.gameInputEl.nativeElement.focus()
    this.timer = setInterval(() => {
      if (this.time <= 0) {
        clearInterval(this.timer);
        this.gameOver()
      } else {
        this.time--
      }
    }, 1000)
  }

  evaluateInput() {
    const answerArr: Answer[] = this.game.answers.filter(answer => answer.guessed === false);
    console.log(answerArr)
    let wasRight: boolean = false;
    answerArr.forEach((item: Answer) => {
      const rightTeam: boolean = item.checkAnswer(this.guess.trim().toLowerCase());
      if (rightTeam && wasRight === false) {
        wasRight = true
      }
    })
    if (wasRight) {
      this.clearInput();
      // run check to see if there are any answers that have guessed = false;
      if (this.game.answers.filter(answer => answer.guessed === false).length === 0) {
        // This is end of the game as well
        this.gameOver();
      }
    }
  }

  clearInput() {
    this.guess = '';
  }

  gameOver() {
    clearInterval(this.timer)
    this.ongoing = false;
    this.gameInputEl.nativeElement.disabled = true;
    this.scoreGame = this.game.answers.filter(answer => answer.guessed === true).length;
    console.log(this.scoreGame / this.game.answers.length, Math.abs(this.time - 60))
    const percentScore: string = ((this.scoreGame / this.game.answers.length) * 100).toFixed()
    console.log(percentScore)
    this.play = false;
    this.endGameModal.nativeElement.classList.add('is-active')
  }

  closeModal(goToList: boolean) {
    this.endGameModal.nativeElement.classList.remove('is-active');
    if (goToList) {
      this.leaveGame()
    }
  }

}
