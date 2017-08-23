import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BoardService {

  constructor(private _http: Http) { }
  createBoard(board){
    console.log("NEW BOARD GOING INTO HTTP REQUEST", board)
    return this._http.post('/api/create_board', board)
    .map(data => data.json()).toPromise();
  }

  getCurrUserBoards(){
    return this._http.get('/api/get_cu_boards').map(data => data.json()).toPromise();
  }

  showBoard(id){
    return this._http.get(`api/show_board/${id}`)
    .map(data => data.json())
    .toPromise();    
  }
  
  getCoverImage(id){
    return this._http.get(`api/show_cover_image/${id}`)
    .map(data => data.json())
    .toPromise();  
  }
}
