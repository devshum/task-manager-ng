import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskFilterParams } from '../../models/filter.interface';

@Injectable({
  providedIn: 'root'
})
export class FilterOptionsService {
  public filter$: Subject<TaskFilterParams> = new Subject<TaskFilterParams>();
  public filterOptions: TaskFilterParams;

  constructor() { }

  public setOptions(params: TaskFilterParams): void {
    this.filterOptions = params;
    this.filter$.next(this.filterOptions);
  }

  public reset(): void {
    this.filterOptions = {status: '', importance: '', sort: 'createdAt'};
  }
}
