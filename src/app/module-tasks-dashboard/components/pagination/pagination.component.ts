import { PaginationService } from './../../../core/services/pagination/pagination.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() pages: number;
  public currentPage: number;
  private _unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private _paginationService: PaginationService) {}

  ngOnInit(): void {
    this._paginationService.currentPage$
    .pipe(takeUntil(this._unsubscribe$))
    .subscribe(page => this.currentPage = page);
  }

  public prevPage(): void {
    this._paginationService.prev();
  }

  public nextPage(): void {
    this._paginationService.next();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
  }
}
