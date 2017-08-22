import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { User } from '../user';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User
  subscription: Subscription

  constructor(private _route: ActivatedRoute,private _router: Router, private _userService: UserService) { }

  ngOnInit() {
    this.subscription=this._route.paramMap.switchMap(params => {
        console.log("TaskDetailsComponent loaded and url id given is: ", params.get('id'));
        return this._userService.showProfile(params.get('id'));
      }).subscribe(user => this.user = user);
    
  }


}
