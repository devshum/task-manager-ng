import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pages: number;
  @Input() currentPage: number;
  @Output() updatedCurrentPage: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  prevPage(): void {
    this.currentPage--;

    this.updatedCurrentPage.emit(this.currentPage);
  }

  nextPage(): void {
    this.currentPage++;

    this.updatedCurrentPage.emit(this.currentPage);
  }
}
