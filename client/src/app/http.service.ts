import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public _http: HttpClient) { }

  getAllUsers() {
    return this._http.get('/api/user/');
  }

  getAllGames() {
    return this._http.get('/api/game');
  }
}
