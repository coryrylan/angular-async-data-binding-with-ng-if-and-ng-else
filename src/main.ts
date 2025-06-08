import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Observable, of, Subscription } from 'rxjs';
import { delay, share } from 'rxjs/operators';
import 'zone.js';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  template: `
    <h1>Angular Async Data Binding with ngIf and ngElse</h1>

    <p>
      <a href="https://coryrylan.com/blog/angular-async-data-binding-with-ng-if-and-ng-else">Tutorial at coryrylan.com</a>
    </p>

    <div *ngIf="user$ | async as user; else loading;">
      <h2>{{user.firstName}} {{user.lastName}}</h2>
      <dl>
        <dt>Age:</dt>
        <dd>{{user.age}}</dd>

        <dt>Height:</dt>
        <dd>{{user.height}}</dd>

        <dt>Mass:</dt>
        <dd>{{user.mass}}</dd>

        <dt>Homeworld:</dt>
        <dd>{{user.homeworld}}</dd>
      </dl>
    </div>
    <ng-template #loading>Loading User Data...</ng-template>

    <br>

    <h2>Async Pipe with share() operator</h2>
    <div>
      <h2>{{(user2 | async)?.firstName}} {{(user2 | async)?.lastName}}</h2>
      <dl>
        <dt>Age:</dt>
        <dd>{{(user2 | async)?.age}}</dd>

        <dt>Height:</dt>
        <dd>{{(user2 | async)?.height}}</dd>

        <dt>Mass:</dt>
        <dd>{{(user2 | async)?.mass}}</dd>

        <dt>Homeworld:</dt>
        <dd>{{(user2 | async)?.homeworld}}</dd>
      </dl>
    </div>

    <h2>Manual subscription Handling in TypEscript</h2>
    <div>
      <h2>{{user3?.firstName}} {{user3?.lastName}}</h2>
      <dl>
        <dt>Age:</dt>
        <dd>{{user3?.age}}</dd>

        <dt>Height:</dt>
        <dd>{{user3?.height}}</dd>

        <dt>Mass:</dt>
        <dd>{{user3?.mass}}</dd>

        <dt>Homeworld:</dt>
        <dd>{{user3?.homeworld}}</dd>
      </dl>
    </div>
  `,
})
export class App {
  user$!: Observable<any>;
  user2!: Observable<any>;
  user3!: any;
  subscription!: Subscription;
  
  constructor() { }
  
  ngOnInit() {
    // Using ngIf ngElse
    this.user$ = this.getAsyncData();
    
    // Using just async pipe
    this.user2 = this.getAsyncData().pipe(share());
    
    // Manual subscription handling
    this.subscription = this.getAsyncData().subscribe(u => this.user3 = u);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  getAsyncData() {
     // Fake Slow Async Data
    return of({
      firstName: 'Luke',
      lastName: 'Skywalker',
      age: 65,
      height: 172,
      mass: 77,
      homeworld: 'Tatooine'
    }).pipe(
      delay(2000)
    );
  }
}

bootstrapApplication(App);
