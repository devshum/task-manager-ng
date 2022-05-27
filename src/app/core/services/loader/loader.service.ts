import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loading$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  start(): void {
    this.loading$.next(true);
  }

  end(): void {
    this.loading$.next(false);
  }
}
