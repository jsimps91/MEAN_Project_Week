import { Component, OnInit } from '@angular/core';
import { Board } from '../board'
import { BoardService } from './../board.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css']
})
export class BoardFormComponent implements OnInit {

  board = new Board()

  constructor(private _router: Router, private _boardService: BoardService) { }

  ngOnInit() {
  }
  createBoard(){
    console.log("ABOUT TO CREATE BOARD")
    this._boardService.createBoard(this.board)
    .then((response) =>{
      console.log("BOARD SUCCESSFULLY CREATED", response)
      this._router.navigateByUrl(`/board/${response._id}`)
    })
  }
}
