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

}
