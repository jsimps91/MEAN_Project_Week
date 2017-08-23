import { Component, OnInit, Input } from '@angular/core';
import { Pin } from '../pin';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {

  @Input() pin;

  constructor() { }

  ngOnInit() {
  }

}
