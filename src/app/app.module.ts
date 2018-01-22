import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LogoCardComponent } from './logo-card/logo-card.component';
import { LetterBoxComponent } from './letter-box/letter-box.component';
import { QuizComponent } from './quiz/quiz.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoCardComponent,
    LetterBoxComponent,
    QuizComponent,
    StopwatchComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'quiz/:version', component: QuizComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
