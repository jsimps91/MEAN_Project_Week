import { Component, OnInit } from '@angular/core';
import { User } from '../user'
import { UserService } from '../user.service';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.css']
})
export class LoginRegComponent implements OnInit {

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
  }

  user = new User;
  pwConfirm = '';
  passwordMatch = false;
  
  duplicateEmail = [];

  checkPassword() {
    if (this.user.password === this.pwConfirm) {
      this.passwordMatch = true;
    }
  }

  currUser;

  registrationAttempt() {
    this._userService.regAttempt(this.user)
      .then(data => {
        this.currUser = data;
        console.log('AT RESPONSE FROM REG');
        console.log(data.fullName);
        console.log(this.currUser);
        this._router.navigateByUrl('/home');        
      })
      .catch(err => console.log(err));
  }


  attemptedUser = {
    email: '',
    password: ''
  }

  loginError;

  loginAttempt() {
    console.log("ATTEMPTING LOGIN");
    this._userService.loginAttempt(this.attemptedUser)
      .then(resData => {
        if (resData.error) {
          this.loginError = resData.error;
        } else {
          this.currUser = resData;
          this._router.navigateByUrl('/home');
        }
        // if (userArr.length >= 1) {
        //   this._router.navigateByUrl('/home');
        // } else {
        //   this.currentUserArr = userArr;          
        // }
      }).catch(err => console.log(err));

  }

}
