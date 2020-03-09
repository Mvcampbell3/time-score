import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  loading = new BehaviorSubject<boolean>(false);

  constructor(public _http: HttpClient) { }

  setAuthorization(): object {
    const token = JSON.parse(localStorage.getItem('time-score-token'));
    let headers;
    if (token) {
      headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      headers = new HttpHeaders().set('Authorization', `Beader empty`)
    }
    return { headers }
  }

  checkToken() {
    return this._http.get('/api/user/checkAuth', this.setAuthorization())
  }

  // Dev Route
  getAllUsers() {
    return this._http.get('/api/user/');
  }

  getAllGames() {
    console.log('get all games set loading true')
    this.loading.next(true);
    return this._http.get('/api/game');
  }

  getOneGame(id) {
    console.log('get one game set loading true')
    this.loading.next(true);
    return this._http.get(`/api/game/id/${id}`)
  }

  loginUser(sendObj) {
    console.log('login user set loading true')
    this.loading.next(true);
    return this._http.post('/api/user/login', sendObj);
  }

  createUser(sendObj) {
    console.log('create user set loading true')
    this.loading.next(true);
    return this._http.post('/api/user', sendObj);
  }

  getHighscoresForGame(gameId) {
    console.log('get highscores for game set loading true')
    this.loading.next(true);
    return this._http.get(`/api/highscore/test/${gameId}`)
  }

  getHighscoresForUser(userId) {
    console.log('get highscores for user set loading true')
    this.loading.next(true);
    return this._http.get(`/api/highscore/user/${userId}`, this.setAuthorization())
  }

  createHighScore(game_id, user_id, score, time_left) {
    console.log('create highscore for game set loading true');
    this.loading.next(true);
    const sendObj = {
      user_id,
      game_id,
      score,
      time_left
    }
    return this._http.post('/api/highscore', sendObj)
  }

  createGame(newGame) {
    return this._http.post('/api/game', newGame, this.setAuthorization())
  }
}
