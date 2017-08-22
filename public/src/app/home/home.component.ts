import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser;

  constructor(private _router: Router, private _userService: UserService) { }
  
  ngOnInit() {

    this.getCurrentUser()
    
  }

    getCurrentUser(){
    console.log("ABOUT TO GET CURRENT USER")
    this._userService.getCurrentUser()
      .then((response) => {
        console.log("CURRENT USER", response)
        this.currentUser = response

      })    
  }

}
