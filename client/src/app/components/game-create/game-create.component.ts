import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.scss']
})
export class GameCreateComponent implements OnInit {

  showInstructions: boolean = false;
  newAnswersList: { display_value: string, accepted_values: string[] }[] = [{ display_value: "Big Mac", accepted_values: ['Big Mac', 'bigmac'] }];

  constructor() { }

  ngOnInit() {

  }


  toggleShowInstructions() {
    this.showInstructions = !this.showInstructions
  }

}
