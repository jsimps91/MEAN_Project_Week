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

  constructor(private _route: ActivatedRoute, private _pinService: PinService) { 
    this._route.paramMap.switchMap(params => {
      return this._pinService.retrievePin(params.get('id'))
    }).subscribe(pin => this.pin = pin);;
  }

  ngOnInit() {

  }

}
