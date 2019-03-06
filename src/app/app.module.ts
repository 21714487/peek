import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  AfterContentParentComponent,
  AfterContentComponent,
  ChildComponent
} from './hooks/after-content.component';

import {
  AfterViewParentComponent,
  AfterViewComponent,
  ChildViewComponent
} from './hooks/after-view.component';

import {
  CounterParentComponent,
  MyCounterComponent
} from './hooks/counter.component';

import {
  DoCheckParentComponent,
  DoCheckComponent
} from './hooks/do-check.component';

import {
  OnChangesParentComponent,
  OnChangesComponent
} from './hooks/on-changes.component';

import { SpyParentComponent } from './spy/spy.component';
import { SpyDirective } from './spy/spy.directive';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    AfterContentParentComponent,
    AfterContentComponent,
    ChildComponent,
    AfterViewParentComponent,
    AfterViewComponent,
    ChildViewComponent,
    CounterParentComponent,
    MyCounterComponent,
    DoCheckParentComponent,
    DoCheckComponent,
    OnChangesParentComponent,
    OnChangesComponent,
    SpyParentComponent,
    SpyDirective
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
