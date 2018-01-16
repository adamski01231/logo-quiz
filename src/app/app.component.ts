import { AnswerStatuses } from './enums';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  index = 0;
  correctAnswersCount = 0;
  invalidAnswersCount = 0;
  skippedAnswersCount = 0;

  words = [
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
    { word: 'Reebok', logo: '020_reebok.png'},
    { word: 'Tui', logo: '021_tui.png'},
    { word: 'Giorgio Armani', logo: '022_giorgio_armani.png'},
    { word: 'Dove', logo: '023_dove.png'},
    { word: 'Swatch', logo: '024_swatch.png'},
    { word: 'Converse', logo: '025_converse.png'},
    { word: 'Vodafone', logo: '026_vodafone.png'},
    { word: 'Nespresso', logo: '027_nespresso.png'},
    { word: 'Rexona', logo: '028_rexona.png'},
    { word: 'NBC', logo: '029_nbc.png'},
    { word: 'Pantene', logo: '030_pantene.png'},
    { word: 'Bentley', logo: '100_bentley.png'},    
  ];

  NextLogo(status: AnswerStatuses) {
    if (this.index < this.words.length - 1) {
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
      this.index++;
    } else {
      this.index = 0;
    }
  }

}
