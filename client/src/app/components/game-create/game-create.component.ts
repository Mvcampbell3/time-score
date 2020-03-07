import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.scss']
})
export class GameCreateComponent implements OnInit {

  showInstructions: boolean = false;
  newAnswersList: { display_value: string, accepted_values: string[] }[] = [];

  displayInput: string = "";
  accepted1: string = "";
  accepted2: string = "";
  accepted3: string = "";

  nameInput: string = "";
  instructionsInput: string = "";
  descriptionInput: string = "";

  constructor() { }

  ngOnInit() {

  }

  toggleShowInstructions() {
    this.showInstructions = !this.showInstructions
  }

  addAnswer() {
    console.log('clicked')
    console.log(this.displayInput, this.accepted1, this.accepted2, this.accepted3)
    if (this.displayInput !== "") {
      if (this.accepted1 !== "" || this.accepted2 !== "" || this.accepted3 !== "") {
        const newAnswer = { display_value: "", accepted_values: [] };
        newAnswer.display_value = this.displayInput;
        const acceptables = [this.accepted1, this.accepted2, this.accepted3];
        const filled = acceptables.filter(answer => answer !== "");
        filled.forEach(one => newAnswer.accepted_values.push(one));
        console.log(newAnswer)
        this.newAnswersList.push(newAnswer)
        this.clearAnswer()
      }
    }
  }

  clearAnswer() {
    this.displayInput = "";
    this.accepted1 = "";
    this.accepted2 = "";
    this.accepted3 = "";
  }

}
