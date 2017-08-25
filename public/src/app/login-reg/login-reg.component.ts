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

  loginModal= true;
  user = new User();

  pwConfirm = '';
  passwordMatch = false;

  regErrors = [];

  checkPassword() {
    if (this.user.password.length < 8) {
      this.regErrors.push("Password must be at least 8 characters");
    } 
    if (this.user.password !== this.pwConfirm) {
      this.regErrors.push("Password confirmation must match password")
    }
  }

  validateEmail(email) {
    var re = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/;
    if (!re.test(email)) {
      this.regErrors.push("Email must be in valid email format");
    }
  }

  // currUser;


  registrationAttempt() {
    this.regErrors = [];
    this.checkPassword();
    this.validateEmail(this.user.email);
    if (this.regErrors.length > 0) {
      this.user = new User;
      this.pwConfirm = '';
    } else {
      this._userService.regAttempt(this.user)
        .then(data => {
          if (data.emailError) {
            this.regErrors.push(data.emailError);
            this.user = new User;
            this.pwConfirm = '';
          } else {
            // this.currUser = data;
            this._router.navigateByUrl('/choose_topics');             
          }
       
        })
        .catch(err => console.log(err));      
    }
  }

  attemptedUser = {
    email: '',
    password: ''
  }

  loginError;

  loginAttempt() {
    this._userService.loginAttempt(this.attemptedUser)
      .then(resData => {
        if (resData.error) {
          this.loginError = resData.error;
        } else {
          // this.currUser = resData;
          this._router.navigateByUrl('/home');
        }
      }).catch(err => console.log(err));

  }

  registerModal(){
    this.loginModal= false;
  }
  loginModalSwitch(){
    this.loginModal= true;
  }
}
