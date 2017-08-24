import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  constructor(private _http: Http) { }

  regAttempt(user) {
    return this._http.post('/api/reg', user)
    .map(data => data.json())
    .toPromise();
  }

  loginAttempt(user) {
    return this._http.post('/api/login', user)
    .map(data => data.json())
    .toPromise();
  }

  getCurrentUser(){
    return this._http.get('/api/show_user',)
    .map(data => data.json()).toPromise();   
  }

  showProfile(id){
    return this._http.get(`api/show_profile/${id}`)
    .map(data => data.json())
    .toPromise();
  }


  logout() {
    return this._http.get('/api/logout')
    .map(data => data.json())
    .toPromise();
  }

  updateUser(id ,user){
    return this._http.post(`api/update_user/${id}`, user)
    .map(data => data.json())
    .toPromise(); 
  }

  searchByUser(searchItem) {
    let context = {
      'name': searchItem
    };
    return this._http.post('/api/search_by_user', context)
    .map(data => data.json())
    .toPromise();
  }

}
