import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnDestroy {

  // gamesArray: string[] = ['MLB Teams', 'NFL Teams', 'U.S. Presidents'];
  gamesArray: Game[] = [];
  selected: boolean = false;
  selectedGame: string = '';
  selectedGameId: string = '';

  @ViewChild('listbg', { static: false }) listbg: ElementRef;


  bgClasses: string[] = ['newBG1', 'newBG2', 'newBG3'];
  pos: number = 1;
  timerPlace: any;

  constructor(public http: HttpService) { }

  ngOnInit() {
    this.getAllGames()
    setTimeout(() => {
      this.setBackgroundColor(0);
    }, 50)
    this.startTimer();
  }

  getAllGames() {
    this.http.getAllGames().subscribe(
      (data: Game[]) => {
        console.log(data)
        this.gamesArray = data;
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  // For bg change
  startTimer() {
    this.timerPlace = setInterval(() => {
      if (this.pos < this.bgClasses.length) {
        this.setBackgroundColor(this.pos);
        this.pos++;
      } else {
        this.pos = 0;
        this.setBackgroundColor(this.pos);
        this.pos++;
      }
    }, 6000)
  }

  ngOnDestroy() {
    this.timerPlace = null;
  }

  selectGame(id) {
    this.selectedGameId = id;
    clearInterval(this.timerPlace);
    this.selected = true;
  }

  setBackgroundColor(num: number) {
    this.listbg.nativeElement.classList = 'list-bg';
    this.listbg.nativeElement.classList.add(this.bgClasses[num]);
  }

  returnFromGame() {
    this.selectedGame = '';
    this.selected = false;
    this.selectedGameId = ''
    this.startTimer()
  }
}
