import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.scss']
})
export class GameCreateComponent implements OnInit {

  showInstructions: boolean = false;

  constructor() { }

  ngOnInit() {
    // setTimeout(() => {
    //   this.toggleShowInstructions()
    // }, 1000)
  }


  toggleShowInstructions() {
    this.showInstructions = !this.showInstructions
  }

}
