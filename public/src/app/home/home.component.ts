import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { PinService } from './../pin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from "../user";
import { Pin } from "../pin";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;

  constructor(private _router: Router, private _userService: UserService, private _pinService: PinService) { }

  userSearchItem;
  searchResults;

  getAllPins() {
    this._pinService.getAllPins()
    .then(data => {
      this.searchResults = data;
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
  
  ngOnInit() {
    this.getAllPins();
    this.getCurrUser();
  }

}
