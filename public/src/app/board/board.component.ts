import { Component, OnInit, Input } from '@angular/core';
import { BoardService } from './../board.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() board;
  coverImage;
  constructor(private _router: Router, private _boardService: BoardService) { }

  ngOnInit() {
    this.getCoverImage(this.board.pins[0])
  }

  getCoverImage(id) {
    console.log("GETTING COVER IMAGE FOR BOARD WITH ID:", id)
    if (this.board.pins.length == 0) {
      this.coverImage.image = "http://www.solidbackgrounds.com/images/2560x1440/2560x1440-cool-black-solid-color-background.jpg"
    }
    else {
      this._boardService.getCoverImage(id)
        .then((response) => {
          console.log("COVER IMAGE", response)
          this.coverImage = response
        })
    }
  }

}
