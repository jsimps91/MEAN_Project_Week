import { Component, OnInit } from '@angular/core';
import { BoardService } from './../board.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Board } from '../board';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {

  board = new Board();
  subscription: Subscription;

  constructor(private _route: ActivatedRoute,private _router: Router, private _boardService: BoardService) { }

  ngOnInit() {
    this.subscription=this._route.paramMap.switchMap(params => {
        console.log("TaskDetailsComponent loaded and url id given is: ", params.get('id'));
        return this._boardService.showBoard(params.get('id'));
      }).subscribe(board => this.board = board);    
  }

}
