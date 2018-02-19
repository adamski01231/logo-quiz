import { StopwatchComponent } from './../stopwatch/stopwatch.component';
import { AnswerStatuses, KeyboardCommands } from './../enums';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  host: {
    '(window:keyup)': '_keyup($event)',
    '(window:keydown)': '_keydown($event)',
  }
})
export class QuizComponent implements OnInit {
  index = 0;
  correctAnswersCount = 0;
  invalidAnswersCount = 0;
  skippedAnswersCount = 0;
  leftAnswersCount = 0;

  isCompleted = false;

  version: string;

  @ViewChild(StopwatchComponent) watch: StopwatchComponent;

  words = [];
  zestawy = [];

  constructor(private route: ActivatedRoute, private http: Http) { }

  ngOnInit() {
    Observable.combineLatest([
      this.http.get('assets/logos.json'),
      this.route.paramMap  
    ])
    .subscribe(combined => {
      this.zestawy = combined[0].json();

      this.version = combined[1].get('version').toUpperCase();

        let result = this.zestawy.filter(z =>  {
          return z.version === this.version.toUpperCase();
        });

        if (result.length > 0) {
          this.words = this.Shuffle(result[0].words);
          if (this.version=="C") { this.words.splice(29, 0, { "word": "Enel", "logo": "283_enel.png" }); }
          this.leftAnswersCount = this.words.length;
        }
    });
  }

  private _keydown(event: KeyboardEvent) {    
    let prevent = [8]
      .find(no => no === event.keyCode);
    if (prevent) { event.preventDefault(); }
  }
  private _keyup(event: KeyboardEvent) {
    // if (event.keyCode === 8) console.log('backspace pressed');
  }

  private Shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  NextLogo(status: AnswerStatuses) {
    switch (status) {
      case AnswerStatuses.Correct:
        this.correctAnswersCount++;
        break;
      case AnswerStatuses.Invalid:
        this.invalidAnswersCount++;
        break;
      case AnswerStatuses.Skipped:
        this.skippedAnswersCount++;
        break;
    }

    this.leftAnswersCount--;

    if (this.index < this.words.length - 1) {
      this.index++;
    } else {
      this.Completed();
    }
  }

  Completed() {
    if (this.isCompleted)
      return;

    this.isCompleted = true;
    this.watch.Stop();
  }

}
