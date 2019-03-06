import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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


const routes: Routes = [
  {path: 'OnChanges', component:OnChangesParentComponent},
  {path: 'DoCheck',component:DoCheckParentComponent},
  {path: 'DoCheck/child',component:DoCheckComponent},
  {path: 'AfterContent',component:AfterContentParentComponent},
  {path: 'AfterView', component:AfterViewParentComponent},
  {path: 'AfterView/child',component:AfterViewComponent},
  {path: 'AfterView/childView',component:ChildViewComponent},
  {path: 'spy', component:SpyParentComponent},
  {path: 'counter', component:CounterParentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
