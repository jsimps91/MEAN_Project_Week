import { Component, OnInit } from '@angular/core';
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
  
  images = [];
  boards = [];

  constructor(private _pinService: PinService, private _boardService: BoardService) { }

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
    this._pinService.createPin(this.pin).then(response => console.log('created pin!')).catch(err => console.log(err));
  }

  ngOnInit() {
    this._boardService.getCurrUserBoards().then(response => this.boards = response).catch(err => console.log(err));
  }

}
