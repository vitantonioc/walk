import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'walk-button',
  templateUrl: './button.component.html',
  styles: []
})
export class ButtonComponent {

  @Input() modeButton: string = 'left';
  @Output() onEvent : EventEmitter<string> = new EventEmitter();

  get textButton():string {
    return this.modeButton.toUpperCase();
  }

  constructor() {}

  clickBtn(mode: string) {
    this.onEvent.emit(mode);
  }
}
