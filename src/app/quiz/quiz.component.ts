import { StopwatchComponent } from './../stopwatch/stopwatch.component';
import { AnswerStatuses, KeyboardCommands } from './../enums';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
        { word: 'Dropbox', logo: '031_dropbox.png'},
        { word: 'Maserati', logo: '032_maserati.png'},
        { word: 'Hilton', logo: '033_hilton.png'},
        { word: 'Chiquita', logo: '034_chiquita.png'},
        { word: 'Kimberly Clark', logo: '035_kimberly_clark.png'},
        { word: 'Wella', logo: '036_wella.png'},
        { word: 'Tous', logo: '037_tous.png'},
        { word: 'Electrolux', logo: '038_electrolux.png'},
        { word: 'Lacoste', logo: '039_lacoste.png'},
        { word: 'Subaru', logo: '040_subaru.png'},
        { word: 'Symantec', logo: '041_symantec.png'},
        { word: 'Hyunday', logo: '042_hyunday.png'},
        { word: 'Versace', logo: '043_versace.png'},
        { word: 'Iberia', logo: '044_iberia.png'},
        { word: 'Alcatel', logo: '045_alcatel.png'},
        { word: 'Umbro', logo: '046_umbro.png'},
        { word: 'Schwarzkopf', logo: '047_schwarzkopf.png'},
        { word: 'Bic', logo: '048_bic.png'},
        { word: 'Aquafresh', logo: '049_aquafresh.png'},
        { word: 'Gucci', logo: '050_gucci.png'},
        { word: 'Xbox', logo: '051_xbox.png'},
        { word: 'Sephora', logo: '052_sephora.png'},
        { word: 'Opera', logo: '053_opera.png'},
        { word: 'Soundcloud', logo: '054_soundcloud.png'},
        { word: 'Quicksilver', logo: '055_quicksilver.png'},
        { word: 'The North Face', logo: '056_the_north_face.png'},
        { word: 'Woolmark', logo: '057_woolmark.png'},
        { word: 'Auchan', logo: '058_auchan.png'},
        { word: 'Herbalife', logo: '059_herbalife.png'},
        { word: 'Crocs', logo: '060_crocs.png'},
        { word: 'Novartis', logo: '061_novartis.png'},
        { word: 'Bugatti', logo: '062_bugatti.png'},
        { word: 'Reuters', logo: '063_reuters.png'},
        { word: 'Olay', logo: '064_olay.png'},
        { word: 'Algida', logo: '065_algida.png'},
        { word: 'Yamaha', logo: '066_yamaha.png'},
        { word: 'Lipton', logo: '067_lipton.png'},
        { word: 'Shell', logo: '068_shell.png'},
        { word: 'Pontiac', logo: '069_pontiac.png'},
        { word: 'Playstation', logo: '070_playstation.png'},
        { word: 'Play', logo: '071_play.png' },        
        { word: 'Tommy Hilfiger', logo: '072_tommy_hilfiger.png' },
        { word: 'BP', logo: '073_bp.png' },
        { word: 'Lufthansa', logo: '074_lufthansa.png' },
        { word: 'Rossignol', logo: '075_rossignol.png' },
        { word: 'Daewoo', logo: '076_daewoo.png' },
        { word: 'Adidas', logo: '077_adidas.png' },
        { word: 'Michelin', logo: '078_michelin.png' },
        { word: 'Chrome', logo: '079_chrome.png' },
        { word: 'Kappa', logo: '080_kappa.png' },
        { word: 'New Balance', logo: '081_new_balance.png' },
        { word: 'Malibu', logo: '082_malibu.png' },
        { word: 'Winamp', logo: '083_winamp.png' },
        { word: 'Carrefour', logo: '084_carrefour.png' },
        { word: 'Vimeo', logo: '085_vimeo.png' },
        { word: 'Dulux', logo: '086_dulux.png' },
        { word: 'Suzuki', logo: '087_suzuki.png' },
        { word: 'Pelikan', logo: '088_pelikan.png' },
        { word: 'Bnp Paribas', logo: '089_bnp_paribas.png' },
        { word: 'Myspace', logo: '090_myspace.png' },
        { word: 'Tata', logo: '091_tata.png' },
        { word: 'Peugeot', logo: '092_peugeot.png' },
        { word: 'Linux', logo: '093_linux.png' },
        { word: 'Swarovski', logo: '094_swarovski.png' },
        { word: 'Roxy', logo: '095_roxy.png' },
        { word: 'Windows', logo: '096_windows.png' },
        { word: 'Spotify', logo: '097_spotify.png' },
        { word: 'Leclerc', logo: '098_leclerc.png' },
        { word: 'ZTM', logo: '099_ztm.png' },        
        { word: 'Bentley', logo: '100_bentley.png'},
      ]
    },
    {
      version: 'B',
      words: [
        { word: 'Bentley', logo: '100_bentley.png'},
      ]
    },
    {
      version: 'C',
      words: [
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
