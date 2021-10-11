import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _loading = new BehaviorSubject<boolean | null>(null);
  constructor() { }

  start(): void {
    this._loading.next(true);
  }

  end(): void {
    this._loading.next(false);
  }

  get loadingStatus(): Observable<boolean | null> {
    return this._loading.asObservable();
  }
}