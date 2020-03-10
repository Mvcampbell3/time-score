import { Game } from './game';
import { HighScore } from './highscore'

export class Profile {
  public games: Game[];
  public userData: {
    highScoreArray: HighScore[],
    _id: string,
    username: string,
    email: string
  }

  constructor(games: Game[], userData: { highScoreArray: HighScore[], _id: string, username: string, email: string }) {
    this.games = games;
    this.userData = userData;
  }
}