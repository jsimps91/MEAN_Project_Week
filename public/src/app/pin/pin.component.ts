import { Component, OnInit, Input } from '@angular/core';
import { Pin } from '../pin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {

  @Input() pin;

  constructor(private _router: Router) { }

  repin(){
    this._router.navigateByUrl(`/pin/repin/${this.pin._id}`)
  }

  ngOnInit() {
  }

}
