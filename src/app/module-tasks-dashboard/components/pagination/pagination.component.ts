import { PaginationService } from './../../../core/services/pagination/pagination.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() pages: number;
  public currentPage: number;

  constructor(private _paginationService: PaginationService) {}

  ngOnInit(): void {
    this._paginationService.currentPage$.subscribe(page => this.currentPage = page);
  }

  public prevPage(): void {
    this._paginationService.prev();
  }

  public nextPage(): void {
    this._paginationService.next();
  }
}
