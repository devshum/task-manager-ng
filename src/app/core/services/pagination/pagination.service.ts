import { Injectable } from '@angular/core';
import {  BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  public currentPage = 1;
  public currentPage$: BehaviorSubject<any> = new BehaviorSubject<any>(1);

  constructor() { }

  public prev(): void {
    this.currentPage--;

    this. currentPage$.next(this.currentPage);
  }

  public next(): void {
    this.currentPage++;

    this. currentPage$.next(this.currentPage);
  }
}
