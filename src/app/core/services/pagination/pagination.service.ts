import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  public currentPage = 1;
  public currentPage$: BehaviorSubject<any> = new BehaviorSubject<any>(1);

  constructor() { }

  public prevPage(): void {
    this.currentPage--;

    this.currentPage$.next(this.currentPage);
  }

  public nextPage(): void {
    this.currentPage++;

    this.currentPage$.next(this.currentPage);
  }

  public initialPage(): void {
    this.currentPage = 1;

    this.currentPage$.next(this.currentPage);
  }

  public changePage(page: number): void {
    this.currentPage = page;

    this.currentPage$.next(this.currentPage);
  }
}
