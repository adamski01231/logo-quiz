import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LogoCardComponent } from './logo-card/logo-card.component';
import { LetterBoxComponent } from './letter-box/letter-box.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoCardComponent,
    LetterBoxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
