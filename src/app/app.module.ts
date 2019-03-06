import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpyParentComponent } from './spy/spy.component';
import { SpyDirective } from './spy/spy.directive'
@NgModule({
  declarations: [
    AppComponent,
    SpyParentComponent,
    SpyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
