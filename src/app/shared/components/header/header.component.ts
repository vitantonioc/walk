import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'walk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() userName = '';
  @Output() onLogout : EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  logout() {
    this.onLogout.emit(true);
  }

}
