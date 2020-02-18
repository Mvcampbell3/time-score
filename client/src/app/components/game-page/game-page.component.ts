import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Game } from '../../models/game';
import { Answer } from '../../models/answer';
import { HttpService } from 'src/app/http.service';
// import baseballTeam from '../../gameSeeds/baseball';
// import presidentNames from '../../gameSeeds/presidents';
// import footballTeams from '../../gameSeeds/football.js'

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})

export class GamePageComponent implements OnInit, OnDestroy {
  @ViewChild('gameInput', { static: false }) gameInputEl: ElementRef;
  @ViewChild('endGameModal', { static: false }) endGameModal: ElementRef;
  @Input() gameTitle: string;
  @Input() gameId: string;
  @Output() back: EventEmitter<void> = new EventEmitter;

  game: Game;
  guess: string;
  timer: any;
  time: number = 60;
  scoreGame: number = 0;
  play: boolean = true;
  firstLoad: boolean = true;
  ongoing: boolean = false;
  loadedDB: boolean = false;

  constructor(public http: HttpService) { }

  ngOnInit() {
    // switch (this.gameTitle) {
    //   case 'baseball':
    //     this.game = baseballTeam;
    //     break;
    //   case 'football':
    //     this.game = footballTeams;
    //     break;
    //   case 'presidents':
    //     this.game = presidentNames;
    //     break;
    //   default:
    //     this.game = baseballTeam;
    //     console.log('switch for game assign not working')
    // }
    this.getGameFromDB(this.gameId);
  }

  getGameFromDB(id) {
    this.http.getOneGame(id).subscribe(
      (data: Game) => {
        console.log(data);
        this.game = data;
        this.game.answers = this.game.answers.map(answer => new Answer(answer.display_value, answer.accepted_values))
        console.log(this.game.answers)
        this.loadedDB = true;

      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  ngOnDestroy() {
    if (this.gameTitle !== '') {
      this.clearGameAnswers()
    }
    this.gameTitle = '';
    this.game = null;
    this.resetGame()
  }

  clearGameAnswers() {
    console.log(this.gameTitle)
    // switch (this.gameTitle) {
    //   case 'baseball':
    //     baseballTeam.answers.forEach(answer => answer.guessed = false);
    //     break;
    //   case 'football':
    //     footballTeams.answers.forEach(answer => answer.guessed = false);
    //     break;
    //   case 'presidents':
    //     presidentNames.answers.forEach(answer => answer.guessed = false);
    //     break;
    //   default:
    //     console.log('switch for game answer clear not working')
    // }
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
    this.gameTitle = '';
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
    }
  }

  clearInput() {
    this.guess = '';
  }

  gameOver() {
    this.ongoing = false;
    this.gameInputEl.nativeElement.disabled = true;
    this.scoreGame = this.game.answers.filter(answer => answer.guessed === true).length;
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
