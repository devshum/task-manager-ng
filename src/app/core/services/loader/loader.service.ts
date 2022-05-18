import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _loading$: Subject<boolean> = new Subject<boolean>();
  constructor() { }

  get loadingStatus(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  start(): void {
    this._loading$.next(true);
  }

  end(): void {
    this._loading$.next(false);
  }
}
