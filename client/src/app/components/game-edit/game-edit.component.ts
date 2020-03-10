import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Game } from '../../models/game';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss']
})
export class GameEditComponent implements OnInit {

  constructor(
    public http: HttpService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.getGameInfo(id)
  }

  getGameInfo(id) {
    this.http.editGameInfo(id).subscribe(
      (data: any) => {
        console.log(data)
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

}
