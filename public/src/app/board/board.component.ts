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
    if(this.board.pins.length==0){
       this.coverImage = "https://www.beautycolorcode.com/d4d855-2880x1800.png"
    }
    else{
      this.getCoverImage(this.board.pins[0])
    }
    
  }

  getCoverImage(id) {
    console.log("about to get cover image! id:", id)
      this._boardService.getCoverImage(id)
        .then((response) => {
          console.log("COVER IMAGE", response)
          this.coverImage = response.image
        })
    }
  }

