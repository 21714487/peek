import { Directive, OnInit, OnDestroy } from '@angular/core';

import { LoggerService } from '../logger.service';

let nextId = 1;

// Spy on any element to which it is applied.
// Usage: <div mySpy>...</div>
@Directive({selector: '[mySpy]'})
export class SpyDirective implements OnInit, OnDestroy {

  constructor(private logger: LoggerService) { }

  ngOnInit()    { this.logger.log(`Spy OnInit`); }
/*
Use ngOnInit() for two main reasons:

To perform complex initializations shortly after construction.
To set up the component after Angular sets the input properties.
Experienced developers agree that components should be cheap and safe to construct.
Misko Hevery, Angular team lead, explains why you should avoid complex constructor logic.
Don't fetch data in a component constructor.
You shouldn't worry that a new component will try to contact a remote server when created under test or before you decide to display it.
Constructors should do no more than set the initial local variables to simple values.

An ngOnInit() is a good place for a component to fetch its initial data.
The Tour of Heroes Tutorial guide shows how.

Remember also that a directive's data-bound input properties are not set until after construction.
That's a problem if you need to initialize the directive based on those properties.
They'll have been set when ngOnInit() runs.

The ngOnChanges() method is your first opportunity to access those properties.
Angular calls ngOnChanges() before ngOnInit() and many times after that.
It only calls ngOnInit() once.

You can count on Angular to call the ngOnInit() method soon after creating the component.
That's where the heavy initialization logic belongs.
  */
  ngOnDestroy() { this.logger.log(`Spy OnDestroy`); }
/*
Put cleanup logic in ngOnDestroy(), the logic that must run before Angular destroys the directive.

This is the time to notify another part of the application that the component is going away.

This is the place to free resources that won't be garbage collected automatically.
Unsubscribe from Observables and DOM events. Stop interval timers.
Unregister all callbacks that this directive registered with global or application services.
You risk memory leaks if you neglect to do so.
*/
}

