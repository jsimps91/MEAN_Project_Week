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

  user = new User();
  subscription: Subscription
  view;
  currentUser = new User();

  constructor(private _route: ActivatedRoute,private _router: Router, private _userService: UserService) { }

  ngOnInit() {
    this.subscription=this._route.paramMap.switchMap(params => {
        console.log("url id given is: ", params.get('id'));
        this.getCurrentUser();
        return this._userService.showProfile(params.get('id'));
      }).subscribe(user => this.user = user);
    console.log(this.user);
    this.view = "boards";
  }

  getCurrentUser(){
    this._userService.getCurrentUser()
    .then(response => {
      if (response === {}) {
        console.log('NO CURRENT USER');
      } else {
        this.currentUser = response        
      }
    })
    .catch(err => console.log(err)); 
  }

  pins(){
    this.view = "pins"
  }
  boards(){
    this.view = "boards"
  }
  edit(){
    this.view= "edit"
  }

  followers(){
    this.view= "followers"
  }

  following(){
    this.view="following"
  }

  follow(id){
    this._userService.followUser(id).then(response => {
      this.currentUser = response;
      this.user.followers.push(this.currentUser)
    }).catch(err => console.log(err))
  }

  unfollow(id){
    this._userService.unfollowUser(id).then(response => {
      this.currentUser = response;
      let remove = this.user.followers.indexOf(this.currentUser._id);
      this.user.followers.splice(remove, 1);
    }).catch(err => console.log(err))
  }
}
