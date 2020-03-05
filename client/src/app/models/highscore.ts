export class HighScore {
  public total_score: number;
  public _id: string;
  public user_id: { _id: string, username: string };
  public game_id: { _id: string, name: string };
  public score: number;
  public time_left: number;

  constructor(
    total_score: number,
    _id: string,
    user_id: { _id: string, username: string },
    game_id: { _id: string, name: string },
    score: number,
    time_left: number
  ) {
    this.total_score = total_score;
    this._id = _id;
    this.user_id = user_id;
    this.game_id = game_id;
    this.score = score;
    this.time_left = time_left
  }
}

/*
total_score: 155.9
_id: "5e615aeea36b1c5440014ccd"
user_id: {_id: "5e615a6c8a481b4064db6bc5", username: "mvcampbell3"}
game_id: {_id: "5e615ad4fb409d389cc5d352", name: "Test Game"}
score: 100
time_left: 55.9
*/