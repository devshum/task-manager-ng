import { TasksService } from './../../../core/services/tasks/tasks.service';
import { PaginationService } from './../../../core/services/pagination/pagination.service';
import { LoaderService } from './../../../core/services/loader/loader.service';
import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { TasksDashboardService } from './../../../core/services/tasks-dashboard/tasks-dashboard.service';
import { TaskView } from '../../../core/models/task.interface';
import { Observable, Subject } from 'rxjs';
import { TaskFilterParams } from 'src/app/core/models/filter.interface';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { EnumToastEdit } from 'src/app/core/enums/toast.edit';
import { EnumToastDelete } from 'src/app/core/enums/toast.delete';
import { EnumToastAdd } from 'src/app/core/enums/toast.add';
import { fadeDelay, fadeCommon } from 'src/app/core/animations/animations';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-tasks-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.scss'],
  animations: [fadeDelay, fadeCommon],
})

export class TaskDashboardComponent implements OnInit, OnDestroy {
  tasks: TaskView[];
  isFormShown = false;
  isSideNavShown = false;
  currentPage: number;
  pageLimit = 4;
  totalTasksPerPage: TaskView[];
  totalTasks: number;
  pages: number;
  status: string;
  importance: string;
  sort = 'issue';
  loading$: Observable<boolean>;

  editToastData: any = {
    id: EnumToastEdit.id,
    severity: EnumToastEdit.severity,
    life: EnumToastEdit.life,
    title: EnumToastEdit.title,
    message: EnumToastEdit.message
  };
  addToastData: any = {
    id: EnumToastAdd.id,
    severity: EnumToastAdd.severity,
    life: EnumToastAdd.life,
    title: EnumToastAdd.title,
    message: EnumToastAdd.message
  };
  deleteToastData: any = {
    id: EnumToastDelete.id,
    severity: EnumToastDelete.severity,
    life: EnumToastDelete.life,
    title: EnumToastDelete.title,
    message: EnumToastDelete.message
  };

  private _unsubscribe$: Subject<any> = new Subject();

  constructor(
    private _tasksDashboardService: TasksDashboardService,
    private _loaderService: LoaderService,
    private _toastService: ToastService,
    private _paginationService: PaginationService,
    private _tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this._paginationService.currentPage$
    .pipe(takeUntil(this._unsubscribe$))
    .subscribe(page => {
      this.currentPage = page;

      this._getTasksList({
        status: this.status,
        importance: this.importance,
        sort: this.sort,
        page: this.currentPage,
        limit: this.pageLimit
      });
    });

    this._tasksService.tasks$
    .pipe(takeUntil(this._unsubscribe$))
    .subscribe(eventAction => {
      if(eventAction === 'add') {
        this._addTask();
      } else if(eventAction === 'delete') {
        this._removeTask();
      } else if(eventAction === 'edit') {
        this._editTask();
      }

      this._getTasksList({
        status: this.status,
        importance: this.importance,
        sort: this.sort,
        page: this.currentPage,
        limit: this.pageLimit
      });
    });

    this._getTasksList({
      status: this.status,
      importance: this.importance,
      sort: this.sort,
      page: this.currentPage,
      limit: this.pageLimit
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
    this.sort = event.issue;

    this._loaderService.start();
    this._getTasksList({
      status: this.status,
      importance: this.importance,
      sort: this.sort,
      page: this.currentPage,
      limit: this.pageLimit
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
  }

  private _addTask(): void {
    if(this.totalTasksPerPage.length === this.pageLimit && this.currentPage === this.pages) {
      this._paginationService.next();
    } else if (this.currentPage !== this.pages) {
      this.currentPage = this.pages;
    }

    this._toastService.add(this.addToastData);
  }

  private _removeTask(): void {
    if(this.totalTasksPerPage.length === 1 && this.currentPage > 1) {
      this._paginationService.prev();
    }

    this._toastService.add(this.deleteToastData);
  }

  private _editTask(): void {
    this._toastService.add(this.editToastData);
  }

  private _getTasksList(filterParams: any): void {
    this._loaderService.start();

    this._tasksDashboardService
      .getTasks(filterParams)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(data => {
        this.tasks = data.result;
        this.pages = Math.ceil(data.total / data.limit) || 1;
        this.totalTasksPerPage = data.result;
        this.totalTasks = data.total;
        this._loaderService.end();
      });
  }
}
