import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _loading$ = new Subject();
  constructor() { }

  get loadingStatus(): Observable<any> {
    return this._loading$.asObservable();
  }

  start(): void {
    this._loading$.next(true);
  }

  end(): void {
    this._loading$.next(false);
  }
}
