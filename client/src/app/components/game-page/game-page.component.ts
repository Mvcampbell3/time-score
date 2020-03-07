import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Game } from '../../models/game';
import { Answer } from '../../models/answer';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})

export class GamePageComponent implements OnInit, OnDestroy {
  @ViewChild('gameInput', { static: false }) gameInputEl: ElementRef;
  @ViewChild('endGameModal', { static: false }) endGameModal: ElementRef;

  game: Game;
  guess: string;
  timer: any;
  time: number = 600;
  displayTime: string = '60.0';
  scoreGame: number = 0;
  play: boolean = true;
  firstLoad: boolean = true;
  ongoing: boolean = false;
  gameId: string = '';
  loading: boolean;
  user: boolean;

  loadingSub: Subscription = this.http.loading.subscribe(
    (data: boolean) => {
      this.loading = data;
    }
  );

  userSub: Subscription = this.userService.user.subscribe(
    (data: boolean) => {
      console.log('userSub on gamePage', data)
      this.user = data;
    },
    (err: any) => {
      this.user = false;
      console.log(err)
    }
  )

  constructor(
    public http: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.gameId = id;
    this.getGameFromDB(id);
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
    this.userSub.unsubscribe();
    this.game = null;
    this.resetGame()
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
    this.time = 600;
    this.play = true;
    this.guess = '';
    clearInterval(this.timer)
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
        this.displayTime = (this.time / 10).toFixed(1).toString();
      }
    }, 100)
  }

  evaluateInput() {
    const answerArr: Answer[] = this.game.answers.filter(answer => answer.guessed === false);
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
        // This is end of the game
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
    console.log(this.scoreGame / this.game.answers.length, Math.abs(this.time - 600))
    const percentScore: string = ((this.scoreGame / this.game.answers.length) * 100).toFixed()
    console.log(percentScore)
    const timeScore = this.time / 10;
    console.log(timeScore)
    this.play = false;

    if (this.user) {
      console.log(this.userService.userInfo.id)
      this.createHighScore(percentScore, timeScore, this.userService.userInfo.id);
    } else {
      this.endGameModal.nativeElement.classList.add('is-active')
    }
  }

  createHighScore(score, time_left, userId) {
    this.http.createHighScore(this.gameId, userId, score, time_left).subscribe(
      (data: any) => {
        console.log(data);
        this.http.loading.next(false);
        this.endGameModal.nativeElement.classList.add('is-active')
      },
      (err: any) => {
        console.log(err);
        this.http.loading.next(false)
      }
    )
  }

  closeModal() {
    this.endGameModal.nativeElement.classList.remove('is-active');
  }

}
