import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-topics',
  templateUrl: './choose-topics.component.html',
  styleUrls: ['./choose-topics.component.css']
})
export class ChooseTopicsComponent implements OnInit {

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
  }

  selectedArr = [false, false, false, false, false, false, false, false, false, false, false, false];
  choicesArr = ["Pickle Art", "Pickle Books", "Pickle Clothing", "Pickle Cocktails", "Pickle DIY", "Pickle Facts", "Pickle History", "Pickle Home Decor", "Pickle Humor", "Pickle Photography", "Pickle Pop Culture", "Pickle Recipes"];
  currUserTopics = [];

  onClick(num) {
    this.selectedArr[num] = !this.selectedArr[num];
    if (this.currUserTopics.indexOf(this.choicesArr[num]) === -1) {
      this.currUserTopics.push(this.choicesArr[num]);      
    } else {
      this.currUserTopics.splice(this.currUserTopics.indexOf(this.choicesArr[num]), 1);
    }
  }

  continue() {
    this._userService.setTopics(this.currUserTopics)
      .then(response => {
        this._router.navigateByUrl('/home');
      })
      .catch(err => console.log(err)); 
    
  }

}
