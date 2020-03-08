import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.scss']
})
export class GameCreateComponent implements OnInit, OnDestroy {

  showInstructions: boolean = false;
  newAnswersList: { display_value: string, accepted_values: string[] }[] = [];

  displayInput: string = "";
  accepted1: string = "";
  accepted2: string = "";
  accepted3: string = "";

  nameInput: string = "";
  instructionsInput: string = "";
  descriptionInput: string = "";
  placeholderInput: string = "";

  topSaved: boolean = false;
  middleSaved: boolean = false;
  editPassed: boolean = false;

  showTop: boolean = true;
  showMid: boolean = false;
  showEdit: boolean = false;

  constructor(public userService: UserService, public http: HttpService, public router: Router) { }

  ngOnInit() {
    console.log(this.userService.userInfo)
    if (!this.userService.userInfo) {
      this.router.navigate(['/'])
    }
  }

  ngOnDestroy() {
  }

  toggleShowInstructions() {
    this.showInstructions = !this.showInstructions
  }

  addAnswer() {
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

  saveTop() {
    this.topSaved = true;
    this.showTop = false;
    this.showMid = true;
  }

  backTop() {
    this.topSaved = false;
    this.showTop = true;
    this.showMid = false;
  }

  controlMove(up: boolean, index: number) {
    console.log(up, index);
    if (up && index > 0) {
      console.log('would move up')
      const tempAnswer = this.newAnswersList[index - 1];
      this.newAnswersList[index - 1] = this.newAnswersList[index];
      this.newAnswersList[index] = tempAnswer;
    } else if (!up && index < this.newAnswersList.length - 1) {
      console.log('would move down')
      const tempAnswer = this.newAnswersList[index + 1];
      this.newAnswersList[index + 1] = this.newAnswersList[index];
      this.newAnswersList[index] = tempAnswer;
    }
  }

  controlEdit(index: number) {
    const holderAnswer = this.newAnswersList[index];
    this.displayInput = holderAnswer.display_value;
    this.accepted1 = holderAnswer.accepted_values[0] || "";
    this.accepted2 = holderAnswer.accepted_values[1] || "";
    this.accepted3 = holderAnswer.accepted_values[2] || "";
    this.newAnswersList.splice(index, 1);
  }

  controlDelete(index: number) {
    console.log(index, ' delete')
    this.newAnswersList.splice(index, 1)
  }

  sendGame() {
    const newGame = {
      name: this.nameInput,
      description: this.descriptionInput,
      instructions: this.instructionsInput,
      answers: this.newAnswersList,
      inputPlaceholder: this.placeholderInput,
      creatorId: this.userService.userInfo.id
    }
    this.http.createGame(newGame).subscribe(
      (data: any) => {
        console.log(data)
        // Display success modal
        // Re-route to games list page or profile?
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

}
