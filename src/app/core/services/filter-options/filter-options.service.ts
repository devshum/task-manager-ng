import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskFilterParams } from '../../models/filter.interface';

@Injectable({
  providedIn: 'root'
})
export class FilterOptionsService {
  public filter$: Subject<TaskFilterParams> = new Subject<TaskFilterParams>();
  private _filterOptions: TaskFilterParams;

  constructor() { }

  public setOptions(params: TaskFilterParams): void {
    this._filterOptions = params;
    this.filter$.next(this._filterOptions);
  }

  public reset(): void {
    this._filterOptions = {status: '', importance: '', issue: 'issue'};
  }
}
