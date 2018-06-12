import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, query, stagger, keyframes } from '@angular/animations';
import { DataService } from "../data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals', [
      transition("* => *", [
        query(":enters", style({ opacity: 0 }), { optional: true }),
        query(":enters", stagger('600ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-100%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(50px)', offset: .5 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))
        ]), { optional: true }),
        query(":leaves", stagger('600ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(50px)', offset: .5 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1 }),
          ]))
        ]), { optional: true }),
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  itemCount: number;
  btnText: string = "Add an Item";
  goalText: string = "";
  goals = [];

  constructor(private _data: DataService) {
  };

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = "";
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  removeItem(i) {
    this.goals.splice(i, 1);
    this._data.changeGoal(this.goals);
  }

}
