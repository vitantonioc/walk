import { Component, Input } from '@angular/core';

@Component({
  selector: 'walk-bulb',
  templateUrl: './bulb.component.html',
  styleUrls: ['./bulb.component.css']
})
export class BulbComponent {

  @Input() bulbState: string = "red";
  constructor() {}
}
