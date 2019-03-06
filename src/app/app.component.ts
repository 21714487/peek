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



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements
 OnInit,OnChanges , DoCheck,
AfterContentInit, AfterContentChecked,
AfterViewInit, AfterViewChecked, OnDestroy {
  name = "Angular Lifecycle hooks";
  ngOnInit(){
    this.logger.log("OnInit");
  }
  ngOnChanges(){
    this.logger.log("OnChanges");
  }
  ngDoCheck(){
    this.logger.log("DoCheck");
  }
  ngAfterContentInit(){
    this.logger.log("AfterContentInit");
  }
  ngAfterContentChecked(){
    this.logger.log("AfterContentChecked");
  }
  ngAfterViewInit(){
    this.logger.log("AfterViewInit");
  }
  ngAfterViewChecked(){
    this.logger.log("AfterViewChecked");
  }
  ngOnDestroy(){
    this.logger.log("OnDestroy");
  }
  constructor(private logger:LoggerService){}

}
