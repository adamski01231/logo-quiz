import { KeyboardCommands } from './../enums';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'letter-box',
  templateUrl: './letter-box.component.html',
  styleUrls: ['./letter-box.component.css'],
  animations: [
    trigger('flipInY', [
      transition('void => *', [
        style({ transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)' }),
        animate('1s 1s ease-in', keyframes([
          style({ offset: .4, transform: 'perspective(400px) rotate3d(0, 1, 0, -40deg)' }),
          style({ offset: .6, transform: 'perspective(400px) rotate3d(0, 1, 0, 20deg)' }),
          style({ offset: .8, transform: 'perspective(400px) rotate3d(0, 1, 0, -10deg)' }),
          style({ offset: 1, transform: 'perspective(400px)'})
        ]))
      ]),
      transition('* => void', [
        style({ transform: 'scale(2)' }),
        animate('2s')
      ])
    ])
  ]
})

export class LetterBoxComponent implements OnInit {
  private _hasFocus: boolean;

  @Input() letter: string;
  @Input() index: number;
  @Input('has-focus')
    get hasFocus() {
      return this._hasFocus;
    }
    set hasFocus(value: boolean) {
      this._hasFocus = value;
      if (this._hasFocus) {
        this.el.nativeElement.querySelector('div').focus();
      }
    }

  @Output() change = new EventEmitter();

  letter2: string;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (this._hasFocus) {
      this.el.nativeElement.querySelector('div').focus();
    }
  }

  Click() {
    this.change.emit({ index: this.index, command: KeyboardCommands.SetFocus });
  }

  KeyPress(event) {
    event.stopPropagation();
    event.preventDefault();

    const c = event.keyCode;
    if ((c >= 65 && c <= 90) || (c >= 97) && (c <= 122)) {
      this.letter2 = event.key;
      this.change.emit({ index: this.index, letter: this.letter2, command: KeyboardCommands.InsertLetter });
    }
    if (c === 8) {
      this.letter2 = '';
      this.change.emit({ index: this.index, letter: this.letter2, command: KeyboardCommands.DeleteLetter });
    }
    if (c === 37) {
      this.change.emit({ index: this.index, letter: this.letter2, command: KeyboardCommands.CarretLeft });
    }
    if (c === 39) {
      this.change.emit({ index: this.index, letter: this.letter2, command: KeyboardCommands.CarretRight });
    }
    if (c === 13) {
      this.change.emit({ index: this.index, letter: this.letter2, command: KeyboardCommands.Enter });
    }
  }
}
