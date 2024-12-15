import { Component, Input } from '@angular/core';

@Component({
  selector: 'score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {

  @Input() textLabel: string = "";
  @Input() mode: string = "";
  @Input() score: number = 0;

  constructor() {}
}
