import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  backToList() {
    console.log('going to head back to the list page')
    this.backList.emit();
  }

}
