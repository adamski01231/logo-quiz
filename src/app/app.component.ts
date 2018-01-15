import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  index = 0;

  words = [
    { word: 'Johnnie Walker', logo: 'bmw.jpg'},
    { word: 'Ford', logo: 'ford.jpg'}
  ];

  NextLogo() {
    if (this.index < this.words.length - 1) {
      this.index++;
    } else {
      this.index = 0;
    }
  }

}
