import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'letter-box',
  templateUrl: './letter-box.component.html',
  styleUrls: ['./letter-box.component.css']
})
export class LetterBoxComponent {
  @Input() letter: string;
  @Input() index: number;
  @Input('has-focus') hasFocus;
  @Output() change = new EventEmitter();

  constructor() { }

  Click() {
    this.change.emit(this.index);
  }
}
