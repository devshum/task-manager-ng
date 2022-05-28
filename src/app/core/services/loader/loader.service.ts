import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loading$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  public start(): void {
    this.loading$.next(true);
  }

  public end(): void {
    this.loading$.next(false);
  }
}
