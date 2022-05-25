import { Injectable } from '@angular/core';
import {  BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  public currentPage = 1;
  _currentPage$: BehaviorSubject<any> = new BehaviorSubject<any>(1);
  currentPageObserver$ = this._currentPage$.asObservable();

  constructor() { }

  prev(): void {
    this.currentPage--;

    this._currentPage$.next(this.currentPage);
  }

  next(): void {
    this.currentPage++;

    this._currentPage$.next(this.currentPage);
  }
}
