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
    this.loading.next(true);
    return this._http.get('/api/game');
  }

  getOneGame(id) {
    this.loading.next(true);
    return this._http.get(`/api/game/id/${id}`)
  }

  loginUser(sendObj) {
    this.loading.next(true);
    return this._http.post('/api/user/login', sendObj);
  }

  createUser(sendObj) {
    this.loading.next(true);
    return this._http.post('/api/user', sendObj);
  }

  getHighscoresForGame(gameId) {
    this.loading.next(true);
    return this._http.get(`/api/highscore/test/${gameId}`)
  }

  getHighscoresForUser(userId) {
    this.loading.next(true);
    return this._http.get(`/api/highscore/test/${userId}`, this.setAuthorization())
  }
}
