import { Component } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { delay, share } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  user$: Observable<any>;
  user2: Observable<any>;
  user3: any;
  subscription: Subscription;
  
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
