import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pin } from "../pin";
import { PinService } from "../pin.service";
import { BoardService } from "../board.service";

@Component({
  selector: 'app-pin-form',
  templateUrl: './pin-form.component.html',
  styleUrls: ['./pin-form.component.css']
})
export class PinFormComponent implements OnInit {
  section = 1;

  pin = new Pin();
  new_board = {
    title: '', 
    description: '', 
    category: '',
  }

  images = [];
  boards = [];

  constructor(private _pinService: PinService, private _boardService: BoardService, private _router: Router) { }

  submitUrl(){
    this._pinService.getSourceData(this.pin.source_link).then(response => this.updateImagesTitle(response)).catch(err => console.log(err));
  }

  updateImagesTitle(response){
    this.images = response.images; 
    this.pin.title = response.title;
    this.section += 1;
  }

  updateImg(image){
    this.pin.image = image;
    this.section += 1;
  }

  submitDescAndBoard(){
    if (this.pin.board == '*new*'){
      this.section += 1;
    } else {
      this._pinService.createPin(this.pin).then(response => {
        this._router.navigateByUrl(`/pin/${response._id}`)
      }).catch(err => console.log(err));
    }
  }

  createBoard(){
    console.log("ABOUT TO CREATE BOARD")
    this._boardService.createBoard(this.new_board)
    .then((response) =>{
      console.log("BOARD SUCCESSFULLY CREATED", response)
      this.pin.board = response._id;
      this.submitDescAndBoard();
    })
  }

  ngOnInit() {
    this._boardService.getCurrUserBoards().then(response => this.boards = response).catch(err => console.log(err));
  }

}
