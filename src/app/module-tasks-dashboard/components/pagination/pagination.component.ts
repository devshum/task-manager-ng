import { PaginationService } from './../../../core/services/pagination/pagination.service';
import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
  @Input() pages: number;
  public currentPage$: Observable<number>;

  constructor(
    private _paginationService: PaginationService,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentPage$ = this._paginationService.currentPage$;
  }

  public prevPage(): void {
    this._paginationService.prevPage();
  }

  public nextPage(): void {
    this._paginationService.nextPage();
  }
}
