import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Game } from '../../models/game';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnDestroy {

  @ViewChild('listbg', { static: false }) listbg: ElementRef;

  gamesArray: Game[] = [];
  selected: boolean = false;

  selectedGameTitle: string = '';
  selectedGameId: string = '';
  selectedGameDescription: string = '';
  selectedGameInstructions: string = '';

  loading: boolean;

  loadingSub: Subscription = this.http.loading.subscribe(
    (data: boolean) => {
      console.log(data)
      this.loading = data;
    }
  );

  bgClasses: string[] = ['newBG1', 'newBG2', 'newBG3'];
  pos: number = 1;
  timerPlace: any;

  constructor(public http: HttpService) { }

  ngOnInit() {
    console.log('ran ng on init')
    this.getAllGames()
    setTimeout(() => {
      this.setBackgroundColor(0);
    }, 50)
    this.startTimer();
  }

  ngOnDestroy() {
    this.timerPlace = null;
    console.log('ran destroy')
    this.loadingSub.unsubscribe();
  }

  getAllGames() {
    console.log('get all games ran again')
    this.http.getAllGames().subscribe(
      (data: Game[]) => {
        console.log(data)
        this.gamesArray = data;
        this.http.loading.next(false);
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

  selectGame(title: string, id: string, instructions: string, description: string) {
    this.selectedGameTitle = title;
    this.selectedGameId = id;
    this.selectedGameInstructions = instructions;
    this.selectedGameDescription = description;
    clearInterval(this.timerPlace);
    this.selected = true;
  }

  setBackgroundColor(num: number) {
    this.listbg.nativeElement.classList = 'list-bg';
    this.listbg.nativeElement.classList.add(this.bgClasses[num]);
  }

  returnFromInfo() {
    this.selectedGameTitle = '';
    this.selectedGameDescription = '';
    this.selectedGameInstructions = '';
    this.selected = false;
    this.selectedGameId = ''
    console.log('back from info received')
    console.log(this.loading)
    this.startTimer()
  }

  setClasses(i) {
    const checkNum = i % 3;
    const classes = {
      "game-item": true,
      "three": checkNum === 2,
      "two": checkNum === 1,
      "one": checkNum === 0
    }
    return classes;
  }
}
