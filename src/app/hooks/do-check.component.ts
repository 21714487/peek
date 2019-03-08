
/* tslint:disable:forin */
import { Component, DoCheck, Input, ViewChild } from '@angular/core';

class Hero {
  constructor(public name: string) {}
}

@Component({
  selector: 'do-check',
  template: `
  <div class="hero">
    <p>{{hero.name}} can {{power}}</p>

    <h4>-- Change Log --</h4>
    <div *ngFor="let chg of changeLog">{{chg}}</div>
  </div>
  `,
  styles: [
    '.hero {background: LightYellow; padding: 8px; margin-top: 8px}',
    'p {background: Yellow; padding: 8px; margin-top: 8px}'
  ]
})
export class DoCheckComponent implements DoCheck {
  @Input() hero: Hero;
  @Input() power: string;

  changeDetected = false;
  changeLog: string[] = [];
  oldHeroName = '';
  oldPower = '';
  oldLogLength = 0;
  noChangeCount = 0;
/*
  Use the DoCheck hook to detect and act upon changes that Angular doesn't catch on its own.
  Use this method to detect a change that Angular overlooked.
  The DoCheck sample extends the OnChanges sample with the following ngDoCheck() hook:
*/
  ngDoCheck() {

    if (this.hero.name !== this.oldHeroName) {
      this.changeDetected = true;
      this.changeLog.push(`DoCheck: Hero name changed to "${this.hero.name}" from "${this.oldHeroName}"`);
      this.oldHeroName = this.hero.name;
    }

    if (this.power !== this.oldPower) {
      this.changeDetected = true;
      this.changeLog.push(`DoCheck: Power changed to "${this.power}" from "${this.oldPower}"`);
      this.oldPower = this.power;
    }

    if (this.changeDetected) {
        this.noChangeCount = 0;
    } else {
        // log that hook was called when there was no relevant change.
        let count = this.noChangeCount += 1;
        let noChangeMsg = `DoCheck called ${count}x when no change to hero or power`;
        if (count === 1) {
          // add new "no change" message
          this.changeLog.push(noChangeMsg);
        } else {
          // update last "no change" message
          this.changeLog[this.changeLog.length - 1] = noChangeMsg;
        }
    }

    this.changeDetected = false;
    /*
    This code inspects certain values of interest, capturing and comparing their current state against previous values.
    It writes a special message to the log when there are no substantive changes to the hero or the power so you can see how often DoCheck is called.
    The results are illuminating:
    */
  }
/*
While the ngDoCheck() hook can detect when the hero's name has changed, it has a frightful cost.
This hook is called with enormous frequency—after every change detection cycle no matter where the change occurred.
It's called over twenty times in this example before the user can do anything.
Most of these initial checks are triggered by Angular's first rendering of unrelated data elsewhere on the page.
Mere mousing into another <input> triggers a call. Relatively few calls reveal actual changes to pertinent data.
Clearly our implementation must be very lightweight or the user experience suffers.
*/
  reset() {
    this.changeDetected = true;
    this.changeLog = [];
  }
}

@Component({
  selector: 'do-check-parent',
  template: `
  <div class="parent">
    <h2>{{title}}</h2>

    <table>
      <tr><td>Power: </td><td><input [(ngModel)]="power"></td></tr>
      <tr><td>Hero.name: </td><td><input [(ngModel)]="hero.name"></td></tr>
    </table>
    <p><button (click)="reset()">Reset Log</button></p>

     <do-check [hero]="hero" [power]="power"></do-check>
    </div>
`,
  styles: ['.parent {background: Lavender}']
})
export class DoCheckParentComponent {
  hero: Hero;
  power: string;
  title = 'DoCheck';
  @ViewChild(DoCheckComponent) childView: DoCheckComponent;

  constructor() { this.reset(); }

  reset() {
    this.hero = new Hero('Windstorm');
    this.power = 'sing';
    if (this.childView) { this.childView.reset(); }
  }
}

