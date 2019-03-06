import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpyParentComponent } from './spy/spy.component'
const routes: Routes = [
  {path: 'spy', component:SpyParentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
