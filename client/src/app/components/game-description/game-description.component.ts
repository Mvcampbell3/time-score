import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-game-description',
  templateUrl: './game-description.component.html',
  styleUrls: ['./game-description.component.scss']
})
export class GameDescriptionComponent implements OnInit {
  @Input() gameTitle: string;
  @Input() gameId: string;
  @Input() gameInstructions: string;
  @Input() gameDescription: string;

  @Output() backList: EventEmitter<void> = new EventEmitter;

  highScoresLoaded: boolean = false;



  constructor(public http: HttpService) { }

  ngOnInit() {
    this.grabHighScores()
  }

  grabHighScores() {
    this.http.getHighscoresForGame(this.gameId).subscribe(
      (data: any) => {
        console.log(data)

        this.highScoresLoaded = true;
        this.http.loading.next(false)
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  backToList() {
    console.log('going to head back to the list page')
    this.backList.emit();
  }

}
