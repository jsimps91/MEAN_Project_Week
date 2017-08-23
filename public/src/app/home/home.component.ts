import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from "../user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;

  constructor(private _router: Router, private _userService: UserService) { }
  
  ngOnInit() {
    this._userService.getCurrentUser().then(response => this.currentUser = response).catch(err => console.log(err));   
  }

}
