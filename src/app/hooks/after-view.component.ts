
import { AfterViewChecked, AfterViewInit, Component, ViewChild } from '@angular/core';

import { LoggerService }  from '../logger.service';
/*
The AfterView sample explores the AfterViewInit() and AfterViewChecked() hooks that Angular calls after it creates a component's child views.
Here's a child view that displays a hero's name in an <input>:
*/
//////////////////
@Component({
  selector: 'app-child-view',
  template: '<input [(ngModel)]="hero">'
})
export class ChildViewComponent {
  hero = 'Magneta';
}

//////////////////////
@Component({
  selector: 'after-view',
  //The AfterViewComponent displays this child view within its template:
  template: `
    <div>-- child view begins --</div>
      <app-child-view></app-child-view>
    <div>-- child view ends --</div>`
   + `
    <p *ngIf="comment" class="comment">
      {{comment}}
    </p>
  `
})
/*
The following hooks take action based on changing values within the child view, which can only be reached by querying for the child view via the property decorated with @ViewChild.
*/
export class AfterViewComponent implements  AfterViewChecked, AfterViewInit {
  private prevHero = '';

  // Query for a VIEW child of type `ChildViewComponent`
  @ViewChild(ChildViewComponent) viewChild: ChildViewComponent;

  constructor(private logger: LoggerService) {
    this.logIt('AfterView constructor');
  }

  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    this.logIt('AfterViewInit');
    this.doSomething();
  }

  ngAfterViewChecked() {
    // viewChild is updated after the view has been checked
    if (this.prevHero === this.viewChild.hero) {
      this.logIt('AfterViewChecked (no change)');
    } else {
      this.prevHero = this.viewChild.hero;
      this.logIt('AfterViewChecked');
      this.doSomething();
    }
  }

  comment = '';
/*
  Abide by the unidirectional data flow rule:
  The doSomething() method updates the screen when the hero name exceeds 10 characters.
*/
  // This surrogate for real business logic sets the `comment`
  private doSomething() {
    let c = this.viewChild.hero.length > 10 ? `That's a long name` : '';
    if (c !== this.comment) {
      // Wait a tick because the component's view has already been checked
      this.logger.tick_then(() => this.comment = c);
    }
  }
/*
Why does the doSomething() method wait a tick before updating comment?
Angular's unidirectional data flow rule forbids updates to the view after it has been composed.
Both of these hooks fire after the component's view has been composed.
Angular throws an error if the hook updates the component's data-bound comment property immediately (try it!).
The LoggerService.tick_then() postpones the log update for one turn of the browser's JavaScript cycle and that's just long enough.
*/
  private logIt(method: string) {
    let child = this.viewChild;
    let message = `${method}: ${child ? child.hero : 'no'} child view`;
    this.logger.log(message);
  }
  // ...
}

//////////////
@Component({
  selector: 'after-view-parent',
  template: `
  <div class="parent">
    <h2>AfterView</h2>

    <after-view  *ngIf="show"></after-view>

    <h4>-- AfterView Logs --</h4>
    <p><button (click)="reset()">Reset</button></p>
    <div *ngFor="let msg of logger.logs">{{msg}}</div>
  </div>
  <br>
  Notice that Angular frequently calls AfterViewChecked(), often when there are no changes of interest.<br>
  You can write lean hook methods to avoid performance problems.
  `,
  styles: ['.parent {background: burlywood}'],
  providers: [LoggerService]
})
export class AfterViewParentComponent {
  show = true;

  constructor(public logger: LoggerService) {
  }

  reset() {
    this.logger.clear();
    // quickly remove and reload AfterViewComponent which recreates it
    this.show = false;
    this.logger.tick_then(() => this.show = true);
  }
}
