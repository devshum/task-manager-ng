import { PaginationService } from './../../../core/services/pagination/pagination.service';
import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() pages: number;
  public currentPage: number;
  private _unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private _paginationService: PaginationService,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._paginationService.currentPage$
    .pipe(takeUntil(this._unsubscribe$))
    .subscribe(page => {
      this.currentPage = page;
      this._cd.detectChanges();
    });
  }

  public prevPage(): void {
    this._paginationService.prevPage();
  }

  public nextPage(): void {
    this._paginationService.nextPage();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
  }
}
