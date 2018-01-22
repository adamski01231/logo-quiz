import { StopwatchComponent } from './../stopwatch/stopwatch.component';
import { AnswerStatuses } from './../enums';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  index = 0;
  correctAnswersCount = 0;
  invalidAnswersCount = 0;
  skippedAnswersCount = 0;
  leftAnswersCount = 0;

  isCompleted = false;

  @ViewChild(StopwatchComponent) watch: StopwatchComponent;

  words = [];

  zestawy = [
    {
      version: 'A',
      words: [
        { word: 'Skype', logo: '001_skype.png'},
        { word: 'Twitter', logo: '002_twitter.png'},
        { word: 'WWF', logo: '003_wwf.png'},
        { word: 'Ryanair', logo: '004_ryanair.png'},
        { word: 'Pringles', logo: '005_pringles.png'},
        { word: 'Instagram', logo: '006_instagram.png'},
        { word: 'Starbucks', logo: '007_starbucks.png'},
        { word: 'Unicef', logo: '008_unicef.png'},
        { word: 'Rolex', logo: '009_rolex.png'},
        { word: 'Discovery', logo: '010_discovery.png'},
        { word: 'Johnnie Walker', logo: '011_johnnie_walker.png'},
        { word: 'Allianz', logo: '012_allianz.png'},
        { word: 'Wikipedia', logo: '013_wikipedia.png'},
        { word: 'Dakar', logo: '014_dakar.png'},
        { word: 'Stabilo', logo: '015_stabilo.png'},
        { word: 'Timberland', logo: '016_timberland.png'},
        { word: 'Sheraton', logo: '017_sheraton.png'},
        { word: 'Dreamworks', logo: '018_dreamworks.png'},
        { word: 'Ferrari', logo: '019_ferrari.png'},
        { word: 'Reebok', logo: '020_reebok.png'}
      ]
    },
    {
      version: 'B',
      words: [
        { word: 'Tui', logo: '021_tui.png'},
        { word: 'Giorgio Armani', logo: '022_giorgio_armani.png'},
        { word: 'Dove', logo: '023_dove.png'},
        { word: 'Swatch', logo: '024_swatch.png'},
        { word: 'Converse', logo: '025_converse.png'},
        { word: 'Vodafone', logo: '026_vodafone.png'},
        { word: 'Nespresso', logo: '027_nespresso.png'},
        { word: 'Rexona', logo: '028_rexona.png'},
        { word: 'NBC', logo: '029_nbc.png'},
      ]
    },
    {
      version: 'C',
      words: [
        { word: 'Pantene', logo: '030_pantene.png'},
        { word: 'Dropbox', logo: '031_dropbox.png'},
        { word: 'Maserati', logo: '032_maserati.png'},
        { word: 'Hilton', logo: '033_hilton.png'},
        { word: 'Chiquita', logo: '034_chiquita.png'},
        { word: 'Kimberly Clark', logo: '035_kimberly_clark.png'},
        { word: 'Bentley', logo: '100_bentley.png'},
      ]
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        const version = params.get('version').toUpperCase();

        let result = this.zestawy.filter(z =>  {
          return z.version === version.toUpperCase();
        });

        if (result.length > 0) {
          this.words = this.Shuffle(result[0].words);
          this.leftAnswersCount = this.words.length;
        }
      });
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
