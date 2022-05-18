import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  _loading$: Subject<boolean> = new Subject<boolean>();
  loadingObserver = this._loading$.asObservable();

  constructor() { }

  start(): void {
    this._loading$.next(true);
  }

  end(): void {
    this._loading$.next(false);
  }
}
