import { Directive, OnInit, OnDestroy } from '@angular/core';

import { LoggerService } from '../logger.service';

let nextId = 1;

// Spy on any element to which it is applied.
// Usage: <div mySpy>...</div>
@Directive({selector: '[mySpy]'})
export class SpyDirective implements OnInit, OnDestroy {

  constructor(private logger: LoggerService) { }

  ngOnInit()    { this.logger.log(`Spy OnInit`); }

  ngOnDestroy() { this.logger.log(`Spy OnDestroy`); }

}

