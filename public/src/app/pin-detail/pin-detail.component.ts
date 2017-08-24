import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { PinService } from '../pin.service';
import { Pin } from '../pin';

@Component({
  selector: 'app-pin-detail',
  templateUrl: './pin-detail.component.html',
  styleUrls: ['./pin-detail.component.css']
})
export class PinDetailComponent implements OnInit {
  pin: Pin;
  pin_id;
  message = '';
  comments = [];

  constructor(private _route: ActivatedRoute, private _pinService: PinService,private _router: Router) { 
    this._route.paramMap.switchMap(params => {
      this.pin_id = params.get('id');
      return this._pinService.retrievePin(params.get('id'))
    }).subscribe(pin => {
      this.pin = pin;
      this.comments = pin.comments;
    });;
  }

  sendComment(){
    this._pinService.addComment(this.pin_id, this.message).then(response => {
      this.comments.push(response);
      this.message = '';
    }).catch(err => console.log(err));
  }

  repin(){
    this._router.navigateByUrl(`/pin/repin/${this.pin_id}`)
  }

  ngOnInit() {

  }

}
