import { Component } from '@angular/core';
import { User } from './user'
import { UserService } from './user.service';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private _userService: UserService, private _router: Router) { }

  showLogout;
  
  ngOnInit() {
    this._userService.getCurrentUser()
      .then(user => {
        if (user.fullName) {
          this.showLogout = true;
        } else {
          this.showLogout = false;
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
