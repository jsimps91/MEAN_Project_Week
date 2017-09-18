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

  pinArr;

  getAllPins() {
    console.log('GETTING ALL PINS');
    this._pinService.getAllPins()
    .then(data => {
      console.log('RETURNED WITH THIS DATA', data);
      this.pinArr = data;
      console.log('THIS IS THE PIN ARRAY:', this.pinArr);
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  getRelevantPins() {
    this._pinService.getRelevantPins()
    .then(data => {
      console.log(data);
      this.pinArr = data.pinsArr;
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
    this.getCurrUser();    
    this.getAllPins();
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
            this.pinArr = data.pins;
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
    if(this.topicSearchItem === "all") {
      this.getAllPins();
    } else {
      this._boardService.searchByTopic(this.topicSearchItem)
      .then(data => {
        this.topicMessage = data.message;
        if (data.pins) {
          this.pinArr = data.pins;
        }
      })
      .catch(err => console.log(err));
    }
  }

}
