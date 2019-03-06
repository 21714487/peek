import { Injectable } from '@angular/core';

@Injectable({
providedIn:"root"
})
export class LoggerService {
  logs: string[] = [];
  prevMsg = '';
  prevMsgCount = 1;

  log(msg: string)  {
    if (msg === this.prevMsg) {

      // Repeat message; update last log entry with count.
      this.logs[this.logs.length - 1] =  `#${this.logs.length-1} ${msg} (${this.prevMsgCount += 1}x)`;
      return 0;
    } else {
      // New message; log it.
      this.prevMsg = msg;
      this.prevMsgCount = 1;
      this.logs.push(`#${this.logs.length} ${msg}`);
      return 1;
    }
  }

  clear() { this.logs = []; return 0;}

  // schedules a view refresh to ensure display catches up
  tick() {  this.tick_then(() => { }); }
  tick_then(fn: () => any) { setTimeout(fn, 0); }
}
