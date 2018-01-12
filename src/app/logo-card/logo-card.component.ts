import { Component, Input } from '@angular/core';

@Component({
  selector: 'logo-card',
  templateUrl: './logo-card.component.html',
  styleUrls: ['./logo-card.component.css']
})
export class LogoCardComponent {
  @Input() word: string;
  @Input() image: string;

  focusedLetterBoxIndex = 0;

  constructor() { }

  OnLetterBoxFocusChanged(index) {
    this.focusedLetterBoxIndex = index;
  }

  TextInputChanged(event) {
    this.word = event.srcElement.value;
    console.log(event.srcElement.selectionStart);
  }
}
