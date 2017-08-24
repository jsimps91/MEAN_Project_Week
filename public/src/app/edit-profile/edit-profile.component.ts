import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  
  @Input() currentUser;
  message;
  user= new User()
   constructor(private _route: ActivatedRoute,private _router: Router, private _userService: UserService) { }

  ngOnInit() {
    this.user = this.currentUser
  }
  updateUser(id){
    this._userService.updateUser(id, this.user)
      .then((response) =>{
      this.message = response.message
  })
}
}
