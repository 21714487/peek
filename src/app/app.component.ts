import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { Component, Input } from '@angular/core';
import { LoggerService }    from './logger.service';

let order = 1;
let happens = 0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements
 OnInit,OnChanges /*, DoCheck,
AfterContentInit, AfterContentChecked,
AfterViewInit, AfterViewChecked, OnDestroy*/ {

  ngOnInit(){
    this.logIt("OnInit");
  }
  ngOnChanges(){
    this.logIt("OnChanges");
  }
  constructor(private logger:LoggerService){}
  logIt(msg: string) {
    if(msg=="clear")return this.logger.clear();
    order += this.logger.log(`#${order} ${msg}`);
  }

}
