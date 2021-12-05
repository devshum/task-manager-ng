import { LoaderService } from './../../../core/services/loader/loader.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TasksDashboardService } from './../../../core/services/tasks-dashboard/tasks-dashboard.service';
import { TaskView, TaskPostData } from '../../../core/models/task.interface';
import { Observable } from 'rxjs';
import { TaskFilterParams } from 'src/app/core/models/filter.interface';
@Component({
  selector: 'app-tasks-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.scss']
})

export class TaskDashboardComponent implements OnInit {
  tasks: TaskView[];
  isFormShown = false;
  isSideNavShown = false;
  currentPage = 1;
  pageLimit = 4;
  totalTasksPerPage: TaskView[];
  pages: number;
  status: string;
  importance: string;
  sort = '-createdAt';
  loading$: Observable<boolean | null>;

  constructor(
    private _tasksService: TasksDashboardService,
    private _loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this._getTasksList({
      sort: this.sort,
      page: this.currentPage,
      limit: this.pageLimit
    });
  }

  onAddTask(event: TaskPostData): void {
    this._loaderService.start();
    this._tasksService
      .addTask(event)
      .subscribe(() => {
        this._getTasksList({
          sort: this.sort,
          page: this.currentPage,
          limit: this.pageLimit
        });
      });
  }

  onRemoveTask(event: TaskView): void {
    if(this.totalTasksPerPage.length === 1 && this.currentPage > 1) {
      this.pages--;
      this.currentPage = this.pages;
    }
    this._loaderService.start();
    this._tasksService
      .removeTask(event)
      .subscribe(() => {
        this._getTasksList({
          status: this.status,
          importance: this.importance,
          sort: this.sort,
          page: this.currentPage,
          limit: this.pageLimit
        });
      });
  }

  onEditTask(event: TaskView | any): void {
    this._loaderService.start();
    this._tasksService
      .editTask(event)
      .subscribe(() => {
         this._getTasksList({
          sort: this.sort,
          page: this.currentPage,
          limit: this.pageLimit
        });
      });
  }

  onFormShown(event: boolean): void {
    this.isFormShown = event;
  }

  onSideNavShown(event: boolean): void {
    this.isSideNavShown = event;
  }

  onFilterOptions(event: TaskFilterParams): void {
    this.currentPage = 1;
    this.status = event.status;
    this.importance = event.importance;
    this.sort = event.date;

    this._loaderService.start();
    this._getTasksList({
      status: this.status,
      importance: this.importance,
      sort: this.sort,
      page: this.currentPage,
      limit: this.pageLimit
    });
  }

  prevPage(): void {
    this._updatePage('prev');
  }

  nextPage(): void {
    this._updatePage('next');
  }

  private _getTasksList(filterParams: any): void {
    this._tasksService
      .getTasks(filterParams)
      .subscribe(data => {
        this.tasks = data.result;
        this.pages = Math.ceil(data.total / data.limit);
        this.totalTasksPerPage = data.result;
        this._loaderService.end();
      });
  }

  private _updatePage(val: string): void {
    this._loaderService.start();
    if (val === 'prev') {
      this.currentPage--;
      this._getTasksList({
        status: this.status,
        importance: this.importance,
        sort: this.sort,
        page: this.currentPage,
        limit: this.pageLimit
      });
    }

    if (val === 'next') {
      this.currentPage++;
      this._getTasksList({
        status: this.status,
        importance: this.importance,
        sort: this.sort,
        page: this.currentPage,
        limit: this.pageLimit
      });
    }
  }
}
