
import { AfterContentChecked, AfterContentInit, Component, ContentChild } from '@angular/core';

import { LoggerService }  from '../logger.service';

//////////////////
@Component({
  selector: 'app-child',
  template: '<input [(ngModel)]="hero">'
})
export class ChildComponent {
  hero = 'Magneta';
}

//////////////////////
@Component({
  selector: 'after-content',

  template: `
    <div>-- projected content begins --</div>
      <ng-content></ng-content>
    <div>-- projected content ends --</div>`
    /*
    The <ng-content> tag is a placeholder for the external content.
    It tells Angular where to insert that content.
    In this case, the projected content is the <app-child> from the parent.

    The telltale signs of content projection are twofold:
      - HTML between component element tags.
      - The presence of <ng-content> tags in the component's template.
    */
   + `
    <p *ngIf="comment" class="comment">
      {{comment}}
    </p>
  `
})
/*
AfterContent hooks:
AfterContent hooks are similar to the AfterView hooks.
The key difference is in the child component.
The AfterView hooks concern ViewChildren, the child components whose element tags appear within the component's template.
The AfterContent hooks concern ContentChildren, the child components that Angular projected into the component.
The following AfterContent hooks take action based on changing values in a content child, which can only be reached by querying for them via the property decorated with @ContentChild.
*/
export class AfterContentComponent implements AfterContentChecked, AfterContentInit {
  private prevHero = '';
  comment = '';

  // Query for a CONTENT child of type `ChildComponent`
  @ContentChild(ChildComponent) contentChild: ChildComponent;

  constructor(private logger: LoggerService) {
    this.logIt('AfterContent constructor');
  }

  ngAfterContentInit() {
    // contentChild is set after the content has been initialized
    this.logIt('AfterContentInit');
    this.doSomething();
  }

  ngAfterContentChecked() {
    // contentChild is updated after the content has been checked
    if (this.prevHero === this.contentChild.hero) {
      this.logIt('AfterContentChecked (no change)');
    } else {
      this.prevHero = this.contentChild.hero;
      this.logIt('AfterContentChecked');
      this.doSomething();
    }
  }

  // This surrogate for real business logic sets the `comment`
  private doSomething() {
    this.comment = this.contentChild.hero.length > 10 ? `That's a long name` : '';
  }

  private logIt(method: string) {
    let child = this.contentChild;
    let message = `${method}: ${child ? child.hero : 'no'} child content`;
    this.logger.log(message);
  }
  // ...
}
/*
No unidirectional flow worries with AfterContent
This component's doSomething() method update's the component's data-bound comment property immediately. There's no need to wait.
Recall that Angular calls both AfterContent hooks before calling either of the AfterView hooks.
Angular completes composition of the projected content before finishing the composition of this component's view.
There is a small window between the AfterContent... and AfterView... hooks to modify the host view.
*/
//////////////
@Component({
  selector: 'after-content-parent',
  template: `
  <div class="parent">
    <h2>AfterContent</h2>

    <div *ngIf="show">` +
      /*
      The AfterContent sample explores the AfterContentInit() and AfterContentChecked() hooks that Angular calls after Angular projects external content into the component.

      Content projection:
      Content projection is a way to import HTML content from outside the component and insert that content into the component's template in a designated spot.
      AngularJS developers know this technique as transclusion.
      Consider this variation on the previous AfterView example.
      This time, instead of including the child view within the template, it imports the content from the AfterContentComponent's parent.
      Here's the parent's template:
      */
     `<after-content>
        <app-child></app-child>
      </after-content>`
        /*
          Notice that the <app-child> tag is tucked between the <after-content> tags.
          Never put content between a component's element tags unless you intend to project that content into the component.
          Now look at the component's template above
        */
+ `</div>

    <h4>-- AfterContent Logs --</h4>
    <p><button (click)="reset()">Reset</button></p>
    <div *ngFor="let msg of logger.logs">{{msg}}</div>
  </div>
  `,
  styles: ['.parent {background: burlywood}'],
  providers: [LoggerService]
})
export class AfterContentParentComponent {
  show = true;

  constructor(public logger: LoggerService) {
  }

  reset() {
    this.logger.clear();
    // quickly remove and reload AfterContentComponent which recreates it
    this.show = false;
    this.logger.tick_then(() => this.show = true);
  }
}

