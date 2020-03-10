import { Answer } from './answer';

export class Game {
  public name: string;
  public inputPlaceholder: string;
  public description: string;
  public instructions: string;
  public answers: Answer[];
  public _id: string;

  constructor(name: string, inputPlaceholder: string, description: string, instructions: string, answers: Answer[], _id: string) {
    this.name = name;
    this.inputPlaceholder = inputPlaceholder;
    this.description = description;
    this.instructions = instructions;
    this.answers = answers;
    this._id = _id;
  }
}