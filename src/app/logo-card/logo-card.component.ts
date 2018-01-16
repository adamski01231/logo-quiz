import { KeyboardCommands, AnswerStatuses } from './../enums';
import { trigger, animate, style, transition, keyframes } from '@angular/animations';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'logo-card',
  templateUrl: './logo-card.component.html',
  styleUrls: ['./logo-card.component.css'],
  animations: [
    trigger('logo', [
      transition('void => *', [
        style({ transform: 'scale3d(1, 1, 1) translateX(-120%)' }),
        animate('1.2s ease-in', keyframes([
          style({ offset: .3, transform: 'scale3d(1.25, 0.75, 1)' }),
          style({ offset: .4, transform: 'scale3d(0.75, 1.25, 1)' }),
          style({ offset: .5, transform: 'scale3d(1.15, 0.85, 1)' }),
          style({ offset: .65, transform: 'scale3d(0.95, 1.05, 1)' }),
          style({ offset: .75, transform: 'scale3d(1.05, 0.95, 1)' }),
          style({ offset: 1, transform: 'scale3d(1, 1, 1)' }),
        ]))
      ])
    ])
  ]
})
export class LogoCardComponent implements OnInit {
  @Input() word: string;
  @Input() image: string;

  @Output() next = new EventEmitter();

  focusedLetterBoxIndex = 0;
  answer = [];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < this.word.length; i++) {
      this.answer.push(' ');
    }
  }

  OnLetterBoxFocusChanged(params) {
    switch (params.command) {
      case KeyboardCommands.SetFocus:
      this.focusedLetterBoxIndex = params.index;
        break;
      case KeyboardCommands.CarretLeft:
        if (params.index > 0) {
          this.focusedLetterBoxIndex = params.index - 1;
          if (this.word[this.focusedLetterBoxIndex] === ' ') {
            this.focusedLetterBoxIndex--;
          }
        }
        break;
      case KeyboardCommands.CarretRight:
        if (params.index < this.word.length - 1 ) {
          this.focusedLetterBoxIndex = params.index + 1;
          if (this.word[this.focusedLetterBoxIndex] === ' ') {
            this.focusedLetterBoxIndex++;
          }
        }
        break;
      case KeyboardCommands.InsertLetter:
        this.answer[params.index] = params.letter;
        if (params.index < this.word.length - 1 ) {
          this.focusedLetterBoxIndex = params.index + 1;
          if (this.word[this.focusedLetterBoxIndex] === ' ') {
            this.focusedLetterBoxIndex++;
          }
        }
        break;
      case KeyboardCommands.DeleteLetter:
        this.answer[params.index] = ' ';
        if (params.index > 0 ) {
          this.focusedLetterBoxIndex = params.index - 1;
          if (this.word[this.focusedLetterBoxIndex] === ' ') {
            this.focusedLetterBoxIndex--;
          }
        }
        break;
    }
  }

  ValidateAnswer() {
    let status: AnswerStatuses;

    if (this.answer.join('').toLowerCase() === this.word.toLowerCase()) {
      // console.log('PRAWIDŁOWO: "' + this.answer.join('') + '"');
      status = AnswerStatuses.Correct;
    } else {
      // console.log('ŹLE: "' + this.answer.join('') + '"');
      status = AnswerStatuses.Invalid;
    }

    this.next.emit(status);
  }

  SkipToNext() {
    this.next.emit(AnswerStatuses.Skipped);
  }

}
