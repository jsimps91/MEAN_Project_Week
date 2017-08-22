import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  constructor(private _http: Http) { }

  regAttempt(user) {
    console.log('MADE IT REGATTEMPT IN SERVICE');
    return this._http.post('/api/reg', user)
    .map(data => data.json())
    .toPromise();
  }

  loginAttempt(user) {
    console.log('GOT TO THE LOGIN SERVICE');
    return this._http.post('/api/login', user)
    .map(data => data.json())
    .toPromise();
  }

  getCurrentUser(){
    console.log("GETTING CURRENT USER")
    return this._http.get('/api/show_user',)
    .map(data => data.json()).toPromise();   
  }

  showProfile(id){
    console.log("SHOW USER PROFILE GOING INTO HTTP REQUEST", id)
    return this._http.get(`api/show_profile/${id}`)
    .map(data => data.json())
    .toPromise();
  }


  logout() {
    return this._http.get('/api/logout')
    .map(data => data.json())
    .toPromise();
  }

  // getUser() {
  //   return this.currentUser;
  // }

  // cancel(appoint) {
  //   return this._http.post('/api/cancel', appoint)
  //   .map(data => data.json())
  //   .toPromise();
  // }

}
