import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LogoCardComponent } from './logo-card/logo-card.component';
import { LetterBoxComponent } from './letter-box/letter-box.component';
import { QuizComponent } from './quiz/quiz.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { HomeComponent } from './home/home.component';
import { BlindedPipe } from './blinded.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LogoCardComponent,
    LetterBoxComponent,
    QuizComponent,
    StopwatchComponent,
    HomeComponent,
    BlindedPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'quiz/:version', component: QuizComponent}
    ]),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
