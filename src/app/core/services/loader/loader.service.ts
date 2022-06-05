import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }

  public start(): void {
    this.loading$.next(true);
  }

  public end(): void {
    this.loading$.next(false);
  }
}
