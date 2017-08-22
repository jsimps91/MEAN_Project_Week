import { Component, OnInit } from '@angular/core';
import { Board } from '../board'
import { BoardService } from './../board.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css']
})
export class BoardFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
