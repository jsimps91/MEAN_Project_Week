import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { PinService } from '../pin.service';
import { Pin } from '../pin';
import { BoardService } from "../board.service";

@Component({
  selector: 'app-pin-repin',
  templateUrl: './pin-repin.component.html',
  styleUrls: ['./pin-repin.component.css']
})
export class PinRepinComponent implements OnInit {
  section = 1;

  pin = new Pin();
  pin_id;

  new_board = {
    title: '', 
    description: '', 
    category: '',
  }

  boards = [];
  submitBoard(){
    if (this.pin.board == '*new*'){
      this.section += 1;
    } else {
      this._pinService.updateRepins(this.pin_id).then(response => {
      this._pinService.createPin(this.pin).then(response => {
        this._router.navigateByUrl(`/pin/${response._id}`)
      }).catch(err => console.log(err))}).catch(err => console.log(err));
    }
  }

  createBoard(){
    console.log("ABOUT TO CREATE BOARD")
    this._boardService.createBoard(this.new_board)
    .then((response) =>{
      console.log("BOARD SUCCESSFULLY CREATED", response)
      this.pin.board = response._id;
      this.submitBoard();
    })
  }

  goBack(){
    this.section -=1;
  }
  
  constructor(private _route: ActivatedRoute, private _pinService: PinService, private _boardService: BoardService, private _router: Router) { 
    this._route.paramMap.switchMap(params => {
      this.pin_id = params.get('id');
      return this._pinService.retrievePin(params.get('id'))
    }).subscribe(pin => {
      this.pin = pin;
      this.pin.repinned = true;
    });;
  }

  ngOnInit() {
    this._boardService.getCurrUserBoards().then(response => this.boards = response).catch(err => console.log(err));
  }

}
