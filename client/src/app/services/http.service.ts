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

  setLoadingNextTrue() {
    this.loading.next(true);
  }

  setLoadingNextFalse() {
    this.loading.next(false);
  }

  getAllUsers() {
    return this._http.get('/api/user/');
  }

  getAllGames() {
    return this._http.get('/api/game');
  }

  getOneGame(id) {
    return this._http.get(`/api/game/id/${id}`)
  }

  loginUser(sendObj) {
    return this._http.post('/api/user/login', sendObj)
  }

  checkToken() {
    return this._http.get('/api/user/checkAuth', this.setAuthorization())
  }
}
