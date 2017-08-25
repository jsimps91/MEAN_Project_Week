import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { PinService } from './../pin.service';
import { BoardService } from './../board.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from "../user";
import { Pin } from "../pin";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser= new User();

  constructor(private _router: Router, private _userService: UserService, private _pinService: PinService, private _boardService: BoardService) { }

  allPins;

  getAllPins() {
    this._pinService.getAllPins()
    .then(data => {
      console.log(data);
      this.allPins = data.pinsArr;
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  getCurrUser() {
    this._userService.getCurrentUser()
    .then(response => {
      if (response === {}) {
        console.log('No current user');
      } else {
        this.currentUser = response;      
      }

    })
    .catch(err => console.log(err));     
  }

  userSearchItem;
  resMsg;
  userSearchResults;  

  ngOnInit() {
    this.getAllPins();
    this.getCurrUser();
    this.userSearchItem = '';
    this.userSearchResults = [];
    this.resMsg = '';
  }

  searchByUser() {
    this._userService.searchByUser(this.userSearchItem)
    .then(data => {
        this.resMsg = data.message;
        if (data.users) {
          this.userSearchResults = data.users;
          if (data.pins) {
            this.allPins = data.pins;
          }
        }
    })
    .catch(err => console.log(err));
  }

  goToUser(id) {
    this._router.navigateByUrl(`/profile/${id}`);
  }

  topicSearchItem;
  topicMessage;

  searchByTopic() {
    this._boardService.searchByTopic(this.topicSearchItem)
    .then(data => {
      this.topicMessage = data.message;
      if (data.pins) {
        this.allPins = data.pins;
      }
    })
    .catch(err => console.log(err));
  }

}
