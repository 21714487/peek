/* tslint:disable:forin */
import {
  Component, Input, OnChanges,
  SimpleChanges, ViewChild
} from '@angular/core';

class Hero {
  constructor(public name: string) {}
}

@Component({
  selector: 'on-changes',
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
export class OnChangesComponent implements OnChanges {
/*
  The ngOnChanges() method takes an object that maps each changed property name to a SimpleChange object holding the current and previous property values.
  This hook iterates over the changed properties and logs them.
  The example component, OnChangesComponent, has two input properties: hero and power.
  The host OnChangesParentComponent binds to them like this:
    src/app/on-changes-parent.component.html content_copy
    <on-changes [hero]="hero" [power]="power"></on-changes>
*/
  @Input() hero: Hero;
  @Input() power: string;

  changeLog: string[] = [];
  /*
    Angular calls its ngOnChanges() method whenever it detects changes to input properties of the component (or directive).
    This example monitors the OnChanges hook.
  */
  ngOnChanges(changes: SimpleChanges) {

    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
    /*
    The log entries appear as the string value of the power property changes. But the ngOnChanges does not catch changes to hero.name That's surprising at first.

    Angular only calls the hook when the value of the input property changes.
    The value of the hero property is the reference to the hero object.
    Angular doesn't care that the hero's own name property changed.
    The hero object reference didn't change so, from Angular's perspective, there is no change to report!
    */
  }

  reset() { this.changeLog = []; }
}

@Component({
  selector: 'on-changes-parent',
  template: `<div class="parent">
               <h2>{{title}}</h2>

               <table>
                 <tr><td>Power: </td><td><input [(ngModel)]="power"></td></tr>
                 <tr><td>Hero.name: </td><td><input [(ngModel)]="hero.name"></td></tr>
               </table>
               <p><button (click)="reset()">Reset Log</button></p>

               <on-changes [hero]="hero" [power]="power"></on-changes>
             </div>
`,
  styles: ['.parent {background: Lavender;}']
})
export class OnChangesParentComponent {
  hero: Hero;
  power: string;
  title = 'OnChanges';
  @ViewChild(OnChangesComponent) childView: OnChangesComponent;

  constructor() {
    this.reset();
  }

  reset() {
    // new Hero object every time; triggers onChanges
    this.hero = new Hero('Windstorm');
    // setting power only triggers onChanges if this value is different
    this.power = 'sing';
    if (this.childView) { this.childView.reset(); }
  }
}

