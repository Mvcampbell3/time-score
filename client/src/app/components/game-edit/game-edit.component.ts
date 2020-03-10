import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Game } from '../../models/game';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss']
})
export class GameEditComponent implements OnInit, OnDestroy {
  @ViewChild('answerModal', { static: false }) answerModal: ElementRef;

  game: Game = null;
  originalGame: Game = null;
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

  getGameInfo(id) {
    this.http.editGameInfo(id).subscribe(
      (data: Game) => {
        console.log(data)
        this.originalGame = { ...data };
        this.game = data;
        this.http.loading.next(false)
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  testEdit() {
    console.log(this.game)
    console.log(this.originalGame)
  }

  closeEditAnswersModal() {
    this.answerModal.nativeElement.classList.remove('is-active');
    this.game.answers[this.answerIndex].accepted_values = this.game.answers[this.answerIndex].accepted_values.filter(accepted => accepted.trim() !== "");
  }

  displayAnswerModal(index) {
    this.answerIndex = index;
    this.answerModal.nativeElement.classList.add('is-active')
  }
}
