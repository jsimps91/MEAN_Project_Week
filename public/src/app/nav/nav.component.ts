import { Component, OnInit } from '@angular/core';
import { User } from '../user'
import { UserService } from '../user.service';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private _userService: UserService, private _router: Router) { }

  currentUser: User;

  ngOnInit() {
    this._userService.getCurrentUser()
    .then(user => {
      if (user.fullName) {
        this.currentUser = user;
      } else {
        this._router.navigateByUrl('/');
      }
    })
    .catch()
  }

  logout() {
    this._userService.logout()
      .then(data => {
        this._router.navigateByUrl('/');
      })
      .catch()
  }

}
