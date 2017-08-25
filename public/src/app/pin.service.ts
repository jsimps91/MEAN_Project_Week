import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PinService {

  constructor(private _http: Http) { }

  getSourceData(url){
    return this._http.post('/api/getSourceData', {url: url}).map(data => data.json()).toPromise();
  }

  createPin(pin){
    return this._http.post('/api/create_pin', pin).map(data => data.json()).toPromise();
  }

  retrievePin(id){
    return this._http.get(`/api/getPin/${id}`).map(data => data.json()).toPromise();
  }

  getAllPins() {
    return this._http.get('/api/getAllPins').map(data => data.json()).toPromise();
  }

  getRelevantPins() {
    return this._http.get('/api/getRelevantPins').map(data => data.json()).toPromise();
  }

  addComment(id, comment){
    return this._http.post(`/api/addComment/${id}`, {comment: comment}).map(data => data.json()).toPromise();
  }

  updateRepins(id){
    return this._http.get(`/api/updateRepins/${id}`).map(data => data.json()).toPromise();
  }
}
