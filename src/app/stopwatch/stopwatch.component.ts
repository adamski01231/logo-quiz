import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {
  limit: number = 12*60*1000;
  startTime: number;
  finishTime: number;
  timeLeft = { m:0, s:0 };
  isRunning = false;
  _timerHandle;

  @Input() countdownEnabled: boolean;
  @Output() timeup = new EventEmitter();

  constructor() { }

  Start() {
    this.startTime = Date.now();
    this.Tick();

    this._timerHandle = setInterval(() => this.Tick(), 1000);
    this.isRunning = true;
  }

  Tick() {
    let stamp = Date.now();
    let diff = stamp - this.startTime;

    if (diff >= this.limit) {
      diff = this.limit;
      this.Stop();
    }

    this.timeLeft.m = Math.trunc((this.limit - diff) / 60000);
    this.timeLeft.s = Math.round((this.limit - diff) % 60000 / 1000);    
  }

  Stop() {
    this.finishTime = Date.now();
    clearInterval(this._timerHandle);
    this.isRunning = false;

    this.timeup.emit();
  }

  ngOnInit() {
    if (this.countdownEnabled)
      this.Start();
  }

  ngOnDestroy() {
    if (this._timerHandle)
      clearInterval(this._timerHandle);
  }
}
